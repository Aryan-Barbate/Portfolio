# Aryan Barbate — Developer Portfolio

A premium, editorial-style developer portfolio built to showcase live products, creative experiments, and structured developer journals.

---

## 🚀 Live Demos & Shipped Projects

- **Linea Flora**: [Live Link](https://linea-flora-ab.vercel.app/) | [Source Code](https://github.com/Aryan-Barbate/Linea-Flora)
- **AniScope**: [Live Link](https://ani-scope-nine.vercel.app) | [Source Code](https://github.com/Aryan-Barbate/AniScope)
- **GitHub Finder**: [Live Link](https://ab-github-finder.vercel.app/) | [Source Code](https://github.com/Aryan-Barbate/GitHub-Finder)
- **Gallery of Senses**: [Live Link](https://ab-gallery-of-senses.vercel.app/) | [Source Code](https://github.com/Aryan-Barbate/The-Gallery-of-Senses)

---

## 🛠️ Tech Stack & Key Features

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/) (fast HMR, lightweight bundle size).
- **Styling**: Vanilla CSS custom design system tailored with fine HSL color tokens.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page reveals, micro-animations, and physics-based card modal transitions.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp vector symbols.
- **Dark Mode**: Dynamic system toggle synchronized with `localStorage` and adaptive SVG favicons.
- **Form Delivery**: AJAX submission via **Formspree** with an automatic graceful fallback to local `mailto` email clients.
- **Analytics**: Integrated lightweight Vercel Analytics scripts.

---

## 💎 Advanced Interactive Features

### 1. Keyboard-Navigable Command Palette (`Ctrl + K` or `Cmd + K`)
An accessibility-first overlay console triggered via `Ctrl + K` keyboard combinations or visual buttons. 
*   **Whitespace-Stripped Shortcut Matching**: Instantly traverses commands using short commands (e.g., typing `gh` matches `Go to Home` (`G H`), `gp` matches `Go to Projects` (`G P`), etc.).
*   **Full Keyboard Support**: Navigate results with `ArrowUp`/`ArrowDown`, trigger actions with `Enter`, and exit with `Escape`.
*   **Frosted Glassmorphism**: Premium backdrop blurring and centered typography alignments.

### 2. Command Center CLI Terminal Panel
A hybrid tabbed developer dashboard situated inside the main layouts:
*   **Activity Tab**: Simulates a live git commit graph feed (`git log --oneline --graph`).
*   **Interactive Shell**: Runs a custom-built mock shell:
    *   `about` — Profile biography.
    *   `skills [query]` — Programmatically checks stack tags in the projects database and shows matching results.
    *   `projects [query]` — Interactive details and source links.
    *   `gui [section]` — Smooth scrolls browser viewport to targets.
    *   `neofetch` — ASCII logo and system environment variables.
    *   `contact` & `clear` — Details and buffer clearing.

---

## 🎨 Editorial Design System

The portfolio leverages a highly tailored editorial style resembling a design journal:
- **Typography**: Uses **Syne** for display headings, **Instrument Serif** for expressive serif italics, and **Space Mono** for structural/technical metadata.
- **Color Palette**:
  - **Light Mode**: Cream paper (`#f4f0e8`), soft ink (`#2a2824`), and hot orange accents (`#e85d04`).
  - **Dark Mode**: Charcoal paper (`#0d0c0a`), soft cream (`#ebe5d9`), and neon orange glow (`#ff7214`).
- **Texture**: Fixed high-performance SVG noise/grain overlay overlaying the background for an organic, textured tactile feel.

---

## 📂 Project Structure

```bash
├── public/
│   ├── avatar.jpg         # Profile photo
│   ├── og-image.png       # Link preview metadata image
│   ├── favicon.svg        # Adaptive light/dark theme favicon
│   └── resume.pdf         # Downloadable CV PDF
├── src/
│   ├── components/
│   │   ├── Nav.jsx            # Navigation with theme sync listeners
│   │   ├── CommandPalette.jsx # Ctrl+K Keyboard Search console
│   │   ├── Hero.jsx           # Hero Section + Resume download trigger
│   │   ├── Work.jsx           # Drag-and-scroll Project Card Gallery
│   │   ├── ProjectModal.jsx   # Case Study Modal Reader
│   │   ├── Journey.jsx        # Timeline experience log
│   │   ├── Capabilities.jsx   # Custom Skills Grouping
│   │   ├── GithubConsole.jsx  # Tabbed Git CLI Console
│   │   ├── About.jsx          # Profile Biography
│   │   ├── Writing.jsx        # Developer Journal list + inline reader
│   │   ├── Contact.jsx        # Formspree Form with mailto fallback
│   │   └── Footer.jsx         # Site footer & GitHub repo link
│   ├── hooks/
│   │   └── useScrollReveal.js # Intersection Observer reveal transitions
│   ├── index.css              # Core Design System (Tokens, Utilities & Layouts)
│   └── main.jsx               # App bootstrapping
├── index.html                 # SEO tags, Dynamic Theme Background & Analytics
└── package.json               # Dependencies and build scripts
```

---

## ⚡ Setup & Installation

### Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aryan-Barbate/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📧 Formspree Configuration

To receive contact form submissions directly in your email inbox without running a custom backend:
1. Sign up for a free account at [Formspree](https://formspree.io/).
2. Create a new form project and copy the **Form ID** (a 8-character hash like `xoqpyvky`).
3. Open [src/components/Contact.jsx](file:///c:/Users/aryan/OneDrive/Desktop/Programming/Coding/Portfolio/src/components/Contact.jsx) and replace the placeholder `FORMSPREE_ID`:
   ```javascript
   // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
   const FORMSPREE_ID = 'yourFormspreeId';
   ```
4. Submissions will now be delivered to your Formspree dashboard. If the ID is left as `'YOUR_FORMSPREE_ID'`, the application will automatically fall back to opening your personal `mailto` mail link seamlessly.
