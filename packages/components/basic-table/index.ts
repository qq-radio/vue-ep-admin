export * from './src/types'

export { useTable } from './src/hooks/useTable'
export { useTableColumnProps } from './src/hooks/useTableColumnProps'
export { normalizeSearchSchemas } from './src/hooks/useTableSearch'

export { default as TableCell } from './src/components/TableCell.vue'
export { default as TableHeader } from './src/components/TableHeader.vue'

import ComponentFile from './src/BasicTable.vue'

export type BasicTableInstance = InstanceType<typeof ComponentFile>

export const BasicTable = ComponentFile
