import {Connection} from 'common/external/database'
import {CONSTANTS} from './constants'

export const getMainCollections = (connection: Connection) => {
    const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
    const meta = db.collection(CONSTANTS.DATABASE_META_COLLECTION)
    const files = db.collection(CONSTANTS.DATABASE_FILES_COLLECTION)
    const chunks = db.collection(CONSTANTS.DATABASE_CHUNKS_COLLECTION)

    return {
        meta,
        files,
        chunks
    }
}