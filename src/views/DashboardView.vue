<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/api'
import { type Task } from '@/types'
import { isAxiosError } from 'axios'
import router from '@/router'

import TheNavbar from '@/components/TheNavbar.vue'
import TaskFormModal from '@/components/TaskFormModal.vue'
import TaskCard from '@/components/TaskCard.vue'

const authStore = useAuthStore()

const tasks = ref<Task[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const isModalOpen = ref(false)
const taskToEdit = ref<Task | null>(null)

const handleLogout = () => {
  authStore.logout()
}

const fetchTasks = async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const response = await api.get('/api/tasks')

    if (response.data.status && response.data.data) {
      tasks.value = response.data.data as Task[]
    } else {
      errorMessage.value = response.data?.message || 'Gagal memuat data'
    }
  } catch (error) {
    console.log('error', error)
    if (isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message || 'Gagal terhubung ke server.'
      handleLogout();
    } else {
      errorMessage.value = 'Terjadi kesalahan saat memuat task.'
    }
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  taskToEdit.value = null // Set null untuk mode Create
  isModalOpen.value = true
}

const openEditModal = (task: Task) => {
  taskToEdit.value = task // Set task untuk mode Edit
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const onSaveSuccess = (savedTask: Task) => {
  const index = tasks.value.findIndex((t) => t.id === savedTask.id)
  if (index !== -1) {
    tasks.value[index] = savedTask
  } else {
    tasks.value.push(savedTask)
  }
}

const handleDeleteTask = async (taskId: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus task ini?')) return
  try {
    await api.delete(`/api/tasks/${taskId}`)
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  } catch (_error) {
    alert('Gagal menghapus task. Silakan coba lagi.')
  }
}

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="h-screen bg-gray-100 w-full max-w-screen">
    <TheNavbar @logout="handleLogout" />

    <main class="container max-w-6xl p-4 mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-semibold text-gray-800">Your Tasks</h2>

        <button
          @click="openCreateModal"
          class="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          + Create New Task
        </button>
      </div>

      <div v-if="isLoading" class="text-center text-gray-500">Loading tasks...</div>

      <div v-else-if="errorMessage" class="p-4 text-center text-red-800 bg-red-100 rounded-md">
        {{ errorMessage }}
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="openEditModal(task)"
          @delete="handleDeleteTask(task.id)"
        />

        <div v-if="tasks.length === 0" class="col-span-full">
          <p class="text-center text-gray-500">Anda belum memiliki task.</p>
        </div>
      </div>
    </main>
    <TaskFormModal
      v-if="isModalOpen"
      :task="taskToEdit"
      @close="closeModal"
      @save-success="onSaveSuccess"
    />
  </div>
</template>
