<script lang="ts">
  import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<div>
  <!-- TODO: better footer -->
  <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
    <svelte:fragment slot="lead">Blah</svelte:fragment>
    <span>2023-2023</span>
    <svelte:fragment slot="trail">
      <LightSwitch />
    </svelte:fragment>
  </AppBar>
</div>
