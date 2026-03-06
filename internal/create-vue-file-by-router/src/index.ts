import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { parseRouteFile } from './parser'
import { createVueFile } from './creator'
import { CreateOptions } from './types'

export type { CreateOptions } from './types'

export async function processRouteFile(
  filePath: string,
  projectRoot: string = process.cwd(),
  options: CreateOptions = {},
): Promise<number> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`路由文件不存在: ${filePath}`)
  }

  const componentPaths = parseRouteFile(filePath)
  let createdCount = 0

  for (const componentPath of componentPaths) {
    if (createVueFile(componentPath, projectRoot, options)) {
      createdCount++
    }
  }

  return createdCount
}

export async function scanModulesDirectory(
  modulesDir: string,
  projectRoot: string = process.cwd(),
  options: CreateOptions = {},
): Promise<number> {
  if (!fs.existsSync(modulesDir)) {
    throw new Error(`目录不存在: ${modulesDir}`)
  }

  const files = fs.readdirSync(modulesDir)
  const routeFiles = files.filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

  let totalCreated = 0
  for (const file of routeFiles) {
    const filePath = path.join(modulesDir, file)
    totalCreated += await processRouteFile(filePath, projectRoot, options)
  }

  return totalCreated
}

export async function interactiveSelectRouteFile(projectRoot: string): Promise<string | null> {
  const routesDir = path.join(projectRoot, 'src', 'router', 'modules')

  if (!fs.existsSync(routesDir)) {
    console.log(chalk.red(`路由目录不存在: ${routesDir}`))
    return null
  }

  const files = fs
    .readdirSync(routesDir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

  if (files.length === 0) {
    console.log(chalk.yellow(`未找到路由文件: ${routesDir}`))
    return null
  }

  const { selectedFile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedFile',
      message: '请选择要处理的路由文件:',
      choices: [...files, '全部文件', '手动输入路径'],
    },
  ])

  if (selectedFile === '全部文件') return routesDir
  if (selectedFile === '手动输入路径') {
    const { customPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customPath',
        message: '请输入路由文件路径:',
      },
    ])
    return customPath
  }

  return path.join(routesDir, selectedFile)
}

export async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const projectRoot = process.cwd()

  console.log(chalk.cyan('🚀 Vue 文件自动创建工具'))
  console.log(chalk.gray(`工作目录: ${projectRoot}\n`))

  let targetPath: string | null

  if (args.length > 0) {
    targetPath = path.isAbsolute(args[0]) ? args[0] : path.join(projectRoot, args[0])
  } else {
    targetPath = await interactiveSelectRouteFile(projectRoot)
    if (!targetPath) {
      console.log(chalk.yellow('未选择有效路径，程序退出'))
      return
    }
  }

  if (!fs.existsSync(targetPath)) {
    console.log(chalk.red(`目标路径不存在: ${targetPath}`))
    return
  }

  let createdCount = 0
  const stats = fs.statSync(targetPath)

  if (stats.isDirectory()) {
    createdCount = await scanModulesDirectory(targetPath, projectRoot)
  } else {
    createdCount = await processRouteFile(targetPath, projectRoot)
  }

  console.log(chalk.cyan(`\n✅ 完成！共创建了 ${createdCount} 个 Vue 文件`))
}

main()
