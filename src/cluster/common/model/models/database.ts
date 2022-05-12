import {mongodb} from "common/external/database"
import {ModelCheck} from "common/external/models"

export type Database = {
    name: string
    id: string
    versions: Array<{
        version: string
        status: 'unpublished' | 'published' | 'depricated'
        methods: []
        tables: Array<{
            tableName: string,
            columns: Array<{
              columnName: string,
              type: 'string' | 'boolean' | 'number' | 'undefined'
            }>
          }>
        latestUsage: Array<{
            timestamp: number
            usedBy: string
            utcOffset: 0
        }>
    }>
}

export const databaseCheck: ModelCheck<Database> = (payload) => {

    try {
        const {name, id, _id, versions} = (payload as any)

        let usedId = ''
        
        if (typeof _id === 'string') {
            usedId = _id
        } else if (typeof id === 'string') {
            usedId = id
        } else {

            try {
                usedId = (new mongodb.ObjectID(_id )).toString()
            } catch {
                throw new Error()
            }
        }

        if (typeof name !== 'string') {
            throw new Error()
        }

        if (!Array.isArray(versions)) {
            throw new Error()
        }

        versions.forEach((versionItem) => {
            const {version, status, latestUsage} = versionItem

            if (typeof status !== 'string') {
                throw new Error()
            }

            if (!['published', 'unpublished', 'depricated'].includes(status)) {
                throw new Error()
            }

            if (typeof version !== 'string') {
                throw new Error()
            }

            if (!Array.isArray(latestUsage)) {
                throw new Error()
            }

            latestUsage.forEach((usageItem, index) => {

                const {timestamp, usedBy, utcOffset} = usageItem

                if (typeof timestamp !== 'number') {
                    throw new Error()
                }

                if (!Number.isInteger(timestamp)) {
                    throw new Error()
                }

                if (timestamp < 0) {
                    throw new Error()
                }

                if (typeof usedBy !== 'string') {
                    throw new Error()
                }

                if (utcOffset !== 0) {
                    throw new Error()
                }

            })

        })

        return {
            error: false,
            result: {name, id: usedId, versions} as Database
        }

    } catch {
        return {
            error: true,
            result: undefined
        }
    }

}