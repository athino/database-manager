import {Version} from "createpackument/createPackumentTypes"
import {findLatestSemver} from "createpackument/findLatestSemver"
import {findModifiedIsoDate} from "createpackument/findModifiedIsoDate"
import {joinName} from "./joinName"
import {reduceVersions} from "./reduceVersions"

export const createPackument = (arg: {
    scopeName: string
    packageName: string
    versions: Version[]
}) => {
   const {name} = joinName({
       scopeName: arg.scopeName,
       packageName: arg.packageName
   })

    const {latestSemver} = findLatestSemver({
        versions: arg.versions
    })

    const {modifiedIsoDate} = findModifiedIsoDate({
        versions: arg.versions
    })

    const {versions} = reduceVersions({
        versions: arg.versions
    })

    return {
        'modified': modifiedIsoDate,
        'name': name,
        'versions': versions,
        'dist-tags': {
          'latest': latestSemver
        }
    }
}