<template>
  <div class="flex flex-col min-h-screen relative p-6 justify-center items-center text-center overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 bg-slate-900 z-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/20 rounded-full blur-[100px] animate-pulse" />
      <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-bounce" style="animation-duration: 4s;" />
    </div>

    <div class="z-10 w-full max-w-sm">
      <div class="relative w-32 h-32 mx-auto mb-8">
        <!-- Spinner rings -->
        <div class="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
        <div class="absolute inset-2 border-4 border-orange-400 rounded-full border-b-transparent animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        
        <SparklesIcon class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-300 animate-pulse" />
      </div>

      <h2 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2">
        The Forge
      </h2>
      <p class="text-slate-400 mb-12">Membangkitkan DNA Nusantaramu...</p>

      <!-- Cultural Fact Card -->
      <transition name="fade" mode="out-in">
        <div :key="currentFactIndex" class="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl">
          <div class="flex items-center gap-3 mb-3 text-amber-500/80">
            <BookOpenIcon class="w-5 h-5" />
            <span class="text-xs font-bold tracking-widest uppercase">Fakta Budaya</span>
          </div>
          <p class="text-slate-200 text-sm leading-relaxed text-left">
            {{ facts[currentFactIndex] }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { SparklesIcon, BookOpenIcon } from 'lucide-vue-next'
import { transformationState } from '../store.js'
import { generateAvatar } from '../services/api.js'

const router = useRouter()

const facts = [
  "Keris bukan sekadar senjata, melainkan simbol spiritual yang dipercaya memiliki nyawa tersendiri dalam budaya Jawa.",
  "Batik Parang dulunya hanya boleh dikenakan oleh raja dan keturunannya karena melambangkan kekuasaan dan kekuatan yang tidak pernah putus.",
  "Konsep 'Tri Hita Karana' di Bali mengajarkan harmoni antara manusia dengan Tuhan, alam, dan sesama manusia.",
  "Kapal Pinisi dari Sulawesi Selatan dibuat tanpa menggunakan paku besi satu pun, hanya mengandalkan pasak kayu dan teknik sambungan presisi tinggi."
]

const currentFactIndex = ref(0)
let interval

onMounted(async () => {
  // Rotate facts every 3.5 seconds
  interval = setInterval(() => {
    currentFactIndex.value = (currentFactIndex.value + 1) % facts.length
  }, 3500)

  // Redirect back if user refreshed the page and lost state
  if (!transformationState.path || !transformationState.region || !transformationState.vibe) {
    return router.replace('/flow')
  }

  try {
    transformationState.isProcessing = true;
    transformationState.error = null;

    // Call the backend API
    const response = await generateAvatar({
      path: transformationState.path,
      region: transformationState.region,
      vibe: transformationState.vibe,
      imageFile: transformationState.imageFile,
    });

    if (response.success) {
      transformationState.result = response.data;
      router.replace('/reveal');
    } else {
      throw new Error("API Returned unsuccess status");
    }

  } catch (error) {
    console.error("Generation failed:", error);
    transformationState.error = "Terjadi kesalahan saat memproses gambar. Silakan coba lagi.";
    alert(transformationState.error); // Fallback error handling
    router.replace('/flow')
  } finally {
    transformationState.isProcessing = false;
  }
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
