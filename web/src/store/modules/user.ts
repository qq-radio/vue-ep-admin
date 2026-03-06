export const useUserStore = defineStore(
  'user',
  () => {
    const token: Ref<string | undefined> = ref()

    function getToken() {
      return token.value
    }

    function setToken(value) {
      token.value = value
    }

    function clearToken() {
      token.value = ''
    }

    return {
      token,
      getToken,
      setToken,
      clearToken,
    }
  },
  {
    persist: usePiniaPersist(),
  },
)
