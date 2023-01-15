<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { afterUpdate, onMount } from "svelte";
    import type { ChartData } from "../models/ChartData";

    export let data: ChartData;

    let canvas: HTMLCanvasElement;
    let chart: Chart;

    Chart.register(...registerables);

    afterUpdate(() => {
        chart?.destroy();

        chart = new Chart(canvas, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: data.datasets,
            },
        });
    });
</script>

<div>
    <canvas bind:this={canvas} />
</div>
