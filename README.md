# Svelte NPM Boilerplate

A modern, reusable UI component library built with Svelte 5, featuring TypeScript support and modern development tooling.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/EliWimmer/svelte-npm-boilerplate.git
cd svelte-npm-boilerplate

# Install dependencies
npm install

# Start development server
npm run dev
```

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

## Testing Your Package

Before publishing, it's crucial to test your package as if it were installed from npm. Here's the recommended approach:

### Method 1: Local Package Testing (Recommended)

This method simulates the exact experience users will have when installing your package:

```bash
# 1. Build and create a tarball of your package
npm run package
npm pack
```

This creates a `.tgz` file (e.g., `svelte-npm-boilerplate-1.0.0.tgz`) that contains your packaged library.

```bash
# 2. Create a test project in a separate directory
cd ..
mkdir package-test && cd package-test

# 3. Create a new Svelte project for testing
npx sv create test-app --template minimal --types ts
cd test-app
npm install

# 4. Install your package from the tarball
npm install ../svelte-npm-boilerplate/svelte-npm-boilerplate-1.0.0.tgz
```

```bash
# 5. Test the components in your test project
# Edit src/routes/+page.svelte:
```

```svelte
<script lang="ts">
  import { Button, Card } from 'svelte-npm-boilerplate';

  let count = 0;
</script>

<main>
  <h1>Testing Package Components</h1>
  
  <Card title="Button Test" subtitle="Testing all variants">
    <Button variant="primary" onclick={() => count++}>
      Increment: {count}
    </Button>
    <Button variant="secondary" onclick={() => count--}>
      Decrement
    </Button>
    <Button variant="danger" onclick={() => count = 0}>
      Reset
    </Button>
  </Card>
</main>
```

```bash
# 6. Run the test project
npm run dev
```

### What to Test

- ✅ Package installs without errors
- ✅ TypeScript imports work correctly
- ✅ All component props function as expected  
- ✅ Event handlers work properly
- ✅ Components render with correct styling
- ✅ No dependency conflicts
- ✅ Tree-shaking works (check bundle size)

### Alternative Testing Methods

- **npm link**: For real-time development testing with symlinks
- **Local registry (Verdaccio)**: For testing the complete publish/install workflow
- **GitHub installation**: `npm install github:username/repo-name`

## Publishing to npm

1. Update the version in `package.json`
2. Test your package using the method above
3. Run `npm run package` to build the library
4. Run `npm publish` to publish to npm

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