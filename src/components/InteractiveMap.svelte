<script lang="ts">
    import {
        LeafletMap,
        TileLayer,
        CircleMarker,
        Popup,
    } from "svelte-leafletjs";
    import { LatLng } from "leaflet";
    import { StationService } from "../services/StationService";
    import type { StationModel } from "../models/StationModel";
    import { navigate } from "svelte-navigator";

    const stationApi = new StationService();
    const stationsPromise = stationApi.getActiveStations();

    const mapOptions = {
        center: new LatLng(50.9, 3.8),
        zoom: 9,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 5,
        maxZoom: 17,
        maxNativeZoom: 17,
        attribution: "© OpenStreetMap contributors",
    };

    const goToStation = (station: StationModel) => {
        navigate(`/station?token=${station.token}`);
    };
</script>

<div class="map">
    <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions} />
        {#await stationsPromise then data}
            {#each data as station}
                <CircleMarker latLng={station.location.getLatLng()}>
                    <Popup>
                        <h2>Info:</h2>
                        <p>{station.token}</p>
                        <p>
                            Last online: {station.last_online.toLocaleString()}
                        </p>
                        <p>Hardware version: {station.hw_version}</p>
                        <p>Software version: {station.sw_version}</p>
                        <button on:click={() => goToStation(station)}
                            >More</button
                        >
                    </Popup>
                </CircleMarker>
            {/each}
        {/await}
    </LeafletMap>
</div>

<style>
    .map {
        width: 60vw;
        height: 70vh;
    }
</style>
