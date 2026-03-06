export const useKeepAliveStore = defineStore('keep-alive', () => {
  const keepAliveNames: Ref<Set<string>> = ref(new Set())

  const getKeepAliveNames = computed(() => Array.from(keepAliveNames.value))

  function addKeepAliveName(name: string) {
    keepAliveNames.value.add(name)
  }

  function deleteKeepAliveName(name: string) {
    keepAliveNames.value.delete(name)
  }

  function setKeepAliveNames(name: string[]) {
    keepAliveNames.value = new Set(name)
  }

  return {
    keepAliveNames,
    getKeepAliveNames,
    addKeepAliveName,
    deleteKeepAliveName,
    setKeepAliveNames,
  }
})
