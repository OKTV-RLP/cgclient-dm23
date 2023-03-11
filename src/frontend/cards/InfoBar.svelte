<script>
	import Card from '../components/Card.svelte';
	import Button from '../components/Button.svelte';
	import Select from '../components/Select.svelte';
	import { onMount } from 'svelte';

	let id_col1 = 0;
	let id_col2 = 0;
	let infoOptions = [];
	let tournaments = [];
	let disciplines = [];
	let disabled = false;

	const slot = 'infoBar';

	onMount(async () => {
		// Get Default Values from Config
		infoOptions = await window.api.getSelectOptions(slot);
		// console.log(infoOptions);
	});

	$: disciplines = infoOptions.length > 0 ? infoOptions[id_col1].disciplines : [];
	$: disabled = disciplines.length === 0 ? true : false;
	$: id_col2 = disabled ? '' : 0;
	$: tournaments = infoOptions.map((options) => options.name);

	const handlePlay = () => {
		const ln1 = infoOptions[id_col1].name;
		const ln2 = disabled ? ' ' : disciplines[id_col2];
		const data = {
			slot,
			auto: false,
			templateData: [ln1, ln2],
			duration: 0
		};
		// console.log(data);
		window.api.playCG(data);
	};

	const handleStop = () => {
		window.api.stopCG(slot);
	};

	const handleClear = () => {
		window.api.clearCG(slot);
	};

	const handleUpdate = () => {
		const ln1 = infoOptions[id_col1].name;
		const ln2 = disabled ? ' ' : disciplines[id_col2];
		const data = {
			slot,
			auto: false,
			templateData: [ln1, ln2],
			timeout: 1000
		};
		// console.log(data);
		window.api.updateCG(data);
	};
</script>

<Card title="Info-Bar" description="Infobereich mit Wettkampf und Disziplin">
	<form class="my-2">
		<Select
			bind:value={id_col1}
			label="Turnier"
			name="tournament"
			id="ib_col1"
			options={tournaments}
		/>

		<Select
			bind:value={id_col2}
			label="Disziplin"
			name="discipline"
			id="ib_col2"
			{disabled}
			options={disciplines}
		/>

		<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
			<div class="flex flex-row gap-2">
				<Button style="green" on:click={handlePlay}>Start</Button>
				<Button style="red" on:click={handleStop}>Stop</Button>
				<Button style="blue" on:click={handleClear}>!Clear!</Button>
			</div>
			<div class="flex flex-row justify-end">
				<Button style="light-green" on:click={handleUpdate}>Auto-Update</Button>
			</div>
		</div>
	</form></Card
>
