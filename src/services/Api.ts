export abstract class Api<T extends FromJson<T>> {
    private get rootUrl(): string {
        return "http://192.168.0.190"
    }

    protected abstract get url(): string

    protected abstract modelFromJson(json: any): T

    protected async get(route: string): Promise<null | T[]> {
        const url = `${this.rootUrl}/${this.url}/${route}`
        const res = await fetch(url)

        if (!res.ok) {
            return null
        }

        const json = await res.json()

        let result: T[] = []
        if (Symbol.iterator in json) {
            for (const entry of json) {
                result.push(this.modelFromJson(entry))
            }
        } else {
            result.push(this.modelFromJson(json))
        }

        return result
    }

    protected async put(route: string, body: any) {
        const url = `${this.rootUrl}/${this.url}/${route}`
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        return res
    }
}

export abstract class FromJson<T> {
    abstract fromJson(json: any): T
}