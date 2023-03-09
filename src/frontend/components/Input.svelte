<script>
    export let label = '';
    export let id;
    export let name;
    export let type = 'text';
    export let value;
    export let required = false;
</script>

<div class="pb-3 w-full">
    <label class="text-sm pb-1 ml-1" for={label}>{label}</label>

    {#if type == 'text'}
        <input
            type="text"
            class="w-full rounded-md bg-gray-600 text-gray-100 border-none focus:shadow-none focus:border-none focus:ring-orange-600 focus:ring-2"
            {id}
            {name}
            bind:value
            {required}
        />
    {:else if type == 'number'}
        <input
            type="number"
            class="w-full rounded-md bg-gray-600 text-gray-100 border-none focus:shadow-none focus:border-none focus:ring-orange-600 focus:ring-2"
            {id}
            {name}
            bind:value
            {required}
        />
    {:else}
        <!-- else content here -->
    {/if}
</div>
