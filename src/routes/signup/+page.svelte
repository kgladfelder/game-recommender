<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let username: string;
	let email: string;
	let password: string;
	let passwordRepeat: string;
</script>

<form method="POST"
	class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
	<Input label="username" bind:value="{username}" type="text" required />
	<Input label="email" bind:value="{email}" type="email" required />
	<Input label="password" bind:value="{password}" type="password" required />
	<Input label="repeat password" bind:value="{passwordRepeat}" type="password" required />
	<Button>Sign Up</Button>
</form>
