import {getEnvVars} from 'common/utils/getEnvVars'
import {RequiredEnvironmentVariables} from '../../../required-env'

export const ENV = getEnvVars(RequiredEnvironmentVariables)
