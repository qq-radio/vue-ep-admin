<template>
  <div>登录</div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { ERROR_ROUTE } from '@/router'

const router = useRouter()

const { setToken } = useUserStore()

async function login() {
  const result = await request.post('/login', {
    username: 'xx',
    password: 'xx',
  })
  setToken(result.token)
  router.push(ERROR_ROUTE)
}

login()
</script>
