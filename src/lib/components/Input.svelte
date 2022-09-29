<script lang="ts">
    export let label: string;
    export let value: string;
</script>

<div class="relative mb-4">
    <label for="{label}" class="leading-7 text-sm text-gray-600">{label}</label>
    <input
        id={label}
        name="{label}"
        bind:value
        {...$$restProps}
        class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
</div>