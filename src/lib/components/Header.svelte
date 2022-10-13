<script lang="ts">
	export let username: string;
</script>

<nav
	class="
    relative
    w-full
    flex flex-wrap
    items-center
    justify-between
    py-4
    bg-gray-100
    text-gray-500
    hover:text-gray-700
    focus:text-gray-700
    shadow-lg
    navbar navbar-expand-lg navbar-light
">
	<div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
		<a href="/">Game Recommender</a>
		<div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent"></div>
		{#if username}
			<ul class="navbar-nav flex flex-row pl-0 list-style-none mr-auto">
				<li class="nav-item p-2">
					<a href="/user/{username}">{username}</a>
				</li>
			</ul>
		{:else}
			<ul class="navbar-nav flex flex-row pl-0 list-style-none mr-auto">
				<li class="nav-item p-2">
					<a href="/login">Log In</a>
				</li>
				<li class="nav-item p-2">
					<a href="/signup">Sign Up</a>
				</li>
			</ul>
		{/if}
	</div>
</nav>
