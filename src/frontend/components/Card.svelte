<script>
	export let title;
	export let description;
</script>

<div class="flex flex-col bg-gray-700 p-3 rounded-md mt-2 max-w-md">
	<h3 class="text-xl">{title}</h3>
	<p class="text-sm italic">{description}</p>
	<slot />
</div>
