<script>
	import Card from '../components/Card.svelte';
	// import Button from '../components/Button.svelte';
	// import Input from '../components/Input.svelte';
	import { onMount } from 'svelte';

	let ib_col1 = 0;
	let ib_col2 = '';
	let infoOptions = [];
	let disciplines = [];
	let disabled = false;

	const slot = 'infoBar';

	onMount(async () => {
		// Get Default Values from Config
		infoOptions = await window.api.getSelectOptions(slot);
		console.log(infoOptions);
	});

	$: disciplines = infoOptions.length > 0 ? infoOptions[ib_col1].disciplines : [];
	$: disabled = disciplines.length === 0 ? true : false;

	// const handlePlay = () => {
	// 	const data = {
	// 		slot,
	// 		auto: false,
	// 		templateData: [bb_col1, bb_col2],
	// 		duration: autoPlayTime
	// 	};
	// 	// console.log(data);
	// 	window.api.playCG(data);
	// };

	// const handleStop = () => {
	// 	window.api.stopCG(slot);
	// };

	// const handleClear = () => {
	// 	window.api.clearCG(slot);
	// };

	// const handleAutoPlay = () => {
	// 	const data = {
	// 		slot,
	// 		auto: true,
	// 		templateData: [bb_col1, bb_col2],
	// 		duration: autoPlayTime
	// 	};
	// 	window.api.playCG(data);
	// };
</script>

<Card title="Info-Bar" description="Infobereich mit Wettkampf und Disziplin">
	<form class="my-2">
		<label for="ib_col1">Turnier</label>
		<select
			bind:value={ib_col1}
			name="tournament"
			id="ib_col1"
			class="w-full rounded-md bg-gray-600 text-gray-100 border-none focus:shadow-none focus:border-none focus:ring-orange-600 focus:ring-2"
		>
			{#each infoOptions as option, id}
				<option value={id}>{option.name}</option>
			{/each}
		</select>

		<label for="ib_col2">Disziplin</label>
		<select
			bind:value={ib_col2}
			name="discipline"
			id="ib_col2"
			{disabled}
			class="w-full rounded-md bg-gray-600 text-gray-100 border-none focus:shadow-none focus:border-none focus:ring-orange-600 focus:ring-2"
		>
			{#each disciplines as discipline}
				<option>{discipline}</option>
			{/each}
		</select>

		<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
			<div class="flex flex-row gap-2">
				<!-- <Button style="green" on:click={handlePlay}>Start</Button>
				<Button style="red" on:click={handleStop}>Stop</Button>
				<Button style="blue" on:click={handleClear}>!Clear!</Button> -->
			</div>
		</div>
	</form></Card
>
