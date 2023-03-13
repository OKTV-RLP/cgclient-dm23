<script>
	import Card from '../components/Card.svelte';
	import Button from '../components/Button.svelte';

	import { jumpers } from '../stores/stores';

	const handleReload = async () => {
		const result = await window.api.getCSV();
		jumpers.set(result);
	};

	const handleClearAll = () => {
		window.api.clearAllCG();
	};
</script>

<Card title="Utilities">
	<div class="flex flex-row gap-2 mt-2 justify-between h-10 w-full">
		<div class="flex flex-row gap-2">
			<Button style="blue" on:click={handleReload}>Reload CSV</Button>
			<Button style="red" on:click={handleClearAll}>!Clear All!</Button>
		</div>
	</div>
</Card>
