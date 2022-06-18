import {Version} from "createpackument/createPackumentTypes"

export const compareVersions = (versionA: Version, versionB: Version) => {
    const majorDiff = versionA.major - versionB.major

    if (majorDiff !== 0) { return majorDiff }

    const minorDiff = versionA.minor - versionB.minor

    if (minorDiff !== 0) { return minorDiff }

    return versionA.patch - versionB.patch
}