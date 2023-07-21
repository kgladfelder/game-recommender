<script lang="ts">
  import { AppBar, ListBox, popup, type PopupSettings } from "@skeletonlabs/skeleton";

  export let username: string | undefined;
  export let admin: boolean | undefined;

  let comboboxValue: string;

  const popupCombobox: PopupSettings = {
    event: "focus-click",
    target: "popupCombobox",
    placement: "bottom",
  };
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <button class="btn variant-filled-primary justify-between" use:popup="{popupCombobox}">
      <span class="material-icons">menu</span>
      <span class="capitalize">{comboboxValue ?? "Menu"}</span>
    </button>
    <div class="card shadow-xl py-2" data-popup="popupCombobox">
      <nav class="list-nav">
        <ListBox rounded="rounded-none">
          <a href="/">
            <span class="material-icons">home</span>
            <span>Home</span>
          </a>
          {#if username && admin}
            <span class="ml-4">Admin</span>
            <a href="/admin/manage-companies">
              <span class="material-icons">apartment</span>
              <span>Manage Companies</span>
            </a>
            <a href="/admin/manage-systems">
              <span class="material-icons">factory</span>
              <span>Manage Systems</span>
            </a>
            <a href="/admin/manage-publishers">
              <span class="material-icons">store</span>
              <span>Manage Publishers</span>
            </a>
            <a href="/admin/manage-developers">
              <span class="material-icons">code</span>
              <span>Manage Developers</span>
            </a>
            <a href="/admin/manage-genres">
              <span class="material-icons">view_carousel</span>
              <span>Manage Genres</span>
            </a>
            <a href="/admin/manage-games">
              <span class="material-icons">gamepad</span>
              <span>Manage Games</span>
            </a>
          {/if}
        </ListBox>
        <div class="arrow bg-surface-100-800-token"></div>
      </nav>
    </div>
  </svelte:fragment>
  <!-- TODO: Replace with breadcrumbs? -->
  <a href="/">Game Recommender</a>
  <svelte:fragment slot="trail">
    {#if username}
      <a href="/user/{username}">{username}</a>
    {:else}
      <a href="/login">Log In</a>
      <a href="/signup">Sign Up</a>
    {/if}
  </svelte:fragment>
</AppBar>
