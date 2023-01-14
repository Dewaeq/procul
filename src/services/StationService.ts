import { StationModel } from "../models/StationModel";
import { Api } from "./Api";

export class StationService extends Api<StationModel> {
    protected get url(): string {
        return "station"
    }

    public async getStation(token: string): Promise<null | StationModel> {
        const result = await this.get(token, (json) => new StationModel().fromJson(json))

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