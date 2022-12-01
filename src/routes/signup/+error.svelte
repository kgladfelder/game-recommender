<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { fieldInvalid } from '$lib/utils';

	let username: string;
	let email: string;
	let password: string;
	let passwordRepeat: string;
	let invalid: boolean;

	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /(?=.*\d)(?=.*[\W_]).{7,}/;

	const checkDisabled = (
		username: string,
		email: string,
		password: string,
		passwordRepeat: string
	): boolean => {
		invalid = false;
		if (
			fieldInvalid(username) ||
			fieldInvalid(email) ||
			fieldInvalid(password) ||
			!emailRegex.test(String(email).toLowerCase()) ||
			!passwordRegex.test(String(password)) ||
			password !== passwordRepeat
		) {
			invalid = true;
		}
		return invalid;
	};
</script>

<div>
	<form method="POST">
		<Input label="username" bind:value="{username}" type="text" required />
		<Input label="email" bind:value="{email}" type="email" required />
		<Input label="password" bind:value="{password}" type="password" required />
		<Input label="repeat password" bind:value="{passwordRepeat}" type="password" required />
		<Button
			disabled="{checkDisabled(username, email, password, passwordRepeat)}"
			invalid="{invalid}">
			Sign Up
		</Button>
	</form>
	<p role="alert">
		{$page.error?.message}
	</p>
</div>
