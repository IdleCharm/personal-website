# GEMINI.md - Personal Website

This document serves as the primary system and engineering guide for Google Gemini, Antigravity, and AI coding agents working on the Personal Website codebase.

---

## 1. Project Overview & Architecture

`personal-website` is Michael Henry's personal portfolio web application showcasing skills, professional background, open-source projects, and contact channels.

### Technology Stack & Runtime
- **Runtime Environment**: [Node.js 24+](https://nodejs.org/) (`>=24.0.0`)
- **Framework**: [React 19.3+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Bot Protection**: [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (`@marsidev/react-turnstile`)
- **Backend API**: Decoupled Rust backend service (`personal-api`) handling `/api/contact` and `/api/resume`
- **Containerization**: Multi-stage Docker build on Node 24 Alpine with hardened production Nginx (`Dockerfile`, `nginx.conf`)

---

## 2. Directory Structure

```
personal-website/
├── public/                     # Static public assets (favicons, manifests, images)
│   ├── images/                 # Profile and media photos
│   ├── manifest.json           # Web app manifest
│   └── robots.txt              # Search engine directives
├── src/
│   ├── components/             # React UI components
│   │   ├── About.tsx           # Bio and core attributes
│   │   ├── Contact.tsx         # Contact form with Cloudflare Turnstile protection
│   │   ├── Hero.tsx            # Hero presentation banner
│   │   ├── Icons.tsx           # SVG icon primitives
│   │   ├── Loader.tsx          # Animated loading indicator
│   │   ├── Skills.tsx          # Technical competencies list
│   │   └── Socials.tsx         # External social links and resume actions
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Global CSS & Tailwind directives
│   └── main.tsx                # Client application bootstrap
├── Dockerfile                  # Hardened Node 24 / Nginx container build
├── nginx.conf                  # Production Nginx reverse proxy & security headers
├── eslint.config.js            # ESLint flat config
├── package.json                # Project dependencies (Node >=24, React 19.3+)
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.app.json           # Application TypeScript compilation config
├── tsconfig.node.json          # Node/Vite TypeScript compilation config
├── vite.config.ts              # Vite configuration with Tailwind plugin & API dev proxy
├── GEMINI.md                   # AI guidance manual (this file)
└── README.md                   # Project documentation
```

---

## 3. Core Commands & Workflows

Always run commands from the project root using Node.js 24+:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with HMR on `http://localhost:5173`. Proxies `/api` to `http://localhost:3030`. |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets via `vite build` into `dist/`. |
| `npm run lint` | Runs ESLint over project files. |
| `npm run preview` | Locally serves the production build from `dist/`. |
| `npm run clean` | Cleans up test results, reports, and generated media artifacts (`rm -rf test-results playwright-report`). |
| `npm run dev:docker` | Builds and re/starts both `personal-api` (3030) and `personal-website` (8080) containers using local `.env` configuration. |
| `npm run down:docker` | Stops both local Docker development containers. |
| `npm run logs:docker` | Streams logs from the local Docker services. |
| `docker build -t personal-website .` | Builds the production multi-stage Node 24 / Nginx container. |

---

## 4. Key Integrations & Architecture

### Environment & Secret Management
- Local development configuration is stored in `.env` (gitignored). Template provided in `.env.example`.
- Secrets and production keys must NEVER be hardcoded, committed to version control, or exposed publicly.
- `npm run dev:docker` orchestrates both local containers (`personal-api` on 3030 and `personal-website` on 8080) reading local `.env` configuration.

### Continuous Deployment (CI/CD)
- GitHub Actions workflow [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml) runs on `[self-hosted, linux]`.
- Connects via SSH to the production host configured via GitHub Actions Secret `DEPLOY_HOST` using deployer keys managed via Secrets (`SSH_PRIVATE_KEY` or `DEPLOYER_SSH_KEY`).
- Pulls `main` branch, rebuilds containers with `docker compose up -d --build`, and performs automated health verification.

### Backend API Communication
- Endpoints are called relative to the root (`/api/contact`, `/api/skills`, `/api/resume`).
- In local development, `vite.config.ts` proxies `/api` requests directly to `http://localhost:3030` where `personal-api` runs.
- In production, Nginx or edge reverse proxies route `/api/*` to the `personal-api` service.

### Cloudflare Turnstile Integration
- Configured in `src/components/Contact.tsx` using `@marsidev/react-turnstile`.
- Configured with `theme="dark"` and assigned action `action="contact"` matching the dark aesthetic (`slate-900` / `purple-900` / `indigo-900`).
- Environment variable `VITE_TURNSTILE_SITE_KEY` sets the site key.

---

## 5. Security & Engineering Standards

1. **Zero Vulnerabilities & Node 24**:
   - Node runtime enforced at `>=24.0.0` in `package.json` engines and Docker container.
   - Maintain 0 vulnerabilities under `npm audit`.
2. **Container & Web Hardening**:
   - Production Nginx injects strict security headers: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
   - External links use `rel="noopener noreferrer"` to prevent reverse tabnabbing.
   - Server tokens disabled (`server_tokens off;`).
3. **Modern Form UX & Accessibility**:
   - Use semantic HTML form controls with `validate-input-after-interaction` (`:user-invalid` styling).
   - Supply correct `autocomplete` tokens (`given-name`, `family-name`, `email`, `tel`).
   - Format hints placed above inputs to avoid mobile keyboard/autofill clipping.
4. **Type Safety & Linting**:
   - Maintain zero errors under `tsc -b` and zero warnings under `eslint .`.

---

## 6. Environment Variables Reference

| Variable | Required | Description |
| :--- | :--- | :--- |
| `VITE_TURNSTILE_SITE_KEY` | Yes (or defaults to site key) | Cloudflare Turnstile public site key. |

---

## 7. Guidelines for Gemini / Antigravity Agents

- Ensure commands are tested in standard sandbox mode first.
- Always run `npm run build` and `npm run lint` after code changes to guarantee build integrity.
- Never disable SSL or add `--ignore-ssl` flags during builds.
- Always clean up temporary test media, screenshots, videos, and Playwright reports after visual analysis (`npm run clean`).
EOF
