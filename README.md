# RenewBlocks Website

Official website for **RenewBlocks** — hollow partition blocks made from shredded plastic, incinerator ash, and limestone quarry dust, cured with CO2 gas. Built in Baku, piloting in Sumgait, Azerbaijan.

## Project Structure

```
renewblock/
├── public/                # Static assets
│   ├── css/
│   │   └── style.css      # Global design system & styles
│   └── js/
│       └── main.js        # Site interactivity scripts
├── index.html             # Home page
├── technology.html        # Technology & specs page
├── about.html             # About team & project page
├── contact.html           # Contact page
├── vite.config.js         # Multi-page build configuration
├── vercel.json            # Vercel deployment configuration
└── package.json           # Project dependencies & scripts
```

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## Deployment

The website is configured for automatic deployment on **Vercel** with Vite multi-page bundling and clean URLs.
