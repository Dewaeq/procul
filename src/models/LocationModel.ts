import { FromJson } from "../services/Api"

export class LocationModel extends FromJson<LocationModel> {
    station_token: string
    latitude: number
    longitude: number
    country: string
    province: string
    city: string
    street: string
    number: string

    fromJson(json: any): LocationModel {
        let model = new LocationModel()

        model.station_token = json.station_token
        model.latitude = json.latitude
        model.longitude = json.longitude
        model.country = json.country
        model.province = json.province
        model.city = json.city
        model.street = json.street
        model.number = json.number


        return model
    }
}