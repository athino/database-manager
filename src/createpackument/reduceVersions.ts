import {objectFromEntries} from "common/utils/objectFromEntries"
import {Version} from "createpackument/createPackumentTypes"

export const reduceVersions = (arg: {
    versions: Version[]
}) => {
    return {
        versions: objectFromEntries(arg.versions, (version) => ({
            key: version.semver,
            value: {
                _hasShrinkwrap: false,
                directories: {},
                version: version.semver,
                name: name,
                dist: {
                    shasum: version.shasum,
                    tarball: ''
                }
            }
        }))
    }
}