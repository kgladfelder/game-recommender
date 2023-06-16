<script lang="ts">
	import { textFieldInvalid } from "$lib/utils";

	let username: string;
	let email: string;
	let password: string;
	let passwordRepeat: string;
	let invalid: boolean;

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /(?=.*\d)(?=.*[\W_]).{7,}/;

	const checkDisabled = (
		username: string,
		email: string,
		password: string,
		passwordRepeat: string
	): boolean => {
		invalid = false;
		if (
			textFieldInvalid(username) ||
			textFieldInvalid(email) ||
			textFieldInvalid(password) ||
			!emailRegex.test(String(email).toLowerCase()) ||
			!passwordRegex.test(String(password)) ||
			password !== passwordRepeat
		) {
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
			<span>E-mail</span>
			<input
				class="input"
				name="email"
				id="email"
				placeholder="E-mail"
				bind:value="{email}"
				type="email"
				required />
		</label>
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				name="password"
				id="password"
				placeholder="Password"
				bind:value="{password}"
				type="password"
				required />
		</label>
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				name="passwordRepeat"
				id="passwordRepeat"
				placeholder="Repeat Password"
				bind:value="{passwordRepeat}"
				type="password"
				required />
		</label>
		<button class="btn mt-4 variant-ghost-primary" disabled="{checkDisabled(username, email, password, passwordRepeat)}">Sign Up</button>
	</form>
</div>
