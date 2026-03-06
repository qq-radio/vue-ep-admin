import type { BasicTableProps } from '../types'
import type { BasicFormProps } from '@center/components/basic-form/src/types'
import type { BasicButtonGroupProps } from '@center/components/basic-button-group'

import type { ComputedRef } from 'vue'
import { unref } from 'vue'
import type { TableColumnCtx } from 'element-plus'

import { computed } from 'vue'

type Props = Pick<
  BasicTableProps,
  | 'searchProps'
  | 'radioSelectionColumnProps'
  | 'selectionColumnProps'
  | 'indexColumnProps'
  | 'expandColumnProps'
  | 'actionColumnProps'
  | 'actionProps'
  | 'paginationProps'
>

type GetColumnProps = ComputedRef<Partial<TableColumnCtx<any>>>

export type UseTableColumnPropsReturn = ReturnType<typeof useTableColumnProps>

export function useTableColumnProps(props: Props) {
  const defaultSearchProps: Partial<BasicFormProps> = {
    labelWidth: 80,
    labelPosition: 'left',
    colProps: {
      span: 8,
    },
    submitText: '查询',
    hasFooter: true,
  }

  const getSearchProps = computed<Partial<BasicFormProps>>(() => ({
    ...defaultSearchProps,
    ...unref(props).searchProps,
  }))

  const defaultRadioSelectionColumnProps = {
    key: 'radio-selection',
    align: 'center',
    width: 54,
  }

  const getRadioSelectionColumnProps: GetColumnProps = computed(() => ({
    ...defaultRadioSelectionColumnProps,
    ...unref(props).radioSelectionColumnProps,
  }))

  const defaultSelectionColumnProps = {
    key: 'selection',
    type: 'selection',
    align: 'center',
    width: 50,
  }

  const getSelectionColumnProps: GetColumnProps = computed(() => ({
    ...defaultSelectionColumnProps,
    ...unref(props).selectionColumnProps,
  }))

  const defaultIndexColumnProps = {
    key: 'index',
    type: 'index',
    label: '序号',
    width: 60,
  }

  const getIndexColumnProps: GetColumnProps = computed(() => ({
    ...defaultIndexColumnProps,
    ...unref(props).indexColumnProps,
  }))

  const defaultExpandColumnProps = {
    key: 'expand',
    label: '',
    width: 60,
    type: 'expand',
  }

  const getExpandColumnProps: GetColumnProps = computed(() => ({
    ...defaultExpandColumnProps,
    ...unref(props).expandColumnProps,
  }))

  const defaultActionColumnProps = {
    key: 'action',
    label: '操作',
    fixed: 'right',
    width: 160,
  }

  const getActionColumnProps: GetColumnProps = computed(() => ({
    ...defaultActionColumnProps,
    ...unref(props).actionColumnProps,
  }))

  const defaultActionProps: Partial<BasicButtonGroupProps> = {
    confirmType: 'pop-confirm',
    showNumber: 4,
    buttonProps: {
      link: true,
      type: 'primary',
    },
  }

  const getActionProps: ComputedRef<Partial<BasicButtonGroupProps>> = computed(() => ({
    ...defaultActionProps,
    ...unref(props).actionProps,
  }))

  const getPaginationProps = computed(() => ({
    ...unref(props).paginationProps,
  }))

  return {
    defaultSearchProps,
    getSearchProps,

    defaultRadioSelectionColumnProps,
    getRadioSelectionColumnProps,

    defaultSelectionColumnProps,
    getSelectionColumnProps,

    defaultIndexColumnProps,
    getIndexColumnProps,

    defaultExpandColumnProps,
    getExpandColumnProps,

    defaultActionColumnProps,
    getActionColumnProps,

    defaultActionProps,
    getActionProps,

    getPaginationProps,
  }
}
