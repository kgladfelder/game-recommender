<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { userStore, authToken } from '../../stores'

	let username: string;
	let password: string;

	function signin() {
		// Send data somewhere
		const fetchBody = {
			username,
			password,
		};
		fetch('api/login', {
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
				console.log(data);
				authToken.set(data.authToken);
				userStore.set({
					username: data.username,
					email: data.email
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<form
	on:submit|preventDefault="{signin}"
	class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
	<Input label="Username" bind:value="{username}" type="text" required />
	<Input label="Password" bind:value="{password}" type="password" required />
	<Button>Log In</Button>
</form>
