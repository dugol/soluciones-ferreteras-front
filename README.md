# Soluciones Ferreteras - Website Frontend

![Deploy Status](https://github.com/USERNAME/soluciones-ferreteras/workflows/Deploy%20to%20Firebase%20Hosting/badge.svg)

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
- `npm run generate:products` - Generate products.json from DESCRIPCIONES.md
- `npm run build` - Build for production (auto-generates products first)
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

## Email Service Configuration

The contact form uses **EmailJS** for sending inquiries and **Google reCAPTCHA v3** for spam protection.

### Setting up EmailJS

1. **Create an EmailJS Account**:
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Sign up for a free account (200 emails/month included)

2. **Add Email Service**:
   - In the EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Configure with your corporate email credentials
   - Note the **Service ID** (e.g., `service_abc123`)

3. **Create Email Template**:
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Configure the template with these variables:
     ```
     Subject: Nuevo contacto desde web: {{from_name}}

     From: {{from_name}} ({{from_email}})
     Phone: {{phone}}

     Message:
     {{message}}

     ---
     Sent from Soluciones Ferreteras Contact Form
     ```
   - Note the **Template ID** (e.g., `template_xyz789`)

4. **Get Public Key**:
   - Go to "Account" → "General"
   - Copy your **Public Key** (e.g., `pk_abc123xyz`)

5. **Optional - Configure Auto-Reply**:
   - In your email template, enable "Auto Reply"
   - Customize the auto-reply message to confirm receipt

### Setting up Google reCAPTCHA v3

1. **Create reCAPTCHA Site**:
   - Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Click "+" to create a new site
   - Label: "Soluciones Ferreteras Contact Form"
   - reCAPTCHA type: Select "reCAPTCHA v3"
   - Domains: Add your domain(s) (e.g., `solucionesferreteras.com`, `localhost` for dev)
   - Accept terms and submit

2. **Copy Site Key**:
   - After creation, copy the **Site Key** (starts with `6L...`)
   - You'll also see a Secret Key (for backend, not needed for this setup)

### Environment Variables Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** and add your credentials:
   ```env
   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=pk_abc123xyz

   # reCAPTCHA v3 Configuration
   VITE_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Important**: Never commit the `.env` file to Git! It's already in `.gitignore`.

### Testing Email Delivery

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the Contact page**: `http://localhost:5173/contacto`

3. **Fill out the form** with test data and submit

4. **Verify**:
   - Check your configured email inbox for the contact form submission
   - Check the sender's email (if auto-reply is enabled)
   - Check browser console for any errors

### Production Deployment

For production deployment, add the environment variables to your hosting platform:

#### Firebase Hosting + GitHub Actions

1. **Add secrets to GitHub**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `EMAILJS_SERVICE_ID`
     - `EMAILJS_TEMPLATE_ID`
     - `EMAILJS_PUBLIC_KEY`
     - `RECAPTCHA_SITE_KEY`

2. **Update GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   - name: Build
     env:
       VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
       VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
       VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
       VITE_RECAPTCHA_SITE_KEY: ${{ secrets.RECAPTCHA_SITE_KEY }}
     run: npm run build
   ```

### Troubleshooting

**Email not sending:**
- Verify all environment variables are set correctly
- Check EmailJS dashboard for error logs
- Check browser console for errors
- Verify your EmailJS account is active and within email quota

**reCAPTCHA errors:**
- Verify the Site Key is correct
- Check that your domain is whitelisted in reCAPTCHA admin
- For local development, ensure `localhost` is in the allowed domains

**"reCAPTCHA not initialized" error:**
- Verify `VITE_RECAPTCHA_SITE_KEY` is set in `.env`
- Restart the development server after changing `.env`

## Firebase Deployment

This project is configured for automated deployment to Firebase Hosting.

### Initial Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project" or select existing project
   - Name it `soluciones-ferreteras`
   - Follow the setup wizard

2. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:
   ```bash
   firebase login
   ```

4. **Link the project**:
   ```bash
   cd frontend
   firebase use soluciones-ferreteras
   ```

### Manual Deployment

To deploy manually to Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

Your site will be available at: `https://soluciones-ferreteras.web.app`

### CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

- **On Push to `main`**: Automatically builds and deploys to production
- **On Pull Requests**: Creates a preview deployment with a temporary URL

#### Setting up CI/CD

1. **Generate Firebase Service Account**:
   ```bash
   firebase login:ci
   ```
   This will generate a token. Copy it.

2. **Add GitHub Secret**:
   - Go to your GitHub repository settings
   - Navigate to Secrets and Variables > Actions
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the token from step 1
   - Click "Add secret"

3. **Workflow File**: Already configured at `.github/workflows/deploy.yml`

The workflow will:
- Install dependencies
- Run linter
- Build the project
- Deploy to Firebase Hosting (production on `main`, preview on PRs)

### Custom Domain Configuration

To add a custom domain to your Firebase Hosting site:

1. **Add Domain in Firebase Console**:
   - Go to Firebase Console > Hosting
   - Click "Add custom domain"
   - Enter your domain name (e.g., `www.solucionesferreteras.com`)

2. **Update DNS Records**:
   - Add the TXT record provided by Firebase for verification
   - Add the A records pointing to Firebase's IP addresses

3. **SSL Certificate**:
   - Firebase automatically provisions and manages SSL certificates
   - The certificate will be ready within 24 hours

4. **Recommended DNS Setup**:
   ```
   Type    Name    Value
   A       @       199.36.158.100
   A       @       199.36.158.101
   A       www     199.36.158.100
   A       www     199.36.158.101
   ```

5. **Wait for Propagation**:
   - DNS changes can take up to 48 hours to propagate
   - Check status in Firebase Console

For more information, see [Firebase Custom Domain Documentation](https://firebase.google.com/docs/hosting/custom-domain)

## Performance Optimization

This project implements multiple performance optimizations to ensure fast load times and excellent user experience.

### Implemented Optimizations

#### Code Splitting
- **Route-based splitting** using React.lazy() and Suspense
- Separate chunks for each page (Home, Catalog, Contact, ProductDetail)
- Reduces initial bundle size and improves time-to-interactive
- Bundle sizes:
  - Main bundle: 259.79 KB (84.08 KB gzipped)
  - Contact page: 92.03 KB (27.28 KB gzipped)
  - Product Detail: 10.59 KB (3.23 KB gzipped)
  - Catalog: 3.68 KB (1.43 KB gzipped)
  - Home: 5.35 KB (1.83 KB gzipped)

#### Image Optimization
- **WebP format**: All product images converted to WebP with 40-98% size reduction
- **Lazy loading**: Native `loading="lazy"` attribute on all product images
- **Priority loading**: First/hero images load eagerly, others lazy
- **Responsive images**: Proper aspect ratios and object-fit
- Original format fallback for browser compatibility

#### Caching Strategy
- **Browser caching headers** configured in `firebase.json`:
  - Images: 1 year cache (`max-age=31536000`)
  - JS/CSS: 1 year cache with content hashing for cache busting
- **Gzip/Brotli compression** automatically enabled by Firebase Hosting

#### Bundle Analysis
View bundle composition:
```bash
npm run build
open dist/stats.html  # Opens bundle visualizer
```

### Performance Targets

- **Lighthouse Performance**: > 90 (desktop), > 80 (mobile)
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Bundle Size**: Main bundle < 500KB (achieved: 259.79 KB)

### Running Performance Audits

#### Using Lighthouse (Chrome DevTools)
1. Build the production version: `npm run build`
2. Preview locally: `npm run preview`
3. Open Chrome DevTools (F12)
4. Navigate to "Lighthouse" tab
5. Select "Performance" and "Accessibility"
6. Click "Analyze page load"

#### Using WebPageTest
1. Deploy to production
2. Visit [WebPageTest.org](https://www.webpagetest.org/)
3. Enter your production URL
4. Select test location and device
5. Run test and analyze Core Web Vitals

## Production URL

**Live Site**: To be deployed
**Firebase URL**: `https://soluciones-ferreteras.web.app` (pending deployment)

## License

Private - Soluciones Ferreteras

## Contact

For questions or support, please use the contact form on the website.
