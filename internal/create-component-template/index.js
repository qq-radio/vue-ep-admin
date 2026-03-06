const fs = require('fs')
const path = require('path')

const template = require('./template')
const { enquire, cacabToPascal } = require('./tools')

const ROOT_DIR = path.resolve(__dirname, '../../')

async function main() {
  const input = await enquire(
    '组件名称会自动以basic-开头\n例如输入 input ,会生成 basic-input \n请输入组件名称: ',
  )
  const name = `basic-${input}`

  const chineseName = await enquire('请输入组件中文名称：')

  const confirm = await enquire(`确认创建 ${name} 吗？ (y/n) `)

  if (confirm.toLowerCase() !== 'y') {
    console.log('操作取消')
    process.exit(0)
  }

  const prompts = {
    name,
    chineseName,
  }

  const templateList = await getTemplateList(prompts)
  templateList.forEach((item) => {
    writeTemplateFile(item.path, item.content)
  })

  const vitepressConfigPath = path.join(ROOT_DIR, 'docs/.vitepress/config.ts')
  template.updateDocsVitepressConfig(vitepressConfigPath, prompts)

  const packageComponentIndexPath = path.join(ROOT_DIR, 'packages/components/index.ts')
  template.updatePackageComponentIndex(packageComponentIndexPath, prompts)

  console.log('操作完成')
}

function writeTemplateFile(filePath, data) {
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, data, 'utf8')
  console.log(`√ 文件已写入: ${filePath}`)
}

async function getTemplateList(prompts) {
  const { name, chineseName } = prompts

  const componentsName = cacabToPascal(name)
  const propsName = componentsName + 'Props'

  const payload = {
    name,
    chineseName,
    componentsName,
    propsName,
  }

  const config = [
    {
      path: `packages/components/${name}/src/${componentsName}.vue`,
      content: await template.getPackageComponentVue(payload),
    },
    {
      path: `packages/components/${name}/src/style.scss`,
      content: await template.getPackageComponentStyle(payload),
    },
    {
      path: `packages/components/${name}/src/type.ts`,
      content: await template.getPackageComponentType(payload),
    },
    {
      path: `packages/components/${name}/index.ts`,
      content: await template.getPackageComponentIndex(payload),
    },
    {
      path: `docs/components/${name}.md`,
      content: await template.getDocsComponentMarkdown(payload),
    },
    {
      path: `docs/examples/${name}/basic.vue`,
      content: await template.getDocsExamplesVue(payload),
    },
  ]

  return config.map((item) => {
    item.path = path.join(ROOT_DIR, item.path)
    return item
  })
}

main()
