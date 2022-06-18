import {Version} from "createpackument/createPackumentTypes"

export const findLatestSemver = (arg: {
    versions: Version[]
}) => {
    const sorted = [...arg.versions].sort((a, b) => {
        const majorDiff = a.major - b.major

        if (majorDiff !== 0) { return majorDiff }
    
        const minorDiff = a.minor - b.minor
    
        if (minorDiff !== 0) { return minorDiff }
    
        return a.patch - b.patch
    })

    return {
        latestSemver: sorted.at(0)?.semver
    }
}