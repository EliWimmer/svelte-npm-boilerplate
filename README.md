# Svelte 5 UI Component Package

A modern, reusable UI component library built with Svelte 5, featuring TypeScript support and modern development tooling.

## Features

- 🚀 Built with Svelte 5 and the latest runes API
- 📘 Full TypeScript support
- 🎨 Modern, accessible UI components
- 🛠️ Complete development toolchain (ESLint, Prettier, Playwright)
- 📦 Optimized for npm packaging
- 🔧 SvelteKit for development and packaging

## Components

### Button
A flexible button component with multiple variants and sizes.

**Props:**
- `variant?: 'primary' | 'secondary' | 'danger'` - Button style variant
- `size?: 'small' | 'medium' | 'large'` - Button size
- `disabled?: boolean` - Disabled state
- `onclick?: () => void` - Click handler

**Example:**
```svelte
<Button variant="primary" size="medium" onclick={handleClick}>
  Click me!
</Button>
```

### Card
A card container component for organizing content.

**Props:**
- `title?: string` - Card title
- `subtitle?: string` - Card subtitle

**Example:**
```svelte
<Card title="My Card" subtitle="A simple card">
  <p>Card content goes here</p>
</Card>
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run preview` - Preview the built project
- `npm run package` - Package the library for npm
- `npm run test` - Run Playwright tests
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Lint the codebase
- `npm run format` - Format the codebase

## Building for Production

To package the library for npm:

```bash
npm run package
```

This will create a `dist` folder with the packaged components ready for publishing.

## Publishing to npm

1. Update the version in `package.json`
2. Run `npm run package` to build the library
3. Run `npm publish` to publish to npm

## Project Structure

```
src/
├── lib/
│   ├── Button.svelte      # Button component
│   ├── Card.svelte        # Card component
│   └── index.ts           # Main exports
├── routes/
│   ├── +layout.svelte     # Layout component
│   └── +page.svelte       # Demo page
└── app.d.ts               # Type definitions
```

## TypeScript Support

This project is built with TypeScript for better developer experience and type safety. All components include proper type definitions that will be available when using the package.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT 