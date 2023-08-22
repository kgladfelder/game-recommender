<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import PaginationFooter from "$lib/components/PaginationFooter.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  const systems = data.systems;
  const companies = data.companies;
  const count = data.count ? Math.ceil(data.count / 10) : 0;
  const page = data.page ?? 1;

  const addNewSystem = () => {
    const modal: ModalSettings = {
      type: "component",
      component: "createSystem",
      meta: { companies },
    };
    modalStore.trigger(modal);
  };
</script>

<div class="container mx-auto">
  <div class="h1 mt-2">Manage Systems</div>
  <hr class="!border-t-4 mb-2" />
  <!-- List existing -->
  <div class="table-container">
    <table class="table table-hover mb-4">
      <thead>
        <tr>
          <th>System</th>
          <th>Company</th>
          <th class="w-1/4">Action</th>
        </tr>
      </thead>
      <tbody>
        {#if systems}
          {#each systems as system (system.id)}
            <tr>
              <td>{system.name}</td>
              <td>{system.company.name}</td>
              <td>
                <form method="POST" action="?/delete">
                  <input type="hidden" name="id" value="{system.id}" />
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
              clickFn="{addNewSystem}"
              url="/admin/manage-systems"
              currentPage="{page}" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
