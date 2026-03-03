import { reactive } from 'vue'

export const transformationState = reactive({
    path: null,     // 'upload' or 'archetype'
    gender: null,   // 'man' or 'woman'
    region: null,   // Actually stores outfit id now
    vibe: null,
    imageFile: null, // File object if uploaded
    result: null,    // The generated AI response
    isProcessing: false,
    error: null
})

export const resetState = () => {
    transformationState.path = null;
    transformationState.gender = null;
    transformationState.region = null;
    transformationState.vibe = null;
    transformationState.imageFile = null;
    transformationState.result = null;
    transformationState.isProcessing = false;
    transformationState.error = null;
}
