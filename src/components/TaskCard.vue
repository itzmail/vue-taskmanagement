<script setup lang="ts">
import { type Task } from '@/types';

defineProps<{
  task: Task;
}>();

const emit = defineEmits(['edit', 'delete']);

const onEdit = () => {
  emit('edit');
};

const onDelete = () => {
  emit('delete');
};
</script>

<template>
  <div class="flex flex-col justify-between p-4 sm:p-6 bg-white rounded-lg shadow-md">

    <div>
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg sm:text-xl font-semibold text-gray-900 break-words">{{ task.title }}</h3>

        <span
          class="px-2 sm:px-3 py-1 text-xs font-medium text-white rounded-full whitespace-nowrap ml-2"
          :class="{
            'bg-blue-500': task.status === 'TO_DO',
            'bg-yellow-500': task.status === 'IN_PROGRESS',
            'bg-green-500': task.status === 'DONE',
          }"
        >
          {{ task.status.replace('_', ' ') }}
        </span>
      </div>
      <p class="text-sm sm:text-base text-gray-600 break-words">{{ task.description }}</p>
    </div>

    <div class="flex justify-end mt-4 space-x-2 flex-wrap gap-2">
      <button
        @click="onEdit"
        class="px-3 py-1 text-xs sm:text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors"
      >
        Edit
      </button>
      <button
        @click="onDelete"
        class="px-3 py-1 text-xs sm:text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>
