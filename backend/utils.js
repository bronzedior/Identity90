export const generatePrompt = (region, vibe, faceFeatures = "") => {
    const regionTraits = {
        jawa: "Javanese royalty (Keraton) aesthetics, intricate Batik patterns, mystical Keris aura, classical Javanese architecture background",
        bali: "Balinese mythology, intricate gold and stone carvings (Ukiran Bali), tropical divine aura, traditional temple (Pura) elements",
        sumatera: "Sumatran grandeur, Songket fabric textures, Minangkabau or Batak warrior elements, majestic golden hour lighting",
        kalimantan: "Dayak tribal warrior aesthetics, intricate tribal tattoos, mystical jungle aura, traditional shield (Mandau) and feather ornaments",
        sulawesi: "Buginese/Makassarese noble sailor aesthetics, Pinisi ship subtle background, traditional silk (Sutera Bugis), ocean breeze dynamic lighting",
        papua: "Papuan tribal majesty, vibrant face paints, Cendrawasih (bird of paradise) feathers, deep mystical forest lighting"
    };

    const vibeTraits = {
        cyber: "cyberpunk, neon lights, high-tech armor mixed with traditional elements, futuristic glowing runes, dystopian yet majestic, Unreal Engine 5 render, 8k resolution, photorealistic",
        mythical: "mythical divine being, ethereal glowing aura, floating elements, god-like presence, celestial lighting, fantasy concept art, highly detailed, masterpiece",
        royal: "regal, luxurious royal garments, gold and diamond ornaments, elegant posture, cinematic studio lighting, hyper-realistic, majestic, 8k portrait",
        warrior: "battle-hardened warrior, dynamic action pose, cinematic dark fantasy lighting, visible battle scars, fierce expression, dramatic shadows, highly detailed"
    };

    const defaultRegion = regionTraits.jawa;
    const defaultVibe = vibeTraits.mythical;

    const selectedRegion = regionTraits[region] || defaultRegion;
    const selectedVibe = vibeTraits[vibe] || defaultVibe;

    const basePrompt = `Portrait of a majestic figure, ${selectedRegion}, ${selectedVibe}.`;
    const facePrompt = faceFeatures ? ` The subject has the following facial features: ${faceFeatures}.` : "";

    const constraints = `Preserve original facial structure, eye shape, and skin tone. Apply subtle 90s Nusantara (Indonesia) retro aesthetic. Maintain natural proportions and identity. Avatar transform strength 0.45 - 0.6. Avoid exaggerated features, distorted face, over-sharpened, extreme lighting, heavy makeup, cartoonish deformation.`;

    return `${basePrompt}${facePrompt} ${constraints} Centered composition, looking directly at camera. High quality, masterpiece, vivid colors.`;
};

export const generatePoetry = () => {
    const poetryList = [
        "Dalam diam, akar leluhur menyapa raga yang fana.",
        "Membawa gema masa lalu, terukir dalam sebuah tatapan.",
        "Waktu boleh berlalu, namun jiwa Nusantara tetap bersemayam.",
        "Jejak langkah yang hilang, kini terlukis kembali dalam keheningan.",
        "Di balik bayang matamu, ada pusaka yang tak pernah pudar.",
        "Merengkuh kenangan lama, merajutnya dalam wujud nyata."
    ];
    return poetryList[Math.floor(Math.random() * poetryList.length)];
};

export const generateStats = () => {
    // Generate random stats between 70 and 99 for the MVP
    const randStat = () => Math.floor(Math.random() * (99 - 70 + 1) + 70);

    return {
        wisdom: randStat(),
        charisma: randStat(),
        aura: randStat()
    };
};
