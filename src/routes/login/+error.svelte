<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { fieldInvalid } from '$lib/utils';

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

<div class="flex flex-col w-full place-items-center">
	<form
		method="POST"
		class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
		<Input label="username" bind:value="{username}" type="text" required />
		<Input label="password" bind:value="{password}" type="password" required />
		<Button disabled="{checkDisabled(username, password)}" invalid="{invalid}">Log In</Button>
	</form>
	<p
		class="lg:w-2/6 md:w-1/2 bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3"
		role="alert">
		{$page.error?.message}
	</p>
</div>
