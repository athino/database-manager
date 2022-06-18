import {objectFromEntries} from "common/utils/objectFromEntries"

export const createPackument = (arg: {
    scopeName: string
    packageName: string
    versions: Array<{
        major: number
        minor: number
        patch: number
        semver: string
        published: number
        shasum: string
    }>
}) => {
    const name = `@${arg.scopeName}/${arg.packageName}`
    const modified = 'iso-date-str'
    const latest = '1.0.0'

    const versions = objectFromEntries(arg.versions, (version) => ({
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

    return {
        modified,
        name,
        versions,
        'dist-tags': {
          latest
        }
    }
    
}