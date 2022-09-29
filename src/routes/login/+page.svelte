<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let username: string;
	let password: string;

	function signin() {}
</script>

<form
	on:submit|preventDefault="{signin}"
	class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
	<Input label="Username" bind:value="{username}" type="text" required />
	<Input label="Password" bind:value="{password}" type="password" required />
	<Button>Log In</Button>
</form>
