<template>
  <div class="flex flex-col min-h-screen relative p-6 pt-12 overflow-y-auto w-full">
    <button @click="handleBack" class="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors">
      <ArrowLeftIcon class="w-6 h-6" />
    </button>

    <div class="flex-1 mt-8 w-full">
      <!-- Step 1: Path Selection -->
      <div v-show="state.step === 1" class="animate-fade-in w-full">
        <h2 class="text-2xl font-bold mb-2">Pilih Jalurmu</h2>
        <p class="text-slate-400 mb-8">Pilih cara kamu ingin bertransformasi</p>

        <div class="space-y-4">
          <button 
            @click="selectPath('upload')"
            class="w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left flex items-start space-x-4 bg-slate-800/50 backdrop-blur-sm"
            :class="state.path === 'upload' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-600'"
          >
            <div class="p-3 bg-slate-700/50 rounded-xl">
              <UserIcon class="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 class="font-bold text-lg text-slate-100">Gunakan Wajahku</h3>
              <p class="text-sm text-slate-400 mt-1">AI akan memindai wajahmu.</p>
            </div>
          </button>
          
          <div v-if="transformationState.path === 'upload'" class="p-4 border border-slate-700 rounded-xl bg-slate-800/30">
            <label class="block text-sm font-medium text-slate-300 mb-2">Upload Foto Wajah</label>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleFileUpload"
              class="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30"
            />
            <p v-if="fileName" class="text-xs text-amber-500 mt-2">File: {{ fileName }}</p>
          </div>

          <button 
            @click="selectPath('archetype')"
            class="w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left flex items-start space-x-4 bg-slate-800/50 backdrop-blur-sm"
            :class="state.path === 'archetype' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-600'"
          >
            <div class="p-3 bg-slate-700/50 rounded-xl">
              <SparklesIcon class="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 class="font-bold text-lg text-slate-100">Elevated Heritage</h3>
              <p class="text-sm text-slate-400 mt-1">Jelajahi gaya busana tradisional tingkat tinggi.</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Step: Gender Selection (Archetype only) -->
      <div v-show="currentStepName === 'gender'" class="animate-fade-in w-full">
        <h2 class="text-2xl font-bold mb-2">Pilih Gender</h2>
        <p class="text-slate-400 mb-8">Tentukan identitas perwujudanmu</p>

        <div class="grid grid-cols-2 gap-3 w-full">
          <button
            @click="transformationState.gender = 'man'"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-center font-bold"
            :class="transformationState.gender === 'man' ? 'border-amber-500 bg-amber-500/20 text-amber-300' : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700'"
          >
            Pria
          </button>
          <button
            @click="transformationState.gender = 'woman'"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-center font-bold"
            :class="transformationState.gender === 'woman' ? 'border-amber-500 bg-amber-500/20 text-amber-300' : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700'"
          >
            Wanita
          </button>
        </div>
      </div>

      <!-- Step: Outfit Selection -->
      <div v-show="currentStepName === 'outfit'" class="animate-fade-in w-full">
        <h2 class="text-2xl font-bold mb-2">Pilih Pakaian Adat</h2>
        <p class="text-slate-400 mb-8">Tentukan balutan wastra Nusantara</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-h-[50vh] overflow-y-auto pr-2" style="scrollbar-width: thin; scrollbar-color: #475569 transparent;">
          <button
            v-for="outfit in outfits"
            :key="outfit.id"
            @click="transformationState.region = outfit.id"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-left text-sm"
            :class="transformationState.region === outfit.id ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold' : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700 hover:border-slate-500'"
          >
            {{ outfit.name }}
          </button>
        </div>
      </div>

      <!-- Step: Vibe Selection -->
      <div v-show="currentStepName === 'vibe'" class="animate-fade-in w-full">
        <h2 class="text-2xl font-bold mb-2">Vibe Check</h2>
        <p class="text-slate-400 mb-8">Pilih nuansa estetika avatar</p>

        <div class="grid grid-cols-1 gap-3 w-full">
          <button
            v-for="vibe in vibes"
            :key="vibe.id"
            @click="transformationState.vibe = vibe.id"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-left relative overflow-hidden"
            :class="transformationState.vibe === vibe.id ? 'border-amber-500 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'"
          >
            <div 
              class="absolute inset-0 opacity-20 pointer-events-none" 
              :class="transformationState.vibe === vibe.id ? vibe.bgActive : vibe.bgDefault"
            />
            <div class="relative z-10 flex items-center justify-between">
              <span class="font-bold text-lg">{{ vibe.name }}</span>
              <span class="text-2xl">{{ vibe.emoji }}</span>
            </div>
            <p class="relative z-10 text-xs mt-1 opacity-80" :class="transformationState.vibe === vibe.id ? 'text-amber-200' : 'text-slate-400'">
              {{ vibe.desc }}
            </p>
          </button>
        </div>
      </div>
    </div>
    
    <div class="mt-auto pt-8 pb-4 w-full">
      <BaseButton size="lg" :disabled="!canProceed" @click="proceed">
        {{ currentStepName === 'vibe' ? 'Generate Sekarang' : 'Lanjutkan' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon, UserIcon, SparklesIcon } from 'lucide-vue-next'
import BaseButton from '../components/ui/BaseButton.vue'
import { transformationState } from '../store.js'
import { outfits } from '../outfits.js'

const router = useRouter()

const state = reactive({
  step: 1, // Dynamic step resolution
})

const currentStepName = computed(() => {
  if (state.step === 1) return 'path'
  if (transformationState.path === 'archetype') {
    if (state.step === 2) return 'gender'
    if (state.step === 3) return 'outfit'
    if (state.step === 4) return 'vibe'
  } else {
    // upload path
    if (state.step === 2) return 'outfit'
    if (state.step === 3) return 'vibe'
  }
})

const fileName = ref('')

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    transformationState.imageFile = file
    fileName.value = file.name
  }
}

