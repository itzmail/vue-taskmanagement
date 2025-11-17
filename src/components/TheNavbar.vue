<script setup lang="ts">
const emit = defineEmits(['logout'])

const onLogoutClick = () => {
  emit('logout')
}
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container max-w-6xl px-4 py-4 mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-indigo-600">Task Management App</h1>

        <button
          @click="onLogoutClick"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
