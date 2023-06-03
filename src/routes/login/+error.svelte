<script lang="ts">
	import { page } from "$app/stores";

	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
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

<div>
	<form method="POST">
		<Input label="username" bind:value="{username}" type="text" required />
		<Input label="password" bind:value="{password}" type="password" required />
		<Button disabled="{checkDisabled(username, password)}" invalid="{invalid}">Log In</Button>
	</form>
	<p role="alert">
		{$page.error?.message}
	</p>
</div>