const vibes = [
  { id: 'cyber', name: 'Cyber-Couture', emoji: '✨', desc: 'Neon avant-garde fashion dengan sentuhan wastra.', bgDefault: 'bg-indigo-900', bgActive: 'bg-indigo-500' },
  { id: 'mythical', name: 'Ethereal Elegance', emoji: '🕊️', desc: 'Pemotretan majalah bernuansa anggun & mistis.', bgDefault: 'bg-amber-900', bgActive: 'bg-amber-500' },
  { id: 'royal', name: 'High-Society Royal', emoji: '👑', desc: 'Gaya ningrat modern, mewah dan berkelas tinggi.', bgDefault: 'bg-red-900', bgActive: 'bg-red-500' },
  { id: 'warrior', name: 'Edgy Ethnic', emoji: '🖤', desc: 'High-fashion tegas dengan corak tradisional berani.', bgDefault: 'bg-emerald-900', bgActive: 'bg-emerald-500' },
  { id: 'natural', name: 'Natural', emoji: '🌿', desc: 'Sederhana, membumi, tanpa modifikasi berlebih.', bgDefault: 'bg-stone-800', bgActive: 'bg-stone-500' },
]

const canProceed = computed(() => {
  if (currentStepName.value === 'path') {
    if (transformationState.path === 'upload') return !!transformationState.imageFile
    return !!transformationState.path
  }
  if (currentStepName.value === 'gender') return !!transformationState.gender
  if (currentStepName.value === 'outfit') return !!transformationState.region
  if (currentStepName.value === 'vibe') return !!transformationState.vibe
  return false
})

const selectPath = (path) => {
  transformationState.path = path
}

const proceed = () => {
  if (currentStepName.value === 'vibe') {
    // Navigate to Forge
    router.push('/forge')
  } else {
    state.step++
  }
}

// Intercept back button behavior for internal steps
const handleBack = () => {
  if (state.step > 1) {
    state.step--
  } else {
    router.back()
  }
}
</script>
