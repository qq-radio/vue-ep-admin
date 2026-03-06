import fs from 'fs'
import path from 'path'
import { CreateOptions } from './types'

const DEFAULT_TEMPLATE = `<template>
  <div class="page-container">
    <h1>{{ pageTitle }}</h1>
    <div class="content">
      <p>页面内容待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTitle = ref('页面标题')
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.content {
  margin-top: 20px;
}
</style>`

export function createVueFile(
  componentPath: string,
  projectRoot: string = process.cwd(),
  options: CreateOptions = {},
): boolean {
  const { template = DEFAULT_TEMPLATE, overwrite = false } = options

  let absolutePath = componentPath

  if (componentPath.startsWith('@/')) {
    absolutePath = path.join(projectRoot, 'src', componentPath.slice(2))
  } else if (!path.isAbsolute(componentPath)) {
    absolutePath = path.join(projectRoot, 'src', componentPath)
  }

  if (!absolutePath.endsWith('.vue')) {
    absolutePath += '.vue'
  }

  if (fs.existsSync(absolutePath) && !overwrite) {
    console.log(`文件已存在: ${absolutePath}`)
    return false
  }

  const dir = path.dirname(absolutePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`创建目录: ${dir}`)
  }

  fs.writeFileSync(absolutePath, template, 'utf-8')
  console.log(`创建文件: ${absolutePath}`)
  return true
}
