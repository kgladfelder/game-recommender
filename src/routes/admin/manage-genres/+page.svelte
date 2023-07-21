<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;

  let genres = data.genres;

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
    </table>
  </div>
  <div class="card variant-ghost-secondary p-4 mt-4 mb-4">
    <button class="btn btn-sm variant-ghost-primary" on:click|preventDefault="{addNewGenre}">
      <span class="material-icons">add</span>
      New
    </button>
    PAGINATE ME
  </div>
</div>
