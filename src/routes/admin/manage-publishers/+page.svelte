<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;

  let publishers = data.publishers;

  const addNewPublisher = () => {
    const modal: ModalSettings = {
      type: "component",
      component: "createPublisher",
    };
    modalStore.trigger(modal);
  };
</script>

<div class="container mx-auto">
  <div class="h1 mt-2">Manage Publishers</div>
  <hr class="!border-t-4 mb-2" />
  <div class="table-container mb-2">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Publisher</th>
          <th class="w-1/4">Country</th>
          <th class="w-1/4">Action</th>
        </tr>
      </thead>
      <tbody>
        {#if publishers}
          {#each publishers as publisher (publisher.id)}
            <tr>
              <td>{publisher.name}</td>
              <td>{publisher.country.name}</td>
              <td>
                <form method="POST" action="?/delete">
                  <input type="hidden" name="id" value="{publisher.id}" />
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
    <button class="btn btn-sm variant-ghost-primary" on:click|preventDefault="{addNewPublisher}">
      <span class="material-icons">add</span>
      New
    </button>
    PAGINATE ME
  </div>
</div>
