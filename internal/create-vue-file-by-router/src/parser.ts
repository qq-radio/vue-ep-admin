import fs from 'fs'

export function extractComponentPath(component: any): string | null {
  if (typeof component === 'string') {
    return component
  }

  if (component && typeof component === 'object') {
    const componentString = component.toString()
    const importMatch = componentString.match(/import\(['"]([^'"]+)['"]\)/)
    if (importMatch) {
      return importMatch[1]
    }
  }

  return null
}

export function parseRouteFile(filePath: string): string[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const importMatches = [...fileContent.matchAll(/import\(['"]([^'"]+\.vue)['"]\)/g)]
    return importMatches.map((match) => match[1])
  } catch (error) {
    console.log('error --->', error)
    throw new Error(`解析路由文件失败: ${filePath}`)
  }
}
