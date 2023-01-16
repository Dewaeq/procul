import { ReadingModel } from "../models/ReadingModel"

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
    if (readings.length === 0) {
        return []
    }

    let result: ReadingModel[] = []
    let avgBuffer: ReadingModel[] = []
    let prevDate = 0

    for (const reading of readings) {
        avgBuffer.push(reading)
        if (reading.date.valueOf() < prevDate) {
            continue
        }
        
        result.push(calcAverageReading(avgBuffer))
        prevDate = reading.date.valueOf() + 1000 * 60 * minutes
        avgBuffer = []
    }

    return result
}

const calcAverageReading = (readings: ReadingModel[]): ReadingModel => {
    let avg = new ReadingModel()

    for (const reading of readings) {
        sumReadings(avg, reading)
    }

    divideReading(avg, readings.length)

    return avg
}

const sumReadings = (to: ReadingModel, from: ReadingModel) => {
    to.temperature += from.temperature
    to.humidity += from.humidity
    to.pm10 += from.pm10
    to.pm25 += from.pm25
    to.co2 += from.co2
    to.voc += from.voc
    to.date = from.date
}

const divideReading = (reading: ReadingModel, divisor: number) => {
    reading.temperature /= divisor
    reading.humidity /= divisor
    reading.pm10 /= divisor
    reading.pm25 /= divisor
    reading.co2 /= divisor
    reading.voc /= divisor
}
