import {JSONSchemaType, ValidateFunction} from "ajv"

export type Schema = {
    new <T>(arg: JSONSchemaType<T>): {
        build(body: T): T
        validate: ValidateFunction<T>
    }
}
