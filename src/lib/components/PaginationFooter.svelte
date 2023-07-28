<script lang="ts">
    export let count: number;
    export let clickFn: () => void;
    export let url: string;
</script>

<div class="table-footer">
  <div class="table-footer-new ml-4">
    <button class="btn variant-ghost-primary" on:click|preventDefault="{clickFn}">
      <span class="material-icons">add</span>
      <span>New</span>
    </button>
  </div>
  <div class="btn-group variant-ghost-tertiary">
    {#each Array(count) as _, index (index)}
      <a href="{url}/{index + 1}" target="_self" data-sveltekit-preload-data="hover">{index + 1}</a>
    {/each}
  </div>
</div>

<style>
  .table-footer {
    display: flex;
  }
  .table-footer-new {
    flex: 1;
  }
</style>