<script>
	import Card from '../components/Card.svelte';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import Select from '../components/Select.svelte';
	import { onMount } from 'svelte';
	import { jumpers } from '../stores/stores';

	let bb_col1;
	let bb_col2 = '';
	let bb_col3 = '';
	let id_col3 = 0;
	let autoPlayTime = 5;
	// let jumpers = [];
	let selectedJumper = {};
	let categories = [];
	let startnr;

	const slot = 'ceremonyBB';

	// const updateCSV = async () => {
	// 	const result = await window.api.getCSV();
	// 	jumpers.set(result);
	// };

	onMount(async () => {
		// Get Default Values from Config
		autoPlayTime = await window.api.getAPTime(slot);
		categories = await window.api.getSelectOptions(slot);
		// Get CSV Data for Jumpers
		// await updateCSV();
	});

	const handleNrInput = () => {
		if (jumpers.length === 0) {
			return;
		}
		const result = $jumpers.find((jumper) => jumper.stn == startnr);
		if (result !== undefined) {
			selectedJumper = result;
			bb_col2 = selectedJumper.name;
		} else {
			bb_col2 = '';
		}
	};

	$: console.log(bb_col3);

	const handlePlay = () => {
		bb_col3 = categories[id_col3];
		const data = {
			slot,
			auto: false,
			templateData: [bb_col1, bb_col2, bb_col3],
			duration: autoPlayTime
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

	const handleAutoPlay = () => {
		bb_col3 = categories[id_col3];
		const data = {
			slot,
			auto: true,
			templateData: [bb_col1, bb_col2, bb_col3],
			duration: autoPlayTime
		};
		window.api.playCG(data);
	};
</script>

<Card
	title="Bauchbinde Siegerehrung"
	description="Nach Startnummer suchen, Platz und Kategorie wählen"
>
	<form class="my-2">
		<Input
			label="Startnummer"
			name="startnr"
			id="startnr"
			type="number"
			on:input={handleNrInput}
			bind:value={startnr}
		/>
		<Input label="Name" name="bb_col2" id="bb_col2" bind:value={bb_col2} />
		<Input label="Platz" name="bb_col1" id="bb_col1" type="number" bind:value={bb_col1} />
		<Select
			bind:value={bb_col3}
			label="Kategorie"
			name="category"
			id="bb_col3"
			options={categories}
		/>

		<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
			<div class="flex flex-row gap-2">
				<Button style="green" on:click={handlePlay}>Start</Button>
				<Button style="red" on:click={handleStop}>Stop</Button>
				<Button style="blue" on:click={handleClear}>!Clear!</Button>
			</div>

			<div class="flex flex-row gap-2 justify-end">
				<Button style="light-green" on:click={handleAutoPlay}>Auto-Play</Button>
				<div class=" w-1/4 -mt-1">
					<Input
						type="number"
						bind:value={autoPlayTime}
						name="autoPlayTime"
						id="autoPlayTime"
						required
					/>
				</div>
			</div>
		</div>
	</form></Card
>
