const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

export interface IGenplate {
  addParams: (params: object) => IGenplate
  mkdir: (path: string) => IGenplate
  newFile: (path: string) => IGenplate
  copy: (src: string, dist: string) => IGenplate
  apply: (templatePath: string, dist: string, params: object) => IGenplate
  insertBefore: (path: string, mark: string, str: string) => IGenplate
  append: (path: string, str: string) => IGenplate
}

class Genplate implements IGenplate {
  private params = {}

  addParams(params: object) {
    this.params = params
    return this
  }

  mkdir(targetPath: string) {
    try {
      fs.mkdirSync(path.resolve(targetPath))
    } catch (e) {
      if (e.message.includes('file already exists')) {
        return this
      }
      throw e
    }
    return this
  }

  newFile(targetPath: string) {
    if (fs.existsSync(path.resolve(targetPath))) {
      return this
    }
    try {
      fs.writeFileSync(path.resolve(targetPath), '')
    } catch (e) {
      if (e.message.includes('file already exists')) {
        return this
      }
      throw e
    }
    return this
  }

  copy(src: string, dist: string) {
    fs.copyFileSync(path.resolve(src), path.resolve(dist))
    return this
  }

  apply(templatePath: string, dist: string) {
    const templateFile = fs.readFileSync(path.resolve(templatePath)).toString()
    const ejsTemplate = ejs.compile(templateFile, {})
    const modalDataContent = ejsTemplate(this.params)
    fs.writeFileSync(path.resolve(dist), modalDataContent)
    return this
  }

  insertBefore(targetPath: string, mark: string, str: string) {
    const fileContent = fs.readFileSync(path.resolve(targetPath)).toString()
    const markText = `/* genplate insert before:${mark} */`
    const index = fileContent.indexOf(markText)

    if (index === -1) {
      return
    }

    const newContent = `${fileContent.slice(0, index)}${str}\n${fileContent.slice(index)}`

    fs.writeFileSync(path.resolve(targetPath), newContent)

    return this as any
  }

  append(targetPath: string, str: string) {
    fs.appendFileSync(path.resolve(targetPath), `${str}\n`)
    return this as any
  }
}

module.exports = new Genplate()
