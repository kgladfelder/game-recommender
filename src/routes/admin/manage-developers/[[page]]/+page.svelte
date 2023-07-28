<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import PaginationFooter from "$lib/components/PaginationFooter.svelte";
  export let data: PageData;

  const developers = data.developers;
  const count = data.count ? Math.ceil(data.count / 10) : 0;
  const page = data.page ?? 1;

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
      <tfoot>
        <tr>
          <td colspan="{3}">
            <PaginationFooter
              count="{count}"
              clickFn="{addNewDeveloper}"
              url="/admin/manage-developers"
              currentPage="{page}" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
