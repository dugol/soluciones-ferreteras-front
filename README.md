# Soluciones Ferreteras - Website Frontend

Professional website for Soluciones Ferreteras, showcasing high-quality plumbing and faucet products.

## Project Overview

This is a React-based web application built to display Soluciones Ferreteras' product catalog with a modern, industrial-professional design. The site features a landing page, product catalog, product detail views, and a contact form.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6 (to be added)
- **Forms**: React Hook Form + Zod (to be added)
- **Testing**: Vitest + React Testing Library + Playwright (to be added)
- **Hosting**: Firebase Hosting (to be configured)

## Design System

The application uses a custom color palette derived from the company logo:

- **Brand Red**: `#C41E3A` (Primary accent, CTAs)
- **Brand Red Dark**: `#A01830` (Hover states)
- **Gray Dark**: `#333333` (Primary text, headers)
- **Gray Medium**: `#666666` (Secondary text)
- **Gray Light**: `#E0E0E0` (Borders, dividers)
- **Gray Lighter**: `#F5F5F5` (Section backgrounds)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components (Home, Catalog, Contact, etc.)
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── assets/        # Static assets (images, icons)
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles and Tailwind config
├── public/            # Static files
└── docs/              # Project documentation (in parent directory)
```

## Development Guidelines

- All code must pass TypeScript strict mode checks
- Follow ESLint and Prettier configurations
- Use Tailwind utility classes for styling
- Maintain component modularity and reusability
- Write meaningful commit messages

## Product Data

Product information is loaded from:
- Descriptions: `../docs/DESCRIPCIONES.md`
- Images: `../docs/images/` (pattern: `{PRODUCT_CODE}-{NUMBER}.extension`)
- Logo: `../docs/logo/logo.png`

## License

Private - Soluciones Ferreteras

## Contact

For questions or support, please use the contact form on the website.
