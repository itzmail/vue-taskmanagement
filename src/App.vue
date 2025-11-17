<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Global styles to prevent horizontal overflow */
html, body {
  overflow-x: hidden;
  width: 100%;
}

* {
  box-sizing: border-box;
}

/* Ensure no element causes horizontal scroll */
.container {
  width: 100%;
  max-width: 100%;
}
</style>
