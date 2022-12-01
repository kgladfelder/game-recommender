<script lang="ts">
	export let username: string | undefined;
	export let admin: boolean | undefined;
</script>

<nav>
	<div>
		<a href="/">Game Recommender</a>
		<div id="navbarSupportedContent"></div>
		{#if username}
			<ul>
				{#if admin}
					<li>
						<a href="/admin/manage-companies">Manage Companies</a>
					</li>
					<li>
						<a href="/admin/manage-developers">Manage Developers</a>
					</li>
					<li>
						<a href="/admin/manage-games">Manage Games</a>
					</li>
					<li>
						<a href="/admin/manage-genres">Manage Genres</a>
					</li>
					<li>
						<a href="/admin/manage-publishers">Manage Publishers</a>
					</li>
					<li>
						<a href="/admin/manage-systems">Manage Systems</a>
					</li>
				{/if}
				<li>
					<a href="/user/{username}">{username}</a>
				</li>
			</ul>
		{:else}
			<ul>
				<li>
					<a href="/login">Log In</a>
				</li>
				<li>
					<a href="/signup">Sign Up</a>
				</li>
			</ul>
		{/if}
	</div>
</nav>
