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

    <!-- The Persona Card -->
    <div ref="cardRef" class="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/40 border border-slate-700/50 bg-slate-900 mx-auto w-full max-w-sm flex flex-col">
      <!-- Image Area -->
      <div class="relative aspect-square w-full bg-slate-800 flex-shrink-0 overflow-hidden">
        <img 
          :src="result?.imageUrl" 
          alt="Avatar" 
          class="w-full h-full object-cover mix-blend-luminosity opacity-80 shadow-inner transition-opacity duration-1000"
          :class="{'opacity-0': !result?.imageUrl}"
        />
        <!-- Gradient Overlay for Bottom Text -->
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>

        <!-- Watermark Info Overlay -->
        <div class="absolute bottom-4 left-4">
          <p class="text-amber-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase drop-shadow-md opacity-90">Identity90 // Nusantara Series</p>
        </div>
      </div>

      <!-- Poetry Section -->
      <div class="px-6 py-6 text-center bg-slate-950 flex flex-col justify-center">
        <p class="text-slate-300 italic text-sm leading-relaxed drop-shadow-sm">
          "{{ result?.poetry || 'Dalam diam, akar leluhur menyapa raga yang fana.' }}"
        </p>
      </div>

    </div>

    <!-- Action Buttons -->
    <div class="mt-8 px-2 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <BaseButton size="sm" @click="shareCard('image')">
          Share Image <Share2Icon class="w-4 h-4 ml-2" />
        </BaseButton>
        <BaseButton size="sm" @click="shareCard('full')">
          Share Card <Share2Icon class="w-4 h-4 ml-2" />
        </BaseButton>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <BaseButton size="sm" variant="secondary" @click="downloadCard('image')">
          Save Image <DownloadIcon class="w-4 h-4 ml-2" />
        </BaseButton>
        <BaseButton size="sm" variant="secondary" @click="downloadCard('full')">
          Save Card <DownloadIcon class="w-4 h-4 ml-2" />
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

const formatVibe = (vibe) => {
  if (!vibe) return 'Legend'
  if (vibe === 'cyber') return 'Cyber-Kingdom'
  if (vibe === 'mythical') return 'Mythical Divine'
  if (vibe === 'royal') return 'Royal Heritage'
  if (vibe === 'warrior') return 'Tribal Warrior'
  return vibe
}

const goHome = () => {
  resetState();
  router.replace('/');
}

const shareCard = async (type) => {
  const shareText = type === 'image' 
    ? 'Cek Foto Nusantara saya dari Identity90!' 
    : 'Cek Persona Nusantara saya dari Identity90 dengan puisi eksklusif!';

  // Web Share API requires HTTPS context to work properly
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Identity90 - Nusantara Series',
        text: shareText,
        url: window.location.href, // In reality, link to a shared public page
      })
      return;
    } catch (err) {
      console.log('Share canceled or failed', err)
      // Fall through to clipboard approach on system failure (not cancellation)
      if (err.name !== 'AbortError') {
        fallbackShare(shareText);
      }
    }
  } else {
    fallbackShare(shareText);
  }
}

const fallbackShare = (text) => {
    // Basic fallback to clipboard
    const fullText = `${text}\n${window.location.href}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText)
        .then(() => alert("Link berhasil disalin ke clipboard!"))
        .catch(err => {
            console.error("Failed to copy clipboard:", err)
            alert("Web Share API tidak didukung. Mohon salin link secara manual: " + window.location.href)
        });
    } else {
        alert("Web Share API tidak didukung. Mohon salin link secara manual: " + window.location.href)
    }
}

const downloadCard = (type) => {
  // Mock download action for MVP
  // In a real app, 'image' downloads just result.imageUrl
  // 'full' uses html2canvas on the cardRef to download the entire component
  if (type === 'image') {
    alert("Mengunduh gambar asli resolusi 1:1... (Mock Action)")
  } else {
    alert("Mengedit dan mengunduh seluruh kartu dengan puisi... (Mock Action)")
  }
}
</script>
