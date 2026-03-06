import type { ComputedRef } from 'vue'

import { unref } from 'vue'
import { ElMessage, TableInstance } from 'element-plus'

type Props = ComputedRef<{
  rowKey: string
  tableDatas: Array<Recordable>
  tableRef: TableInstance | undefined
}>

export type UseTableSelectionReturn = ReturnType<typeof useTableSelection>

export function useTableSelection(props: Props) {
  function getSelectedRows() {
    return props.value.tableRef?.getSelectionRows()
  }

  function setSelectedRows(rows: Recordable[]) {
    const rowKeys = rows.map((item) => item[props.value.rowKey])
    toggleRowSelectionByRowKeys(rowKeys)
  }

  function getSelectedValues() {
    return getSelectedRows().map((i) => i[props.value.rowKey])
  }

  function setSelectedValues(values) {
    toggleRowSelectionByRowKeys(values)
  }

  function toggleRowSelectionByRowKeys(rowKeys: string[]) {
    props.value.tableDatas.forEach((item) => {
      if (rowKeys.includes(item[props.value.rowKey])) {
        props.value.tableRef?.toggleRowSelection(item, true)
      } else {
        props.value.tableRef?.toggleRowSelection(item, false)
      }
    })
  }

  function clearSelected() {
    props.value.tableRef?.clearSelection()
  }

  function checkHasSelection() {
    const selectedRows = getSelectedRows()
    return !!unref(selectedRows)?.length
  }

  function validateHasSelection() {
    const flag = checkHasSelection()
    if (!flag) {
      const message = '请至少选择一条数据后再操作'
      ElMessage.warning(message)
    }
    return flag
  }

  return {
    getSelectedValues,
    setSelectedValues,
    getSelectedRows,
    setSelectedRows,
    clearSelected,
    checkHasSelection,
    validateHasSelection,
  }
}
