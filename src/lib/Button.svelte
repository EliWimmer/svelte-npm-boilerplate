<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'danger';
		size?: 'small' | 'medium' | 'large';
		disabled?: boolean;
		onclick?: () => void;
		children: any;
	}

	let {
		variant = 'primary',
		size = 'medium',
		disabled = false,
		onclick,
		children
	}: Props = $props();

	const handleClick = () => {
		if (!disabled && onclick) {
			onclick();
		}
	};
</script>

<button
	class="btn btn--{variant} btn--{size}"
	{disabled}
	on:click={handleClick}
	type="button"
>
	{@render children()}
</button>

<style>
	.btn {
		border: none;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Variants */
	.btn--primary {
		background-color: #3b82f6;
		color: white;
	}

	.btn--primary:hover:not(:disabled) {
		background-color: #2563eb;
	}

	.btn--secondary {
		background-color: #e5e7eb;
		color: #374151;
	}

	.btn--secondary:hover:not(:disabled) {
		background-color: #d1d5db;
	}

	.btn--danger {
		background-color: #ef4444;
		color: white;
	}

	.btn--danger:hover:not(:disabled) {
		background-color: #dc2626;
	}

	/* Sizes */
	.btn--small {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	}

	.btn--medium {
		padding: 0.75rem 1rem;
		font-size: 1rem;
	}

	.btn--large {
		padding: 1rem 1.5rem;
		font-size: 1.125rem;
	}
</style> 