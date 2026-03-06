export type StorageType = 'localStorage' | 'sessionStorage'

interface StorageOptions extends Partial<StorageConfig> {
  type?: StorageType
}

interface StorageConfig {
  maxAge: number
  autoClear: boolean
}

interface StorageItem<T> {
  _val_: T
  _exp_: number
}

const defaultConfig: StorageConfig = {
  maxAge: -1,
  autoClear: true,
}

export class CustomStorage {
  private storage: Storage
  private config: StorageConfig

  constructor(options?: StorageOptions) {
    const { type, ...rest } = options || {}
    this.storage = type === 'sessionStorage' ? sessionStorage : localStorage
    this.config = { ...defaultConfig, ...rest }
  }

  public getItem<T>(key: string) {
    const item: StorageItem<T> = JSON.parse(this.storage.getItem(key) || '')
    if (!item) {
      return null
    }

    if (item._exp_ !== -1 && Date.now() >= item._exp_) {
      if (this.config.autoClear) {
        this.storage.removeItem(key)
      }
      return null
    }

    return item._val_
  }

  public setItem<T>(key: string, value: T, options?: StorageConfig) {
    const expires = options?.maxAge ?? this.config.maxAge
    const state: StorageItem<T> = {
      _val_: value,
      _exp_: expires === -1 ? -1 : Date.now() + expires,
    }
    this.storage.setItem(key, JSON.stringify(state))
  }

  public removeItem(key: string) {
    this.storage.removeItem(key)
  }

  public clear() {
    this.storage.clear()
  }
}
