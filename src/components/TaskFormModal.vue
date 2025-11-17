<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Task, TaskStatus } from '@/types';
import api from '@/api/api';
import { isAxiosError } from 'axios';

const props = defineProps<{
  task: Task | null;
}>();

const emit = defineEmits(['close', 'saveSuccess']);

const formData = ref({
  title: '',
  description: '',
  status: TaskStatus.TO_DO,
});
const errorMessage = ref<string | null>(null);

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = { ...newTask };
  } else {
    formData.value = { title: '', description: '', status: TaskStatus.TO_DO };
  }
  errorMessage.value = null;
}, { immediate: true });

const isEditMode = () => !!props.task;

const handleSubmit = async () => {
  errorMessage.value = null;

  if (!formData.value.title) {
    errorMessage.value = "Title tidak boleh kosong.";
    return;
  }

  try {
    let response;
    if (isEditMode() && props.task) {
      response = await api.put(`/api/tasks/${props.task.id}`, formData.value);
    } else {
      response = await api.post('/api/tasks', formData.value);
    }

    if (response.data.status && response.data.data) {
      emit('saveSuccess', response.data.data);
      emit('close');
    } else {
      errorMessage.value = response.data.message || "Gagal menyimpan task.";
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message || "Gagal terhubung.";
    } else {
      errorMessage.value = "Terjadi kesalahan saat menyimpan.";
    }
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-full max-w-xl p-6 bg-white rounded-lg shadow-xl text-slate-900">
      <h3 class="mb-4 text-2xl font-semibold">
        {{ isEditMode() ? 'Edit Task' : 'Create New Task' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div>
          <label for="form-title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="form-title"
            v-model="formData.title"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label for="form-description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="form-description"
            v-model="formData.description"
            rows="3"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label for="form-status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="form-status"
            v-model="formData.status"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          >
            <option :value="TaskStatus.TO_DO">To Do</option>
            <option :value="TaskStatus.IN_PROGRESS">In Progress</option>
            <option :value="TaskStatus.DONE">Done</option>
          </select>
        </div>

        <div v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {{ isEditMode() ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
