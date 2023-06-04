<script lang="ts">
	import { fieldInvalid } from "$lib/utils";

    let newCompany = "";
	let invalid: boolean;

    const checkDisabled = (newCompany: string) => {
		invalid = fieldInvalid(newCompany);
		return invalid;
	};
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <form method="POST" action="?/create">
        <label class="label">
            <span>Company Name</span>
            <input
                class="input"
                name="companyName"
                id="companyName"
                placeholder="Company"
                bind:value="{newCompany}"
                type="text"
                required />
        </label>
        <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newCompany)}">Add Company</button>
    </form>
</div>