<script lang="ts">
    import { onMount } from "svelte";
    import { StationService } from "../services/StationService";

    enum RegisterStationState {
        Pending,
        Success,
        Failed,
    }

    const api = new StationService();

    let form: HTMLFormElement;
    let state = RegisterStationState.Pending;

    onMount(() => {
        form.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            const data = new FormData(form);
            const submit = {
                token: data.get("token"),
                hw_version: 1,
                sw_version: 1,
                location: {
                    latitude: 0,
                    longitude: 0,
                    country: "Belgium",
                    province: data.get("province"),
                    city: data.get("city"),
                    street: data.get("street"),
                    number: data.get("number"),
                    station_token: data.get("token"),
                },
            };

            const succes = await api.registerStation(submit);
            if (succes) {
                state = RegisterStationState.Success;
            } else {
                state = RegisterStationState.Failed;
            }
        });
    });
</script>

<div>
    <form bind:this={form}>
        <h3>Station</h3>
        <label for="token">Token:</label>
        <input name="token" type="text" required />

        <h3>Adres</h3>

        <label for="province">Provincie:</label>
        <input name="province" type="text" required />
        <label for="city">Stad:</label>
        <input name="city" type="text" required />
        <label for="street">Straat:</label>
        <input name="street" type="text" required />
        <label for="number">Nummer:</label>
        <input name="number" type="text" required />

        <button type="submit">Registreren</button>
    </form>

    {#if state === RegisterStationState.Success}
        <p>Succes</p>
    {:else if state === RegisterStationState.Failed}
        <p>Failed</p>
    {/if}
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        min-width: 20vw;
    }

    button {
        margin-top: 32px;
    }
</style>
