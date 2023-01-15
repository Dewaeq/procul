export type ChartData = {
    labels: string[]
    datasets: Dataset[]
}

export type Dataset = {
    label: string
    data: number[]
}