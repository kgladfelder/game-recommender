<script lang="ts">
  import { textFieldInvalid } from "$lib/utils";

  let newGenre = "";
  let invalid: boolean;

  const checkDisabled = (newGenre: string) => {
    invalid = textFieldInvalid(newGenre);
    return invalid;
  };
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
  <form method="POST" action="?/create">
    <label class="label">
      <span>Genre</span>
      <input
        class="input variant-form-material"
        name="genreName"
        id="genreName"
        placeholder="Genre"
        bind:value="{newGenre}"
        type="text"
        required />
    </label>
    <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newGenre)}">
      Add Genre
    </button>
  </form>
</div>
