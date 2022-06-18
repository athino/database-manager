import {Version} from "createpackument/createPackumentTypes"

export const findModifiedIsoDate = (arg: {
    versions: Version[]
}) => {
    const sorted = [...arg.versions].sort((a, b) => {
        return a.published - b.published
    })

    const published = sorted.at(0)?.published

    if (!published) { return { modifiedIsoDate: undefined }}

    const modifiedIsoDate = new Date(published).toISOString()

    return {
        modifiedIsoDate: modifiedIsoDate
    }
}