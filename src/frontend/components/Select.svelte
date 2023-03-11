<script>
	export let label = '';
	export let id;
	export let name;
	export let value;
	export let disabled = false;
	export let options = [];
</script>

<div class="pb-3 w-full">
	<label for={id} class="text-sm pb-1 ml-1">{label}</label>
	<select
		bind:value
		{name}
		{id}
		{disabled}
		class="w-full rounded-md bg-gray-600 text-gray-100 border-none focus:shadow-none focus:border-none focus:ring-orange-600 focus:ring-2"
	>
		{#each options as option, id}
			<option value={id}>{option}</option>
		{/each}
	</select>
</div>
