<script>
	import Card from '../components/Card.svelte';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import { onMount } from 'svelte';

	let bb_col1 = '';
	let bb_col2 = '';
	let autoPlayTime = 5;

	onMount(async () => {
		// Get Default Values from Config
		autoPlayTime = await window.api.getAPTime('defaultBB');
	});

	const handlePlay = () => {
		const data = {
			slot: 'defaultBB',
			auto: false,
			templateData: [bb_col1, bb_col2],
			duration: autoPlayTime
		};
		// console.log(data);
		window.api.playCG(data);
	};

	const handleStop = () => {
		window.api.stopCG('defaultBB');
	};

	const handleAutoPlay = () => {
		const data = {
			slot: 'defaultBB',
			auto: true,
			templateData: [bb_col1, bb_col2],
			duration: autoPlayTime
		};
		window.api.playCG(data);
	};
</script>

<Card title="Bauchbinde" description="Bauchbinde mit zwei Zeilen">
	<form class="my-2">
		<Input label="Zeile 1" name="bb_col1" id="bb_col1" bind:value={bb_col1} required />
		<Input label="Zeile 2" name="bb_col2" id="bb_col2" bind:value={bb_col2} />

		<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
			<div class="flex flex-row gap-2">
				<Button style="green" on:click={handlePlay}>Start</Button>
				<Button style="red" on:click={handleStop}>Stop</Button>
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
