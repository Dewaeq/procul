import { FromJson } from "../services/Api";

export class ReadingModel extends FromJson<ReadingModel> {
    date: Date
    temperature: number
    humidity: number
    pm10: number
    pm25: number
    co2: number
    voc: number

    constructor() {
        super()
        this.date = new Date()
        this.temperature = 0
        this.humidity = 0
        this.pm10 = 0
        this.pm25 = 0
        this.co2 = 0
        this.voc = 0
    }

    fromJson(json: any): ReadingModel {
        let model = new ReadingModel()

        model.date = new Date(json.date)
        model.temperature = json.temperature
        model.humidity = json.humidity
        model.pm10 = json.pm10
        model.pm25 = json.pm25
        model.co2 = json.co2
        model.voc = json.voc

        return model
    }

}