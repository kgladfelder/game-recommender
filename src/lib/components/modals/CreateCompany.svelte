<script lang="ts">
	import { textFieldInvalid } from "$lib/utils";

    let newCompany = "";
	let invalid: boolean;

    const checkDisabled = (newCompany: string) => {
		invalid = textFieldInvalid(newCompany);
		return invalid;
	};
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <form method="POST" action="?/create">
        <label class="label">
            <span>Company Name</span>
            <input
                class="input variant-form-material"
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