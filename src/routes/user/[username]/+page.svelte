<script lang="ts">
	import type { PageData } from "./$types";
    export let data: PageData;

    let username: string = data.username;
</script>

<h1>Hello {username}!</h1>
<p>{JSON.stringify(data)}</p>

