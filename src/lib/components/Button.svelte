<script type="ts">
    export let invalid: boolean = false;
</script>
<button on:click {...$$restProps} class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" class:bg-blue-300={invalid} class:hover:bg-blue-300={invalid}>
    <slot />
</button>