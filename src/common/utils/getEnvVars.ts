

export const getEnvVars = <T>(requiredEnvironmentVariables: T) => {

  const environmentVariables = {}

  Object.entries(requiredEnvironmentVariables).forEach(([, value]) => {
    if (typeof value === 'string') {
      Object.assign(environmentVariables, {
        [value]: process.env[value]
      })
    }
  })

  type ENV = {
    [key in keyof T]: string
  }

  return environmentVariables as ENV
}
