import { ReadingModel } from "../models/ReadingModel";
import { Api } from "./Api";

export class ReadingService extends Api<ReadingModel> {
    protected get url(): string {
        return "reading"
    }

    public async getLatestReading(token: string): Promise<null | ReadingModel> {
        const result = await this.get(`${token}/latest`, (json) => new ReadingModel().fromJson(json))

        if (result === null) {
            return null
        }

        return result[0]
    }
}