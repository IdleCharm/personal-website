# Personal Website

A modern personal website built with React, TypeScript, Vite, and styled with Tailwind CSS. This project showcases a responsive portfolio with components for hero section, about, skills, and social links.

## 🚀 Tech Stack

- **Frontend**: React 24 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint with TypeScript support
- **Deployment**: Docker with Nginx

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

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🐳 Docker Deployment

This project includes Docker support for containerized deployment using a multi-stage build with Nginx.

### Building the Docker Image

```bash
docker build -t personal-website .
```

### Running with Docker

```bash
docker run -p 8080:80 personal-website
```

The application will be available at `http://localhost:8080`

### Docker Architecture

The Dockerfile uses a two-stage build process:

1. **Build Stage**: Uses Node.js 22 Alpine to build the React application
2. **Production Stage**: Uses Nginx Alpine to serve the static files

**Build optimization features:**

- Multi-stage build reduces final image size
- Only production assets are included in the final image
- Nginx serves static files efficiently

### Alternative Secure Dockerfile

For environments with strict SSL requirements, use the secure Dockerfile:

```bash
docker build -f Dockerfile.secure -t personal-website-secure .
```

## 📁 Project Structure

```
personal-website/
├── public/
│   ├── images/          # Static images
│   └── vite.svg         # Vite logo
├── src/
│   ├── components/      # React components
│   │   ├── About.tsx
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── Socials.tsx
│   │   ├── icons.tsx
│   │   └── Loader.tsx
│   ├── App.tsx          # Main application component
│   ├── Context.tsx      # React context
│   ├── main.tsx         # Application entry point
│   └── *.css            # Styling files
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Styling

This project uses Tailwind CSS 4 with the Vite plugin for optimal development experience:

- Utility-first CSS framework
- Responsive design out of the box
- Custom configuration in `tailwind.config.js`

## 🔧 Configuration

### TypeScript

The project uses TypeScript with strict type checking:

- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### ESLint

ESLint is configured with TypeScript and React support:

- Type-aware linting rules
- React Hooks plugin
- React Refresh plugin

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is private and proprietary.
