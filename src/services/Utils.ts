export const getParam = (name: string, url: string): string => {
    const start = url.indexOf(`${name}=`)
    if (start < 0) {
        return ""
    }

    const padded = url.substring(start + name.length + 1)
    let end = padded.indexOf("&")
    if (end < 0) {
        end = padded.length
    }

    return padded.substring(0, end)
}