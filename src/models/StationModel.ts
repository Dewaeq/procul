import { FromJson } from "../services/Api"
import { LocationModel } from "./LocationModel"

export class StationModel extends FromJson<StationModel> {
    token: string
    location: LocationModel
    hw_version: number
    sw_version: number
    last_online: Date

    fromJson(json: any): StationModel {
        let model = new StationModel()

        model.token = json.token
        model.hw_version = json.hw_version
        model.sw_version = json.sw_version
        model.last_online = new Date(json.last_online * 1000)
        model.location = new LocationModel().fromJson(json.location)

        return model
    }
}
