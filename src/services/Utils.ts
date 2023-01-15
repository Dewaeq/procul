import type { ReadingModel } from "../models/ReadingModel"

export const getParam = (name: string, url: string): string => {
    const start = url.indexOf(`${name}=`)
    if (start < 0) {
        return ""
    }

    const padded = url.substring(start + name.length + 1)
    let end = padded.indexOf("&")
    if (end < 0) {
        end = padded.length
    }

    return padded.substring(0, end)
}

export const groupReadingsByTime = (readings: ReadingModel[], minutes: number): ReadingModel[] => {
    let result: ReadingModel[] = []
    let prev = 0

    for (const reading of readings) {
        if (reading.date.valueOf() < prev)
            continue

        result.push(reading)
        prev = reading.date.valueOf() + 1000 * 60 * minutes
    }

    return result
}