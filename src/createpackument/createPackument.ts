import {Version} from "createpackument/createPackumentTypes"
import {findLatestSemver} from "createpackument/findLatestSemver"
import {findModifiedIsoDate} from "createpackument/findModifiedIsoDate"
import {joinName} from "createpackument/joinName"
import {reduceVersions} from "createpackument/reduceVersions"

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
        packageName: arg.packageName,
        versions: arg.versions,
        scopeName: arg.scopeName
    })

    return JSON.stringify({
        'modified': modifiedIsoDate,
        'name': name,
        'versions': versions,
        'dist-tags': {
          'latest': latestSemver
        }
    }, undefined, 2)
}