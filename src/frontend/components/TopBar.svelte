<script>
	import StatusBtn from './StatusBtn.svelte';
	import { onMount } from 'svelte';
	import { time } from '../stores/stores';

	let connection = {
		connected: false,
		host: '',
		port: ''
	};

	const formatter = new Intl.DateTimeFormat('de', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});

	// let time = new Date();
	// $: currentTime =
	// 	('00' + time.getHours()).slice(-2) +
	// 	':' +
	// 	('00' + time.getMinutes()).slice(-2) +
	// 	':' +
	// 	('00' + time.getSeconds()).slice(-2);

	onMount(async () => {
		connection = await window.api.getCGStatus();

		// const interval = setInterval(() => {
		// 	time = new Date();
		// }, 500);

		// return () => {
		// 	clearInterval(interval);
		// };
	});

	window.api.onStatusCG((_event, data) => {
		connection = data;
	});
</script>

<section class="flex flex-row justify-between mb-4">
	<h1 class="text-2xl bold">naheTV | Grafikcontroller DM Ropeskipping</h1>
	<!-- Sektion rechts -->
	<section class="flex flex-row items-end gap-2 cursor-default">
		<div class="flex flex-col">
			<StatusBtn name="CG" {connection} />
		</div>
		<!-- Uhrzeit -->
		<div class="flex flex-col items-end">
			<p class="text-xs">Current Time</p>
			<h4 class="bold text-xl">{formatter.format($time)}</h4>
		</div>
	</section>
</section>
