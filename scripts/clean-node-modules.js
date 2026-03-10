import fs from 'fs'
import path from 'path'

function main(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)

    if (file === 'node_modules') {
      console.log('删除:', fullPath)
      fs.rmSync(fullPath, { recursive: true, force: true })
      continue
    }

    if (fs.statSync(fullPath).isDirectory()) {
      main(fullPath)
    }
  }
}

const root = process.cwd()
main(root)

console.log('✅ 所有 node_modules 删除完成')
