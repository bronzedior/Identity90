<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex justify-center">
    <!-- Mobile constraint -->
    <main class="w-full max-w-md bg-slate-800/20 shadow-2xl relative overflow-hidden flex flex-col min-h-screen">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
