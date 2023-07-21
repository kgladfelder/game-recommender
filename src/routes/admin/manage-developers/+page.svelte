<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;

  let developers = data.developers;

  const addNewDeveloper = () => {
    const modal: ModalSettings = {
      type: "component",
      component: "createDeveloper",
    };
    modalStore.trigger(modal);
  };
</script>

<div class="container mx-auto">
  <div class="h1 mt-2">Manage Developers</div>
  <hr class="!border-t-4 mb-2" />
  <!-- List existing -->
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Developer Name</th>
          <th class="w-1/4">Country</th>
          <th class="w-1/4">Action</th>
        </tr>
      </thead>
      <tbody>
        {#if developers}
          {#each developers as developer (developer.id)}
            <tr>
              <td>{developer.name}</td>
              <td>{developer.country.name}</td>
              <td>
                <form method="POST" action="?/delete">
                  <input type="hidden" name="id" value="{developer.id}" />
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
    <button class="btn btn-sm variant-ghost-primary" on:click|preventDefault="{addNewDeveloper}">
      <span class="material-icons">add</span>
      New
    </button>
    PAGINATE ME
  </div>
</div>
