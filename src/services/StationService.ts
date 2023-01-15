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

    public async registerStation(data: any): Promise<boolean> {
        const res = await this.put(`${data.token}/register`, data)
        return res.ok
    }
}