const fs = require('fs')
const jscodeshift = require('jscodeshift')
const { parseVue, parseTs, parseScss, parserMd } = require('./tools.js')

module.exports = {
  getPackageComponentVue(payload) {
    const { componentsName, propsName } = payload
    const content = `<template>${componentsName}组件创建成功！
      </template>

      <script setup lang="ts">
      import type { ${propsName} } from './type'

      defineOptions({
        name: '${componentsName}',
      })

      withDefaults(defineProps<${propsName}>(), {
        // props here
        value:  ''
      })
      </script>
      `
    return parseVue(content)
  },
  getPackageComponentStyle(payload) {
    const { name } = payload
    const scssName = name.replace('basic-', '')
    const content = `@use '../../../theme/index.scss' as *;

      @include b(${scssName}) {
        // style here
      }
      `
    return parseScss(content)
  },
  getPackageComponentType(payload) {
    const { propsName } = payload
    const content = `export interface ${propsName} {
          // props here
          value: string
      }
      `
    return parseTs(content)
  },
  getPackageComponentIndex(payload) {
    const { componentsName } = payload
    const content = `export * from './src/type'

      export { default as ${componentsName} } from './src/${componentsName}.vue'
      `
    return parseTs(content)
  },
  getDocsComponentMarkdown(payload) {
    const { name, componentsName, chineseName } = payload
    const content = `# ${componentsName} ${chineseName}

## 基本使用

:::demo
${name}/basic
:::
`

    return parserMd(content)
  },
  getDocsExamplesVue(payload) {
    const { componentsName } = payload
    const content = `<template>
        <${componentsName} />
      </template>

      <script setup lang="ts">
      import { ${componentsName} } from '@center/components'
      </script>
      `
    return parseVue(content)
  },
  async updateDocsVitepressConfig(contentPath, prompts) {
    const fileContent = fs.readFileSync(contentPath, 'utf-8')
    const modifiedCode = transform({ source: fileContent }, { jscodeshift }, prompts)
    const formatCode = await parseTs(modifiedCode)
    fs.writeFileSync(contentPath, formatCode, 'utf8')
    console.log('√ vitePress/config 文件已更新')
  },
  async updatePackageComponentIndex(contentPath, prompts) {
    const { name } = prompts
    const fileContent = fs.readFileSync(contentPath, 'utf-8')
    const additionContent = `export * from './${name}'`
    const modifiedCode = fileContent + additionContent
    const formatCode = await parseTs(modifiedCode)
    fs.writeFileSync(contentPath, formatCode, 'utf8')
    console.log('√ package/index 文件已更新')
  },
}

function transform(fileInfo, api, payload) {
  const { name, chineseName } = payload
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root.find(j.CallExpression, { callee: { name: 'defineConfig' } }).forEach((path) => {
    const configObject = path.node.arguments[0]

    if (configObject && configObject.type === 'ObjectExpression') {
      const themeConfig = configObject.properties.find((prop) => prop.key.name === 'themeConfig')

      if (themeConfig && themeConfig.value.type === 'ObjectExpression') {
        const sidebar = themeConfig.value.properties.find((prop) => prop.key.name === 'sidebar')

        if (sidebar && sidebar.value.type === 'ArrayExpression') {
          sidebar.value.elements.push(
            j.objectExpression([
              j.property('init', j.identifier('text'), j.stringLiteral(chineseName)),
              j.property('init', j.identifier('link'), j.stringLiteral(`/components/${name}`)),
            ]),
          )
        }
      }
    }
  })

  return root.toSource({ quote: 'single' })
}
