/* eslint-disable @typescript-eslint/no-use-before-define */
const fs = require('fs')
const path = require('path')
const yargsInteractive = require('yargs-interactive')
const genplate = require('../index.ts')

const options = {
  interactive: { default: true },
  name: { type: 'input', describe: '请求的名称，首字母大写，如: GetRoom' },
  folder: { type: 'folder', describe: '请求所属目录的名称，首字母小写，如: room' },
  method: { type: 'input', default: 'get', describe: '请求的方法，如: get、post、put' },
  queryType: { type: 'input', describe: '请求返回的数据所属的 table 的数据类型, 如: RoomSchema' },
  returnType: { type: 'input', describe: '请求的返回数据的类型，如: RoomSchema。不需要返回数据则为空。' },
  hasPagination: { type: 'confirm', default: false, describe: '返回的数据是否有分页' },
  table: { type: 'table', describe: '（可选）请求的数据所属 table，首字母大写，如: Room。如果数据不进 rxdb' },
}

yargsInteractive()
  .interactive(options)
  .then((argv: any) => {
    generate(argv)
  })
  .catch((err: any) => {
    console.error('err', err)
  })

function generate(argv: any) {
  const Name = argv.name

  const OperationTemplate = './gen/templates/operator/operation.ejs'
  const OperatorTemplate = './gen/templates/operator/operator.ejs'
  const operatorDir = `./src/proxy/OperatorAPI/add/${argv.folder}`
  const operationDir = `./src/service/operation/${argv.folder}`
  const OperationDist = `${operationDir}/${Name}.ts`
  const OperatorDist = `${operatorDir}/${Name}.ts`

  genplate
    .addParams(argv)
    .mkdir(operatorDir)
    .mkdir(operationDir)
    .newFile(`${operationDir}/index.ts`)
    .append(`${operationDir}/index.ts`, `export * from './${argv.name}'`)
    .append(`${operatorDir}/index.ts`, `import './${argv.name}'`)
    .apply(OperationTemplate, OperationDist)
    .apply(OperatorTemplate, OperatorDist)

  const operatorIndexPath = path.resolve('./src/proxy/OperatorAPI/add/index.ts')
  const operationIndexPath = path.resolve('./src/service/operation/index.ts')
  const operatorIndexContent = fs.readFileSync(operatorIndexPath).toString()
  const operationIndexContent = fs.readFileSync(operatorIndexPath).toString()

  const importText = `import './${argv.folder}'`
  const exportText = `export * from './${argv.folder}'`

  if (!operatorIndexContent.includes(`./${argv.folder}`)) {
    genplate.append(operatorIndexPath, importText)
  }

  if (!operationIndexContent.includes(`./${argv.folder}`)) {
    genplate.append(operationIndexPath, exportText)
  }
}
