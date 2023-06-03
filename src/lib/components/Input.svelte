<script lang="ts">
	export let label: string;
	export let value: string;

	const toTitleCase = (label: string) => {
		const strSplit = label.toLowerCase().split(" ");
		return strSplit
			.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(" ");
	};
</script>

<div>
	<label for="{label}">{toTitleCase(label)}</label>
	<input id="{label}" name="{label}" bind:value="{value}" {...$$restProps} />
</div>
