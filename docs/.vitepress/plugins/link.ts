import type { Plugin } from 'vite'

import { ROOT, DOCS_ROOT, GITHUB_TREE_URL } from '@center/constant'
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

type Append = Record<'headers' | 'footers', string[]>

let compPaths: string[]

export function markdownTransform(): Plugin {
  return {
    name: 'markdown-transform',
    enforce: 'pre',
    async buildStart() {
      compPaths = await glob('components', {
        cwd: DOCS_ROOT,
        absolute: true,
        onlyDirectories: true,
      })
    },
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!path.basename(id).startsWith('basic-')) return

      const componentId = path.basename(id, '.md')
      const append: Append = {
        headers: [],
        footers: [],
      }

      if (compPaths.some((compPath) => id.startsWith(compPath))) {
        code = sourceTransform(componentId, code, append)
      }

      return combineMarkdown(code, append)
    },
  }
}

function sourceTransform(componentId: string, code: string, append: Append) {
  const links: [string, string][] = []

  const componentUrl = `${GITHUB_TREE_URL}/packages/components/${componentId}`
  const componentPath = path.resolve(ROOT, `packages/components/${componentId}`)
  if (fs.existsSync(componentPath)) {
    links.push(['Component', componentUrl])
  }

  const typeUrl = `${GITHUB_TREE_URL}/packages/components/${componentId}/src/type.ts`
  const typePath = path.resolve(ROOT, `packages/components/${componentId}/src/type.ts`)
  if (fs.existsSync(typePath)) {
    links.push(['Type', typeUrl])
  }

  const docUrl = `${GITHUB_TREE_URL}/docs/components/${componentId}.md`
  const docPath = path.resolve(ROOT, `docs/components/${componentId}.md`)
  if (fs.existsSync(docPath)) {
    links.push(['Doc', docUrl])
  }

  const demoUrl = `${GITHUB_TREE_URL}/docs/examples/${componentId}`
  const demoPath = path.resolve(ROOT, `docs/examples/${componentId}`)
  if (fs.existsSync(demoPath)) {
    links.push(['Demo', demoUrl])
  }

  const linksText = links.map(([text, link]) => `[${text}](${link})`).join(' • ')

  const sourceSection = `
## Source

${linksText}`

  append.footers.push(sourceSection)

  return code
}

function combineMarkdown(code: string, append: Append) {
  const { headers, footers } = append
  return headers.join('\n') + '\n' + code + '\n' + footers.join('\n')
}
