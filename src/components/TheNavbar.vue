<script setup lang="ts">
const emit = defineEmits(['logout'])

const onLogoutClick = () => {
  emit('logout')
}
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container max-w-7xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 truncate">Task Management App</h1>

        <button
          @click="onLogoutClick"
          class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
