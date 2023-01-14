<script lang="ts">
    import { ReadingService } from "../services/ReadingService";
    import { StationService } from "../services/StationService";

    export let token: string;

    const stationApi = new StationService();
    const stationPromise = stationApi.getStation(token);

    const readingApi = new ReadingService();
    const readingPromise = readingApi.getLatestReading(token);
</script>

<div>
    {#await stationPromise then station}
        {#if station === null}
            <p>Station with token "{token}" not found</p>
        {:else}
            <h2>Info:</h2>
            <p>{station.token}</p>
            <p>Last online: {station.last_online.toLocaleString()}</p>
            <p>Hardware version: {station.hw_version}</p>
            <p>Software version: {station.sw_version}</p>
            <p>
                <span>{station.location.country},</span>
                <span>{station.location.province},</span>
                <span>{station.location.city},</span>
                <span>{station.location.street}</span>
                <span>{station.location.number}</span>
            </p>
        {/if}
    {/await}

    {#await readingPromise then reading}
        {#if reading === null}
            <p>This station hasn't sent any data yet</p>
        {:else}
            <h2>Latest reading:</h2>
            <p>Date: {reading.date.toLocaleString()}</p>
            <p>Temperature: {reading.temperature}°C</p>
            <p>Humidity: {reading.humidity}%</p>
            <p>PM2.5: {reading.pm25}µg/m³</p>
            <p>PM10: {reading.pm10}µg/m³</p>
            <p>CO2: {reading.co2}ppm</p>
            <p>VOC: {reading.voc}ppb</p>
        {/if}
    {/await}
</div>
