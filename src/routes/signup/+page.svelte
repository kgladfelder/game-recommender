<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let username: string;
	let email: string;
	let password: string;
	let passwordRepeat: string;

	function validateEmail(email: string) {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(String(email).toLowerCase());
	}

	function validatePassword(password: string) {
		const passwordRegex = /(?=.*\d)(?=.*[\W_]).{7,}/;
		return passwordRegex.test(String(password));
	}

	$: isValidName = username && username.length > 3;
	$: isValidEmail = validateEmail(email);
	$: isValidPassword = validatePassword(password);
	$: isValidPasswordRepeat = password === passwordRepeat;

	function signup() {
		if (isValidName && isValidEmail && isValidPassword && isValidPasswordRepeat) {
			// Send data somewhere
			const fetchBody = {
				username,
				email,
				password,
			};
			fetch('api/user', {
				method: 'POST',
				body: JSON.stringify(fetchBody),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if(data) {
						goto('login');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

<form
	on:submit|preventDefault="{signup}"
	class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
	<Input label="Username" bind:value="{username}" type="text" required />
	<Input label="Email" bind:value="{email}" type="text" required />
	<Input label="Password" bind:value="{password}" type="password" required />
	<Input label="Repeat Password" bind:value="{passwordRepeat}" type="password" required />
	<Button>Sign Up</Button>
</form>
