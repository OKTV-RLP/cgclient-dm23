<script>
    import { onMount } from 'svelte';

    let time = new Date();
    $: currentTime =
        ('00' + time.getHours()).slice(-2) +
        ':' +
        ('00' + time.getMinutes()).slice(-2) +
        ':' +
        ('00' + time.getSeconds()).slice(-2);

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 500);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<section class="flex flex-row justify-between mb-4">
    <h1 class="text-2xl bold">naheTV | Grafikcontroller DM Ropeskipping</h1>
    <!-- Sektion rechts -->
    <section class="flex flex-row items-end gap-2 cursor-default">
        <div class="flex flex-col">
            <button
                class="bg-green-700 rounded-lg border-none text-xs px-2 py-1 cursor-default"
                >CG connected</button
            >
        </div>
        <!-- Uhrzeit -->
        <div class="flex flex-col items-end">
            <p class="text-xs">Current Time</p>
            <h4 class="bold text-xl">{currentTime}</h4>
        </div>
    </section>
</section>
