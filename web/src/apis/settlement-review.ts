import request from '@/utils/request'

export const queryEnums = (params) => request.get('/settlement-review/create-options/enums', params)
