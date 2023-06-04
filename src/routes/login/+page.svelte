<script lang="ts">
	import { fieldInvalid } from "$lib/utils";

	let username: string;
	let password: string;
	let invalid: boolean;

	const checkDisabled = (username: string, password: string): boolean => {
		invalid = false;

		if (fieldInvalid(username)) {
			invalid = true;
		}

		if (fieldInvalid(password)) {
			invalid = true;
		}

		return invalid;
	};
</script>

<div class="container mx-auto">
	<form method="POST">
		<label class="label">
			<span>Username</span>
			<input
				class="input"
				name="username"
				id="username"
				placeholder="Username"
				bind:value="{username}"
				type="text"
				required />
		</label>
		<label class="label">
			<span>Password</span>
			<input 
				class="input"
				name="password"
				id="password"
				bind:value="{password}" 
				type="password" 
				required />
		</label>
		<button class="btn mt-4 variant-ghost-primary" disabled="{checkDisabled(username, password)}">Log In</button>
	</form>
</div>
