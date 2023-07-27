<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;

  const systems = data.systems;
  const companies = data.companies;
  const count = data.count ? Math.ceil(data.count / 10) : 0;

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
            <div class="table-footer">
              <div class="table-footer-new ml-4">
                <button class="btn variant-ghost-primary" on:click|preventDefault="{addNewSystem}">
                  <span class="material-icons">add</span>
                  <span>New</span>
                </button>
              </div>
              <div class="btn-group variant-ghost-tertiary">
                {#each Array(count) as _, index (index)}
                  <a
                    href="/admin/manage-systems/{index + 1}"
                    target="_self"
                    data-sveltekit-preload-data="hover">{index + 1}</a>
                {/each}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
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
