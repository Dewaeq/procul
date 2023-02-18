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

    const stationService = new StationService();
    const stationsPromise = stationService.getActiveStations();

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
                <CircleMarker
                    latLng={station.location.getLatLng()}
                    color={stationService.getStationColour(station)}
                    fillColor={stationService.getStationColour(station)}
                    fill={true}
                    fillOpacity={1}
                >
                    <Popup>
                        <div class="popup-content">
                            <h2>Info:</h2>
                            <p>{station.token}</p>
                            <p>
                                Last online: {station.last_online.toLocaleString()}
                            </p>
                            <p>PM 2.5: {station.last_reading?.pm25} µg/m³</p>
                            <p>PM 10: {station.last_reading?.pm10} µg/m³</p>
                            <p>CO2: {station.last_reading?.co2} ppm</p>
                            <button on:click={() => goToStation(station)}
                                >More</button
                            >
                        </div>
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
        border-radius: 22px;
        overflow: hidden;
    }

    .popup-content > p {
        margin: 0.4em 0;
    }

    .popup-content > h2 {
        margin: 0.6em 0;
    }
</style>
