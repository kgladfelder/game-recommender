<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { textFieldInvalid } from "$lib/utils";
  import type { Company } from "@prisma/client";

  let companies: Company[];

  if ($modalStore[0] && $modalStore[0].meta.companies) {
    companies = $modalStore[0].meta.companies;
  }
  let newSystem = "";
  let selectedCompany: Company;
  let invalid: boolean;

  const checkDisabled = (newSystem: string) => {
    invalid = textFieldInvalid(newSystem);
    return invalid;
  };
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
  <form method="POST" action="?/create">
    <label class="label">
      <span>System Name</span>
      <input
        class="input variant-form-material"
        name="systemName"
        id="systemName"
        placeholder="System"
        bind:value="{newSystem}"
        type="text"
        required />
    </label>
    {#if companies}
      <label class="label">
        <span>Company</span>
        <select
          class="input variant-form-material"
          name="company"
          id="company"
          bind:value="{selectedCompany}"
          required>
          {#each companies as company (company.id)}
            <option value="{company.id}">{company.name}</option>
          {/each}
        </select>
      </label>
    {:else}
      <span>No Companies exist, please add some before creating a system</span>
    {/if}
    <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newSystem)}">
      Add System
    </button>
  </form>
</div>
