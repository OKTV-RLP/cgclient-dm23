<script>
	export let style = '';

	const baseClasses = 'px-4 rounded-md border-none cursor-pointer';
	let classes;

	switch (style) {
		case 'green':
			classes = `${baseClasses} bg-green-400 text-gray-900`;
			break;
		case 'red':
			classes = `${baseClasses} bg-red-400 text-gray-900`;
			break;
		case 'light-green':
			classes = `${baseClasses} bg-green-300 text-gray-900`;
			break;
		case 'blue':
			classes = `${baseClasses} bg-indigo-500 text-gray-100`;
			break;
		default:
			classes = `${baseClasses} bg-gray-600 text-gray-100`;
			break;
	}
</script>

<button class={classes} on:click|preventDefault>
	<slot />
</button>
