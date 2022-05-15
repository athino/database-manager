
const createPackageJson = (arg: {
    name: string
    version: string
    license: string
    author: string
    description: string,
    main: string,
    scripts: {
      [key: string]: string
    }
  }) => JSON.stringify(arg, null, 2)
  
  export const files = (arg: {
    name: string
  }) => [{
    fileName: 'index',
    fileExtension: 'js',
    fileContent: 'console.log(42);'
  },{
    fileName: 'package',
    fileExtension: 'json',
    fileContent: createPackageJson({
      name: arg.name,
      version: '1.0.0',
      license: 'ISC',
      author: 'Unknown',
      description: '',
      main: 'index.js',
      scripts: {
        test: `echo "Error: no test specified" && exit 1`
      }
    })
  },{
    fileName: 'index.d',
    fileExtension: 'ts',
    fileContent: 'declare module database {}'
  }]
  