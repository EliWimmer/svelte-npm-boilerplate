<script lang="ts">
	interface Props {
		title?: string;
		subtitle?: string;
		children: any;
	}

	let { title, subtitle, children }: Props = $props();
</script>

<div class="card">
	{#if title}
		<div class="card__header">
			<h3 class="card__title">{title}</h3>
			{#if subtitle}
				<p class="card__subtitle">{subtitle}</p>
			{/if}
		</div>
	{/if}
	<div class="card__content">
		{@render children()}
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
	}

	.card__header {
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.card__title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #111827;
	}

	.card__subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 0.875rem;
		color: #6b7280;
	}

	.card__content {
		color: #374151;
		line-height: 1.6;
	}
</style> 