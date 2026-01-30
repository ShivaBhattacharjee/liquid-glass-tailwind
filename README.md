# ✨ Liquid Glass

A beautifully crafted glass displacement effect inspired by Apple's macOS design language. Built with React, Tailwind CSS, and GSAP.

![Liquid Glass](https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop)

## 🎨 Features

- **SVG Displacement Filters** — Advanced chromatic aberration effect using SVG feDisplacementMap
- **Multiple Modes** — Switch between Dock, Pill, and Bubble glass shapes
- **Draggable Interface** — Smooth drag interactions powered by GSAP Draggable
- **Apple-Inspired Design** — Clean, minimal aesthetic with attention to detail
- **Fully Responsive** — Looks great on all screen sizes
- **Tailwind CSS** — Utility-first styling for rapid development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ShivaBhattacharjee/liquid-glass-tailwind/

# Navigate to project directory
cd liquid-glass

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to see the magic ✨

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React](https://react.dev/) | UI Library |
| [Vite](https://vitejs.dev/) | Build Tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [GSAP](https://greensock.com/gsap/) | Animations & Draggable |

## 📁 Project Structure

```
liquid-glass/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main component with glass effect
│   ├── App.css         # Component styles
│   ├── index.css       # Global styles & Tailwind
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🎮 How It Works

The liquid glass effect is achieved through a combination of:

1. **SVG Filters** — A complex filter chain using `feDisplacementMap`, `feColorMatrix`, and `feBlend` to create the chromatic aberration effect
2. **Dynamic Displacement Map** — SVG gradients are generated dynamically based on the glass shape and applied as displacement sources
3. **Backdrop Filter** — CSS `backdrop-filter` combined with the SVG filter URL for the glass blur effect
4. **GSAP Draggable** — Smooth, performant drag interactions

### Glass Modes

| Mode | Description |
|------|-------------|
| **Dock** | Rectangular shape like macOS dock (336×96px) |
| **Pill** | Rounded capsule shape (200×80px) |
| **Bubble** | Perfect circle (140×140px) |

## 🎨 Customization

You can customize the glass effect by modifying the presets in `App.jsx`:

```javascript
const presets = {
  dock: {
    width: 336,      // Glass width
    height: 96,      // Glass height
    radius: 16,      // Border radius
    blur: 11,        // Blur intensity
    scale: -180,     // Displacement scale
    // ... more options
  },
}
```

## 📦 Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shiva Bhattacharjee**

- GitHub: [@shivabhattacharjee](https://github.com/shivabhattacharjee)

---

<p align="center">
  Made with ❤️ and a lot of ☕
</p>
