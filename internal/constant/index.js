import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const REPO_OWNER = 'qq-radio'
export const REPO_NAME = 'monorepo'
export const REPO_PATH = `${REPO_OWNER}/${REPO_NAME}`
export const REPO_BRANCH = 'main'

export const GITHUB_BLOB_URL = `https://github.com/${REPO_PATH}/blob/${REPO_BRANCH}`
export const GITHUB_TREE_URL = `https://github.com/${REPO_PATH}/tree/${REPO_BRANCH}`

export const ROOT = resolve(__dirname, '..', '..')

export const DOCS_DIR = 'docs'
export const DOCS_ROOT = resolve(ROOT, DOCS_DIR)
