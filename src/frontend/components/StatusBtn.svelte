<script>
	export let name;
	export let connection;

	const baseClasses = 'rounded-lg border-none text-xs px-2 py-1 cursor-default';

	$: classes = connection.status ? `${baseClasses} bg-green-700` : `${baseClasses} bg-red-500`;
	$: connString = connection.status ? 'connected' : 'disconnected';
	$: title = `Host: ${connection.host}, Port: ${connection.port}`;

	$: console.log(connection);
</script>

<button class={classes} {title}>{name} {connString}</button>

<style lang="postcss">
	.btn-base {
		@apply cursor-default rounded-lg border-none bg-blue-400 px-2 py-1 text-xs;
	}

	.btn-connected {
		@apply bg-green-700;
	}

	.btn-disconnected {
		@apply bg-red-500;
	}
</style>
