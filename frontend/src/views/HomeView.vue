<template>
  <div class="flex flex-col min-h-screen relative p-6">
    <div class="flex-1 flex flex-col justify-center items-center text-center z-10">
      <div class="mb-8 relative auto-mx">
        <div class="w-32 h-32 bg-amber-500/20 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-amber-500 drop-shadow-md relative z-10">
          Identity90
        </h1>
        <p class="mt-2 text-amber-200/80 uppercase tracking-widest text-sm font-semibold">Nusantara Series</p>
      </div>

      <p class="text-lg text-slate-300 max-w-sm mb-12">
        Ubah fotomu menjadi Avatar Nusantara dengan kekuatan AI.
      </p>

      <div class="w-full space-y-4">
        <BaseButton size="lg" @click="startJourney">
          Mulai Transformasi
          <template #icon-right>
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </template>
        </BaseButton>
      </div>
    </div>
    
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-amber-900/40 blur-[100px] rounded-full mix-blend-screen" />
      <div class="absolute top-[60%] -right-[20%] w-[60%] h-[60%] bg-orange-900/30 blur-[120px] rounded-full mix-blend-screen" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowRightIcon } from 'lucide-vue-next'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()

const startJourney = () => {
  router.push('/flow')
}
</script>
