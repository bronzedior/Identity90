<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 active:scale-95',
      variant === 'primary' 
        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:from-amber-400 hover:to-orange-500' 
        : '',
      variant === 'secondary'
        ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600'
        : '',
      size === 'sm' ? 'px-4 py-2 text-sm' : '',
      size === 'md' ? 'px-6 py-3 text-base' : '',
      size === 'lg' ? 'px-8 py-4 text-lg w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot name="icon-left" />
    <span :class="{'ml-2': $slots['icon-left'], 'mr-2': $slots['icon-right']}">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>
