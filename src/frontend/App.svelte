<script>
	import TopBar from './components/TopBar.svelte';
	import BBGeneric from './cards/BB_Generic.svelte';
	import InfoBar from './cards/InfoBar.svelte';
</script>

<main class="bg-gray-800 w-full h-full p-4 text-gray-100 ">
	<TopBar />
	<!-- Content Grid -->
	<div class="flex gap-5 flex-wrap">
		<BBGeneric />
		<InfoBar />
	</div>
</main>

<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';

	body {
		padding: 0;
	}
</style>
