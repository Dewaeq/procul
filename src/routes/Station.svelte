<script lang="ts">
    import { ReadingService } from "../services/ReadingService";
    import { StationService } from "../services/StationService";
    import { Chart, registerables } from "chart.js";
    import { onMount } from "svelte";
    import type { ReadingModel } from "../models/ReadingModel";

    export let token: string;
    let chartElement: HTMLCanvasElement;

    const stationApi = new StationService();
    const stationPromise = stationApi.getStation(token);

    const readingApi = new ReadingService();
    const readingPromise = readingApi.getLatestReading(token);

    Chart.register(...registerables);

    onMount(async () => {
        // const end = new Date();
        // const startTime = new Date().setDate(end.getDate() - 30);
        // const start = new Date(startTime);
        // const readings = await readingApi.getBetween(token, start, end);
        const k = await readingApi.getLatest(token, 0, 30);
        let readings: ReadingModel[] = []
        let prev = 0

        for (const reading of k!) {
            if (reading.date.valueOf() < prev) {
                continue;
            }

            readings.push(reading)
            prev = reading.date.valueOf()  + 1000 * 60 * 10
        }

        new Chart(chartElement, {
            type: "bar",
            data: {
                labels: readings?.map((r) => r.date.toLocaleString()),
                datasets: [
                    {
                        label: "PM 10",
                        data: readings?.map((r) => r.pm10),
                    },
                    {
                        label: "PM 2.5",
                        data: readings?.map((r) => r.pm25),
                    },
                ],
            },
        });
    });
</script>

<div id="content">
    <div class="column">
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

    <canvas bind:this={chartElement} />
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    canvas {
        width: 70vw;
    }
</style>
