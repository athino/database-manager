import {objectFromEntries} from "common/utils/objectFromEntries"
import {Version} from "createpackument/createPackumentTypes"
import {tarballSource} from "tarballsource/tarballSource"
import {joinName} from "createpackument/joinName"

export const reduceVersions = (arg: {
    baseUrl: string
    scopeName: string
    packageName: string
    versions: Version[]
}) => {
    return {
        versions: objectFromEntries(arg.versions, (version) => ({
            key: version.semver,
            value: {
                _hasShrinkwrap: false,
                directories: {},
                version: version.semver,
                name: joinName({
                    scopeName: arg.scopeName,
                    packageName: arg.packageName
                }).name,
                dist: {
                    shasum: version.shasum,
                    tarball: tarballSource.buildUrl({
                        baseUrl: arg.baseUrl,
                        databaseName: arg.packageName,
                        packageName: arg.packageName,        
                        major: version.major,
                        minor: version.minor,
                        patch: version.patch,
                        scopeName: arg.scopeName
                    }).url
                }
            }
        }))
    }
}