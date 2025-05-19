# create-vite-island

A scaffolding tool for generating [Vite Island Architecture](https://github.com/jonathanmoore/vite-island) boilerplate projects using the Islands Architecture pattern with Vite and vanilla JavaScript.

## Quick Start

```bash
npx create-vite-island my-app
cd my-app
npm install
npm run dev
```

## Features

- ✨ **Islands Architecture**: Static-first HTML with interactive islands
- ⚡ **Vite** for lightning-fast development and build
- 🧩 **Web Components** for encapsulated interactivity
- 🎯 **Progressive enhancement** as the default strategy
- 🧪 **Vitest** for testing your components
- 🌈 **Micro-animations** and state-driven styling
- 📦 Minimal, modern boilerplate — no frameworks required

## Project Structure

```
my-app/
├── public/          # Static assets
│   ├── components/  # Web Components
│   ├── styles/      # Global styles
│   └── utils/       # Utility functions
├── index.html       # Entry point
└── vite.config.js   # Vite configuration
```

## Key Features

### Components
- `ClickCounter` and `ClickCount` components
- Lazy/conditional loading directives:
  - `client:idle` - Loads when browser is idle
  - `client:media` - Loads based on media queries
  - `client:visible` - Loads when component is visible

### Development
- Hot Module Replacement (HMR)
- TypeScript support
- CSS modules
- Asset handling
- Environment variables

### Testing
- Vitest for unit testing
- Component testing utilities
- Example test cases included

### Styling
- TailwindCSS via data attributes
- Utility animations for smooth UI feedback
- CSS custom properties
- Responsive design utilities

## Usage Examples

### Creating a New Component

```js
// src/components/MyComponent.js
export class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>Hello from MyComponent!</div>`;
  }
}

customElements.define('my-component', MyComponent);
```

### Using in HTML

```html
<my-component client:idle></my-component>
```

## Learn More

This project generator is based on the [`vite-island`](https://github.com/jonathanmoore/vite-island) boilerplate.

To dive deeper into the architecture, components and patterns, check out the full documentation and source here:
👉 [jonathanmoore/vite-island](https://github.com/jonathanmoore/vite-island)

## License
MIT
