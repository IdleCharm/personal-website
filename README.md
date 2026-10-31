# Personal Website

A modern personal website built with React 19, TypeScript, Vite 7, and styled with Tailwind CSS v4. This project showcases a responsive portfolio with sections for hero presentation, about me, skills, social links, and an interactive contact form protected by Cloudflare Turnstile.

## 🚀 Tech Stack

- **Runtime**: [Node.js 24+](https://nodejs.org/)
- **Frontend**: [React 19.3+](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Bot Protection**: [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (`@marsidev/react-turnstile`)
- **Linting**: ESLint flat config with TypeScript and React Hooks support
- **Backend API**: Decoupled Rust backend service (`personal-api`) handling `/api/contact` and `/api/resume`
- **Deployment**: Hardened multi-stage Docker container with Node 24 Alpine and secure Nginx

## 🔒 Security Hardening

- **0 Dependencies Vulnerabilities**: All dependencies and subdependencies audited with `found 0 vulnerabilities`.
- **Hardened HTTP Headers**: Production Nginx is configured with:
  - `Content-Security-Policy` restricting script, style, frame, and connect origins
  - `X-Frame-Options: DENY` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff` (anti-MIME sniffing)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  - `server_tokens off;` (information hiding)
- **External Links Protection**: Outbound external links use `noopener,noreferrer` to guard against reverse tabnabbing.
- **Bot Verification**: Cloudflare Turnstile with assigned action `contact` and strict backend token verification.

## 🛠️ Development Setup

### Prerequisites

- Node.js 24 or higher
- npm

### Getting Started

1. **Clone the repository**

   ```bash
   git clone git@github.com:IdleCharm/personal-website.git
   cd personal-website
   ```

2. **Configure environment variables**

   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`. Requests to `/api/*` are automatically proxied to the backend at `http://localhost:3030`.

### Available Scripts

- `npm run dev` - Start the Vite development server with hot reload and API proxy
- `npm run build` - Typecheck with TypeScript and build optimized assets for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint over the project codebase

## 🐳 Docker Deployment

This project includes Docker support for containerized deployment using a secure multi-stage build:
1. **Builder Stage**: Node.js 24 Alpine builds production bundles via `npm ci` and `npm run build`.
2. **Production Stage**: Nginx Alpine serves static assets using the hardened `nginx.conf` security policy.

### Building the Docker Image

```bash
docker build -t personal-website .
```

### Running with Docker

```bash
docker run -p 8080:80 personal-website
```

The application will be available at `http://localhost:8080`.

## 📁 Project Structure

```
personal-website/
├── public/              # Static public assets (favicons, manifest, images)
│   ├── images/          # Profile and family photos
│   └── manifest.json    # PWA web manifest
├── src/
│   ├── components/      # React UI components
│   │   ├── About.tsx    # Bio and core attributes
│   │   ├── Contact.tsx  # Contact form with Cloudflare Turnstile
│   │   ├── Hero.tsx     # Hero banner and call-to-actions
│   │   ├── Icons.tsx    # SVG icons
│   │   ├── Loader.tsx   # Loading spinner
│   │   ├── Skills.tsx   # Skills competencies
│   │   └── Socials.tsx  # Social buttons and navigation triggers
│   ├── App.tsx          # Main root layout
│   ├── index.css        # Global CSS & Tailwind directives
│   └── main.tsx         # Application entry point
├── Dockerfile           # Multi-stage Node 24 / Nginx Dockerfile
├── nginx.conf           # Production Nginx security configuration
├── GEMINI.md            # AI agent engineering manual
├── package.json         # Dependencies and scripts (Node >=24, React 19.3+)
└── vite.config.ts       # Vite config with API dev proxy
```

## 📄 License

This project is private and proprietary.
