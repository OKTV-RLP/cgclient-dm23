<script>
	import Card from '../components/Card.svelte';
	import Button from '../components/Button.svelte';
	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	// Get Default Values from Config
	// 	infoOptions = await window.api.getSelectOptions(slot);
	// 	// console.log(infoOptions);
	// });

	let loading = false;
	let csv = [];

	const handleTest = async () => {
		loading = true;
		csv = await window.api.testCSV();
		loading = false;
	};

	$: console.log(loading);
	$: console.log(csv);
</script>

<Card title="Test" description=" ">
	<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
		<div class="flex flex-row gap-2">
			<Button style="green" on:click={handleTest}>getCSV</Button>
			<!-- <Button style="red" on:click={handleStop}>Stop</Button>
				<Button style="blue" on:click={handleClear}>!Clear!</Button> -->
		</div>
	</div>
</Card>
