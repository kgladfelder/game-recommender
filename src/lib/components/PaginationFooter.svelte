<script lang="ts">
  export let count: number;
  export let clickFn: () => void;
  export let url: string;
  export let currentPage: number;

  const maxAdjacent = 1;
  const activePage = currentPage - 1;
  const lastPage = count - 1;

  function getFullPages() {
    const pages: number[] = [];
    for (let index = 0; index <= lastPage; index++) {
      pages.push(index);
    }
    return pages;
  }

  function getPages() {
    const pages: number[] = [];
    const isWithinLeft = activePage < maxAdjacent + 2;
    const isWithinRight = activePage > lastPage - (maxAdjacent + 2);
    if (lastPage <= maxAdjacent * 2 + 2) {
      return getFullPages();
    }
    pages.push(0);
    if (!isWithinLeft) {
      pages.push(-1);
    }
    if (isWithinLeft || isWithinRight) {
      const sectionStart = isWithinLeft ? 1 : lastPage - (maxAdjacent + 2);
      const sectionEnd = isWithinRight ? lastPage - 1 : maxAdjacent + 2;
      for (let i = sectionStart; i <= sectionEnd; i++) {
        pages.push(i);
      }
    } else {
      for (let i = activePage - maxAdjacent; i <= activePage + maxAdjacent; i++) {
        pages.push(i);
      }
    }
    if (!isWithinRight) {
      pages.push(-2);
    }
    pages.push(lastPage);
    return pages;
  }

  let shownPages = getPages();
</script>

<div class="table-footer">
  <div class="table-footer-new-btn ml-4">
    <button class="btn variant-ghost-primary" on:click|preventDefault="{clickFn}">
      <span class="material-icons">add</span>
      <span>New</span>
    </button>
  </div>
  <!-- TODO: implement a goto page option -->
  <div class="btn-group variant-ghost-tertiary">
    {#each shownPages as page}
      {#if page >= 0}
        <a href="{url}/{page + 1}" target="_self" data-sveltekit-preload-data="hover">{page + 1}</a>
      {:else if page == -1}
        <span class="material-icons mt-2">arrow_left</span>
      {:else}
        <span class="material-icons mt-2">arrow_right</span>
      {/if}
    {/each}
  </div>
</div>

<style>
  .table-footer {
    display: flex;
  }
  .table-footer-new-btn {
    flex: 1;
  }
</style>
