<script lang="ts">
  import { textFieldInvalid } from "$lib/utils";

  let newDeveloper = "";
  let invalid: boolean;

  const checkDisabled = (newDeveloper: string) => {
    invalid = textFieldInvalid(newDeveloper);
    return invalid;
  };
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
  <form method="POST" action="?/create">
    <label class="label">
      <span>Developer Name</span>
      <input
        class="input variant-form-material"
        name="developerName"
        id="developerName"
        placeholder="Developer"
        bind:value="{newDeveloper}"
        type="text"
        required />
    </label>
    <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newDeveloper)}">
      Add Developer
    </button>
  </form>
</div>
