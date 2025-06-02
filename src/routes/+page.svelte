<script lang="ts">
	import { Button, Card } from 'svelte-npm-boilerplate';

	let count = 0;

	function handleIncrement() {
		count++;
	}

	function handleDecrement() {
		count--;
	}

	function handleReset() {
		count = 0;
	}
</script>

<svelte:head>
	<title>Testing svelte-npm-boilerplate</title>
</svelte:head>

<main>
	<h1>Testing svelte-npm-boilerplate Package</h1>
	<p>This page demonstrates the components from your npm package working in a separate project.</p>

	<section>
		<h2>Button Component Tests</h2>
		<div class="button-grid">
			<Button variant="primary" size="small" onclick={handleIncrement}>
				Increment (Small)
			</Button>
			<Button variant="secondary" size="medium" onclick={handleDecrement}>
				Decrement (Medium)
			</Button>
			<Button variant="danger" size="large" onclick={handleReset}>
				Reset (Large)
			</Button>
		</div>
		<p>Count: <strong>{count}</strong></p>
	</section>

	<section>
		<h2>Card Component Tests</h2>
		<div class="card-grid">
			<Card title="Basic Card" subtitle="Simple example">
				<p>This is a basic card with title and subtitle.</p>
			</Card>

			<Card title="Interactive Card">
				<p>Current count: {count}</p>
				<Button variant="primary" onclick={handleIncrement}>
					Click me!
				</Button>
			</Card>

			<Card>
				<h3>Card without props</h3>
				<p>This card doesn't have title or subtitle props.</p>
			</Card>
		</div>
	</section>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: Arial, sans-serif;
	}

	h1 {
		color: #333;
		text-align: center;
		margin-bottom: 2rem;
	}

	h2 {
		color: #555;
		margin: 2rem 0 1rem 0;
	}

	section {
		margin-bottom: 3rem;
	}

	.button-grid {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	p {
		line-height: 1.6;
		color: #666;
	}

	strong {
		color: #333;
		font-size: 1.2em;
	}
</style> 