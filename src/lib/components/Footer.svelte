<script lang="ts">
  import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<div>
  <!-- TODO: better footer -->
  <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
    <svelte:fragment slot="lead">
      <a type="button" class="btn-icon btn-icon-sm variant-filled" href="https://github.com/kgladfelder/game-recommender">
        <img src="/github-mark.png" alt="Github" style="max-width:95%"/>
      </a>
    </svelte:fragment>
    <span>2023-2023</span>
    <svelte:fragment slot="trail">
      <LightSwitch />
    </svelte:fragment>
  </AppBar>
</div>
