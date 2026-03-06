import type { EnhancedFormSchema, FormItemEmits, ComponentType } from '../types'

type Context = { emit: FormItemEmits }

export type UseFormItemHandlerReturn = ReturnType<typeof useFormItemHandler>

export const useFormItemHandler = (context: Context) => {
  const { emit } = context

  const eventHandlerMap = {
    'time-picker': (values: unknown[], schema: EnhancedFormSchema) => {
      onTimePickerChange(values, schema)
    },
    'date-picker': (values: unknown[], schema: EnhancedFormSchema) => {
      onDatePickerChange(values, schema)
    },
  }

  function getEventHandler(component: ComponentType) {
    return eventHandlerMap[component]
  }

  function onTimePickerChange(values: unknown[], schema: EnhancedFormSchema) {
    const { componentProps: { isRange, timeRangeMapFields = [] } = {} } = schema

    if (isRange !== true) {
      return
    }

    const [startDate, endDate] = timeRangeMapFields

    if (!startDate && !endDate) {
      return
    }

    const value = values[0] || []

    emit('field-change', {
      [startDate as string]: value[0],
      [endDate as string]: value[1],
    })
  }

  function onDatePickerChange(values: unknown[], schema: EnhancedFormSchema) {
    const rangeType = ['datetimerange', 'daterange', 'monthrange', 'yearrange']

    const { componentProps: { type, timeRangeMapFields = [] } = {} } = schema

    if (!type || !rangeType.includes(type)) {
      return
    }

    const [startDate, endDate] = timeRangeMapFields

    if (!startDate && !endDate) {
      return
    }

    const value = values[0] || []

    emit('field-change', {
      [startDate as string]: value[0],
      [endDate as string]: value[1],
    })
  }

  function handleChange(values: unknown[], schema: EnhancedFormSchema) {
    const handler = getEventHandler(schema.component)
    if (handler) {
      handler(values, schema)
    }
  }

  return { handleChange }
}
