<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/api'
import router from '@/router'
import { isAxiosError } from 'axios'
import type { ApiResponse, LoginResponse } from '@/types'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await api.post('/api/auth/login', {
      username: username.value,
      password: password.value,
    })

    const data = response.data as ApiResponse<LoginResponse>

    if (data.data) {
      authStore.setToken(data.data.token, username.value)
      setTimeout(() => {
        router.back()
      }, 500)
    } else {
      errorMessage.value = 'Terjadi kesalahan pada request.'
    }

  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ApiResponse
        errorMessage.value = errorData.message || 'Terjadi kesalahan.'
      } else if (error.request) {
        errorMessage.value = 'Koneksi ke server gagal. Silakan cek backend.'
      } else {
        errorMessage.value = 'Terjadi kesalahan pada request.'
      }
    } else {
      errorMessage.value = 'Terjadi kesalahan tidak terduga.'
      console.error(error)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center text-gray-900">Task Management Login</h1>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
          />
        </div>

        <div v-if="errorMessage" class="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {{ isLoading ? 'Loading...' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
