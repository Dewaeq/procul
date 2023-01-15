<script lang="ts">
    import { ReadingService } from "../services/ReadingService";
    import { StationService } from "../services/StationService";
    import { groupReadingsByTime } from "../services/Utils";
    import CustomChart from "../components/CustomChart.svelte";
    import { onMount } from "svelte";
    import type { ReadingModel } from "../models/ReadingModel";
    import type { ChartData } from "../models/ChartData";

    export let token: string;

    const stationApi = new StationService();
    const stationPromise = stationApi.getStation(token);

    const readingApi = new ReadingService();
    const readingPromise = readingApi.getLatestReading(token);

    let readings: ReadingModel[] | null;
    let groupedReadings: ReadingModel[];
    let pmChartData: ChartData;
    let tempChartData: ChartData;
    let groupSize: number = 10;

    onMount(async () => {
        readings = await readingApi.getLatest(token, 0, 30);
        if (!readings) return;

        groupReadings();
    });

    const groupReadings = () => {
        if (!readings) return;
        groupedReadings = groupReadingsByTime(readings, groupSize);
        setChartData();
    };
    
    const setChartData = () => {
        pmChartData = {
            labels: groupedReadings!.map((r) => r.date.toLocaleString()),
            datasets: [
                {
                    label: "PM 2.5",
                    data: groupedReadings!.map((r) => r.pm25),
                },
                {
                    label: "PM 10",
                    data: groupedReadings!.map((r) => r.pm10),
                },
            ],
        };

        tempChartData = {
            labels: groupedReadings!.map((r) => r.date.toLocaleString()),
            datasets: [
                {
                    label: "Temperature",
                    data: groupedReadings!.map((r) => r.temperature),
                },
                {
                    label: "Humidity",
                    data: groupedReadings!.map((r) => r.humidity),
                },
            ],
        };
    };
</script>

<div id="content">
    <div class="column">
        {#await stationPromise then station}
            {#if station}
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
            {:else}
                <p>Station with token "{token}" not found</p>
            {/if}
        {/await}

        {#await readingPromise then reading}
            {#if reading}
                <h2>Latest reading:</h2>
                <p>Date: {reading.date.toLocaleString()}</p>
                <p>Temperature: {reading.temperature}°C</p>
                <p>Humidity: {reading.humidity}%</p>
                <p>PM2.5: {reading.pm25}µg/m³</p>
                <p>PM10: {reading.pm10}µg/m³</p>
                <p>CO2: {reading.co2}ppm</p>
                <p>VOC: {reading.voc}ppb</p>
            {:else}
                <p>This station hasn't sent any data yet</p>
            {/if}
        {/await}
    </div>

    <div>
        <label for="group-size">Group readings (minutes):</label>
        <input
            name="group-size"
            type="text"
            bind:value={groupSize}
            on:input={groupReadings}
        />
    </div>

    {#if groupedReadings}
        <div class="chart">
            <CustomChart data={pmChartData} />
        </div>
        <div class="chart">
            <CustomChart data={tempChartData} />
        </div>
    {:else}
        <p>No data found</p>
    {/if}
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .chart {
        width: 60vw;
    }
</style>
