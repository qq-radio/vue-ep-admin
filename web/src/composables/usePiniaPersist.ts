import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import type { StorageType } from '@/utils/storage'

import { CustomStorage } from '@/utils/storage'

type UsePiniaPersistOptions = PersistenceOptions & {
  storageType?: StorageType
}

export function usePiniaPersist(options?: UsePiniaPersistOptions) {
  const { storageType, ...rest } = options || {}

  return {
    serializer: {
      serialize: (data) => data,
      deserialize: (data) => data,
    },
    storage: new CustomStorage({ type: storageType }),
    ...rest,
  }
}
