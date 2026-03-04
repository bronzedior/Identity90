<template>
  <div class="flex flex-col min-h-screen relative bg-slate-950 p-4 pb-8">
    <div class="flex justify-between items-center mb-6 pt-4 px-2 z-10">
      <button @click="goHome" class="p-2 bg-slate-800/50 rounded-full backdrop-blur-sm text-slate-300 hover:text-white">
        <HomeIcon class="w-5 h-5" />
      </button>
      <div class="px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Identity90</span>
      </div>
    </div>

    <div 
      ref="cardRef" 
      class="persona-card-container persona-card-shadow relative rounded-3xl overflow-hidden mx-auto w-full max-w-sm flex flex-col"
    >
      <div class="relative aspect-square w-full flex-shrink-0 overflow-hidden" style="background-color: #1e293b;">
        <img 
          :src="result?.imageUrl" 
          alt="Avatar" 
          crossorigin="anonymous"
          class="w-full h-full object-cover mix-blend-luminosity opacity-80"
          style="box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.5);"
          :class="{'opacity-0': !result?.imageUrl}"
        />
        <div class="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style="background: linear-gradient(to top, rgba(2, 6, 23, 0.8), transparent);"></div>

        <div class="absolute bottom-4 left-4">
          <p class="heritage-text text-[10px] sm:text-xs font-bold tracking-widest uppercase opacity-90" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
            Identity90 // Nusantara Series
          </p>
        </div>
      </div>

      <div class="poetry-section px-6 py-6 text-center flex flex-col justify-center">
        <p class="poetry-text italic text-sm leading-relaxed" style="text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
          "{{ result?.poetry || 'Dalam diam, akar leluhur menyapa raga yang fana.' }}"
        </p>
      </div>
    </div>

    <div class="mt-8 px-2 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <BaseButton size="sm" @click="shareImage">
          Share Image <Share2Icon class="w-4 h-4 ml-2" />
        </BaseButton>
        <BaseButton size="sm" variant="secondary" @click="downloadImage">
          Save Image <DownloadIcon class="w-4 h-4 ml-2" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { HomeIcon, Share2Icon, DownloadIcon } from 'lucide-vue-next'
import BaseButton from '../components/ui/BaseButton.vue'
import { transformationState, resetState } from '../store.js'

const router = useRouter()
const result = computed(() => transformationState.result)

const goHome = () => {
  resetState();
  router.replace('/');
}

const shareImage = async () => {
  const shareText = 'Cek Foto Nusantara saya dari Identity90!';

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Identity90 - Nusantara Series',
        text: shareText,
        url: window.location.href,
      })
      return;
    } catch (err) {
      if (err.name !== 'AbortError') fallbackShare(shareText);
    }
  } else {
    fallbackShare(shareText);
  }
}

const fallbackShare = (text) => {
    const fullText = `${text}\n${window.location.href}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText)
        .then(() => alert("Link berhasil disalin!"))
        .catch(() => alert("Gagal menyalin link."));
    }
}

const downloadImage = async () => {
  if (!result.value?.imageUrl) return;
  try {
    const response = await fetch(result.value.imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Identity90-Image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    window.open(result.value.imageUrl, '_blank');
  }
}
</script>

<style scoped>
/* Memaksa elemen kartu menggunakan HEX untuk kompatibilitas html2canvas */
.persona-card-container {
  background-color: #0f172a !important; /* Hex untuk Slate-900 */
  border: 1px solid #334155 !important; /* Hex untuk Slate-700 */
}

.poetry-section {
  background-color: #020617 !important; /* Hex untuk Slate-950 */
}

.poetry-text {
  color: #cbd5e1 !important;            /* Hex untuk Slate-300 */
}

.heritage-text {
  color: #f59e0b !important;            /* Hex untuk Amber-500 */
}

.persona-card-shadow {
  box-shadow: 0 25px 50px -12px rgba(120, 53, 15, 0.4) !important;
}

/* Tambahan: html2canvas terkadang gagal merender mix-blend-mode. 
   Jika gambar hasil download tidak muncul (hitam), gunakan filter grayscale 
   sebagai fallback di bawah ini */
img {
  -webkit-print-color-adjust: exact;
}
</style>