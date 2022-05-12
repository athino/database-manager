
export type ModelCheck<ModelType> = (payload: unknown) => ({
    error: false
    result: ModelType
}) | ({
    error: true
    result: undefined
})

type Models = {
    new <ModelsInput>(models: ModelsInput): {
        Model: Model<ModelsInput>
    }
}

type Model<ModelsInput> = {
    new <KeyOfModelsInput extends keyof ModelsInput>(arg: {
        type: KeyOfModelsInput
        payload: unknown
    }): ({
        error: false
        result: ModelsInput[KeyOfModelsInput] extends ModelCheck<infer ModelType> ? ModelType : never
    }) | ({
        error: true,
        result: undefined
    })
}

export const Models = class ModelsClassName {
  
    Model: any
    constructor(models: any) {
        this.Model = class {
            constructor(arg: {
                type: string
                payload: unknown
            }) {
                try {
                    const result = models[arg.type](arg.payload)
                    Object.assign(this, result)
                } catch {
                    Object.assign(this, {
                        error: true,
                        result: undefined
                    })
                }
            }
        }
    }
    
} as Models
