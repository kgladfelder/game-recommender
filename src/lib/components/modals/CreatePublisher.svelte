<script lang="ts">
  import { textFieldInvalid } from "$lib/utils";

  let newPublisher = "";
  let invalid: boolean;

  const checkDisabled = (newPublisher: string) => {
    invalid = textFieldInvalid(newPublisher);
    return invalid;
  };
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
  <form method="POST" action="?/create">
    <label class="label">
      <span>Publisher Name</span>
      <input
        class="input variant-form-material"
        name="publisherName"
        id="publisherName"
        placeholder="Publisher"
        bind:value="{newPublisher}"
        type="text"
        required />
    </label>
    <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newPublisher)}">
      Add Publisher
    </button>
  </form>
</div>
