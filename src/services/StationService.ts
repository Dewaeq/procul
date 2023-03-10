import { StationModel } from "../models/StationModel";
import { Api } from "./Api";

export class StationService extends Api<StationModel> {
    protected get url(): string {
        return "station"
    }

    protected modelFromJson(json: any): StationModel {
        return new StationModel().fromJson(json)
    }

    public async getStation(token: string): Promise<null | StationModel> {
        const result = await this.get(token)

        if (result === null) {
            return null;
        }

        return result[0]
    }

    public async getActiveStations(): Promise<StationModel[]> {
        const result = await this.get("all/active")
        return result ?? []
    }

    public async registerStation(data: any): Promise<boolean> {
        const res = await this.put(`${data.token}/register`, data)
        return res.ok
    }

    public getStationColour(station: StationModel): string {
        let pm = station.last_reading?.pm10;
        if (!pm) {
            return "grey"
        }

        if (pm <= 10) {
            return "green"
        } else if (pm <= 30) {
            return "orange"
        } else {
            return "red"
        }
    }
}