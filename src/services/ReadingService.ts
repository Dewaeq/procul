import { ReadingModel } from "../models/ReadingModel";
import { Api } from "./Api";

export class ReadingService extends Api<ReadingModel> {
    protected get url(): string {
        return "reading"
    }

    protected modelFromJson(json: any): ReadingModel {
        return new ReadingModel().fromJson(json)
    }

    public async getLatestReading(token: string): Promise<null | ReadingModel> {
        const result = await this.get(`${token}/latest`)

        if (result === null) {
            return null
        }

        return result[0]
    }

    public async getBetween(token: string, start: Date, end: Date): Promise<null | ReadingModel[]> {
        const route = `${token}/between/${start.valueOf()}/${end.valueOf()}`
        const result = await this.get(route)

        return result
    }

    public async getLatest(token: string, offset: number, limit: number): Promise<null | ReadingModel[]> {
        const route = `${token}/latest/${limit}`
        const result = await this.get(route)

        return result?.reverse() ?? null
    }
}