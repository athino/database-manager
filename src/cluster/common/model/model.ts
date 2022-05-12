import {Models} from 'common/external/models'
import {databaseCheck} from 'cluster/common/model/models/database'

export const {Model} = new Models({

    Database: databaseCheck

})
