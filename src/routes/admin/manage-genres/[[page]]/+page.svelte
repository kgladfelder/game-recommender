<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import PaginationFooter from "$lib/components/PaginationFooter.svelte";
  export let data: PageData;

  const genres = data.genres;
  const count = data.count ? Math.ceil(data.count / 10) : 0;
  const page = data.page ?? 1;

  const addNewGenre = () => {
    const modal: ModalSettings = {
      type: "component",
      component: "createGenre",
    };
    modalStore.trigger(modal);
  };
</script>

<div class="container mx-auto">
  <div class="h1 mt-2">Manage Genres</div>
  <hr class="!border-t-4 mb-2" />
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Genre</th>
          <th class="w-1/4">Action</th>
        </tr>
      </thead>
      <tbody>
        {#if genres}
          {#each genres as genre (genre.id)}
            <tr>
              <td>{genre.name}</td>
              <td>
                <form method="POST" action="?/delete">
                  <input type="hidden" name="id" value="{genre.id}" />
                  <button class="btn btn-sm variant-ghost-error">
                    <span class="material-icons">delete</span>
                    <span>Delete</span>
                  </button>
                </form>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="{3}">
            <PaginationFooter
              count="{count}"
              clickFn="{addNewGenre}"
              url="/admin/manage-genres"
              currentPage="{page}" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
