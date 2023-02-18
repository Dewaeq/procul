import { FromJson } from "../services/Api"
import { LocationModel } from "./LocationModel"
import { ReadingModel } from "./ReadingModel"

export class StationModel extends FromJson<StationModel> {
    token: string
    location: LocationModel
    hw_version: number
    sw_version: number
    last_online: Date
    last_reading: ReadingModel

    fromJson(json: any): StationModel {
        let model = new StationModel()

        model.token = json.station.token
        model.hw_version = json.station.hw_version
        model.sw_version = json.station.sw_version
        model.last_online = new Date(json.station.last_online)
        model.location = new LocationModel().fromJson(json.station.location)
        model.last_reading = new ReadingModel().fromJson(json.last_reading);

        return model
    }
}
