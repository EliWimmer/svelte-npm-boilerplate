<script lang="ts">
	import { Button, Card } from '$lib';

	let count = $state(0);

	const increment = () => {
		count++;
	};

	const decrement = () => {
		count--;
	};

	const reset = () => {
		count = 0;
	};
</script>

<svelte:head>
	<title>Svelte UI Component Demo</title>
	<meta name="description" content="Demo page for Svelte 5 UI components" />
</svelte:head>

<main>
	<h1>Svelte 5 UI Component Demo</h1>

	<Card title="Button Component Examples" subtitle="Different button variants and sizes">
		<div class="button-grid">
			<div class="button-section">
				<h4>Variants</h4>
				<Button onclick={increment}>Primary Button</Button>
				<Button variant="secondary" onclick={decrement}>Secondary Button</Button>
				<Button variant="danger" onclick={reset}>Danger Button</Button>
			</div>

			<div class="button-section">
				<h4>Sizes</h4>
				<Button size="small" onclick={increment}>Small</Button>
				<Button size="medium" onclick={increment}>Medium</Button>
				<Button size="large" onclick={increment}>Large</Button>
			</div>

			<div class="button-section">
				<h4>States</h4>
				<Button onclick={increment}>Enabled</Button>
				<Button disabled>Disabled</Button>
			</div>
		</div>
	</Card>

	<Card title="Counter Example" subtitle="Current count: {count}">
		<p>This counter demonstrates the button components in action.</p>
		<div class="counter-controls">
			<Button variant="secondary" onclick={decrement}>-</Button>
			<span class="count">{count}</span>
			<Button onclick={increment}>+</Button>
			<Button variant="danger" onclick={reset}>Reset</Button>
		</div>
	</Card>

	<Card title="Nested Card Example">
		<p>This demonstrates how cards can contain other content and components.</p>
		<Card title="Nested Card" subtitle="A card within a card">
			<p>This is content inside a nested card component.</p>
			<Button>Nested Button</Button>
		</Card>
	</Card>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	h1 {
		text-align: center;
		color: #111827;
		margin-bottom: 2rem;
	}

	.button-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.button-section {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	.button-section h4 {
		margin: 0;
		min-width: 100px;
		color: #374151;
		font-weight: 500;
	}

	.counter-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.count {
		font-size: 1.5rem;
		font-weight: bold;
		color: #3b82f6;
		min-width: 2rem;
		text-align: center;
	}

	:global(body) {
		margin: 0;
		background-color: #f9fafb;
	}
</style> 