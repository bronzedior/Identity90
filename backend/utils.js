export const generatePrompt = (outfitId, vibe, faceFeatures = "", gender = "") => {
    const outfitTraits = {
        aceh: "Acehnese Ulee Balang haute couture, opulent gold thread embroidery, majestic cultural crown, high fashion Vogue editorial, detailed traditional textile patterns",
        sumut: "Batak Ulos high fashion, elegant traditional handwoven textiles, bold geometric motifs, contemporary luxury ethnic wear, Vogue photoshoot",
        sumbar: "Minangkabau Bundo Kanduang majestic fashion, luxurious Songket textiles, opulent golden Tingkuluak headpiece, modern ethnic runway model",
        riau: "Melayu Jatuh elegant fashion, rich silk fabrics with intricate gold embroidery, modern traditional Malay high fashion, Vogue magazine cover",
        kepulauan_riau: "Teluk Belanga contemporary ethnic fashion, striking minimalist Malay traditional wear, luxurious silk textures, bold high fashion editorial",
        jambi: "Jambi Baju Kurung Tanggung haute couture, elegant traditional velvet and gold embroidery, royal sumatran heritage, fashion editorial",
        sumsel: "Palembang Aesan Gede high fashion, opulent golden crowns and layered Songket, majestic royal heritage, contemporary luxury ethnic wear",
        babel: "Bangka Belitung Pakaian Seting, elegant Cual woven fabric, rich cultural heritage fashion, Vogue photoshoot",
        bengkulu: "Bengkulu Rejang Lenong traditional couture, luxurious velvet with gold coin accents, majestic ethnic attire, modern runway",
        lampung: "Lampungese Tulang Bawang haute couture, spectacular golden Siger crown, intricate Tapis woven fabric, epic high fashion portrait",
        jakarta: "Betawi Kebaya Encim / Sadariah modern elegance, vibrant colors, intricate floral embroidery, contemporary cultural chic, Vogue editorial",
        jabar: "Sundanese Kebaya high fashion, elegant fitted lace and intricate Batik, graceful and refined aesthetic, modern traditional runway",
        banten: "Bantenese Pangsi modern ethnic wear, bold and edgy traditional martial arts inspired fashion, high fashion editorial",
        jateng: "Javanese Jawi Jangkep and Kebaya haute couture, intricate Batik designer fashion, elegant classic royal heritage, Vogue magazine cover",
        diy: "Yogyakarta Kesatrian Ageng majestic fashion, strict traditional royal elegantly, Batik Prada luxury, modern Keraton high fashion",
        jatim: "Madurese Pesa'an edgy ethnic fashion, bold red and white stripes, striking confident aesthetic, contemporary luxury ethnic wear",
        bali: "Balinese Payas Agung high fashion, opulent gold floral crowns and Prada prada fabric, majestic divine elegance, Vogue editorial",
        ntb: "Sumbawa Rimpu / Pegon traditional chic, elegant woven Tenun fabric layers, unique cultural silhouette, high fashion photography",
        ntt: "NTT Amarasi elegant woven Ikat fashion, rich earthy tones, bold traditional accessories, modern ethnic runway model",
        kalbar: "Dayak King Baba & King Bibige avant-garde fashion, intricate beadwork and barkcloth textures, modern tribal chic, ethnic couture",
        kalteng: "Dayak Upak Nyamu high fashion, elegant woven natural fibers and hornbill feathers, striking cultural Vogue photoshoot",
        kalsel: "Banjarese Bagajah Gamuling Baular Lulut majestic fashion, elegant royal velvet and gold embellishments, luxurious traditional wear",
        kaltim: "Kutai Takwo haute couture, elegant royal Bugis-influenced silk, contemporary luxury ethnic wear, high fashion editorial",
        kalut: "Dayak Ta'a and Sapei Sapaq ethnic couture, striking traditional beadwork and vibrant colors, modern tribal fashion runway",
        sulut: "Minahasan Laku Tepu high fashion, elegant traditional woven fabric, bright and bold cultural chic, Vogue magazine cover",
        sulteng: "Kaili Nggembe modern ethnic fashion, unique layered traditional blouse, elegant rich textiles, contemporary luxury",
        sulsel: "Buginese Baju Bodo haute couture, elegant sheer silk (Sutera Bugis), vibrant festive colors, contemporary luxury ethnic wear",
        sultra: "Tolaki Babu Nggawi traditional couture, elegant woven fabric and gold accents, majestic royal heritage, high fashion portrait",
        gorontalo: "Gorontalo Bili'u high fashion, opulent golden Makuta headpiece, elegant traditional royal wedding attire, Vogue editorial",
        sulbar: "Mandar Lipa Saqbe elegant fashion, rich traditional silk sarong with vibrant geometric patterns, modern cultural chic",
        maluku: "Ambonese Baju Cele modern elegance, vibrant red and white geometric patterns, striking traditional fashion, contemporary runway",
        malut: "Ternate Manteren Lamo majestic fashion, elegant royal coat and gold embroidery, luxurious regal heritage, high fashion",
        papua: "Papuan contemporary ethnic fashion, striking Noken inspired weaves, vibrant bird of paradise feather accents, bold high fashion editorial",
        papua_barat: "West Papuan Ewer avant-garde fashion, elegant traditional woven fibers and tribal motifs, modern ethnic runway",
        papua_selatan: "Asmat-inspired high fashion editorial, bold traditional body art motifs, intricate woodcarving aesthetic accents, epic tribal chic",
        papua_tengah: "Mee-inspired contemporary ethnic couture, rich high-altitude cultural textiles, striking earth-toned fashion photography",
        papua_pegunungan: "Dani-inspired avant-garde fashion, bold tribal warrior aesthetic elements adapted to high fashion, striking Vogue cover",
        papua_barat_daya: "Kain Timur woven fabric high fashion, intricate traditional Papuan textile layers, majestic cultural elegance, Vogue editorial"
    };

    const vibeTraits = {
        cyber: "cyberpunk fashion lighting, neon accents, avant-garde traditional wear, futuristic runway, 8k resolution, photorealistic fashion photography",
        mythical: "ethereal beauty, flowing traditional fabrics, glowing ambient lighting, divine elegance, Vogue editorial, highly detailed masterpiece, studio lighting",
        royal: "luxurious royal garments, regal fashion model, gold and diamond accessories, elegant high-society posture, cinematic studio lighting, hyper-realistic, 8k portrait",
        warrior: "edgy high fashion, bold ethnic patterns, fierce model expression, dramatic shadows, striking editorial makeup, dark fashion photography",
        natural: "natural beauty, raw and authentic, pure minimal editing, grounded aesthetic, real skin texture, simple modern photo studio backdrop, candid portrait"
    };

    const defaultOutfit = outfitTraits.jawa;
    const defaultVibe = vibeTraits.mythical;

    const selectedOutfit = outfitTraits[outfitId] || defaultOutfit;
    const selectedVibe = vibeTraits[vibe] || defaultVibe;

    const genderPrompt = gender === 'man' ? 'male fashion model' : (gender === 'woman' ? 'female fashion model' : 'fashion model');
    const basePrompt = `Vogue fashion magazine cover photo, ${genderPrompt} wearing ${selectedOutfit}, ${selectedVibe}.`;
    const facePrompt = faceFeatures ? ` The subject has the following facial features: ${faceFeatures}.` : "";

    // Mempertegas paksaan gender
    let strictGenderConstraint = "";
    if (gender === 'man') {
        strictGenderConstraint = "SUBJECT MUST STRICTLY BE A BIOLOGICAL MALE / MAN. NO FEMININE FEATURES. STRONG MASCULINE JAWLINE AND FACIAL STRUCTURE. DO NOT GENERATE A FEMALE.";
    } else if (gender === 'woman') {
        strictGenderConstraint = "SUBJECT MUST STRICTLY BE A BIOLOGICAL FEMALE / WOMAN. NO MASCULINE FEATURES. FEMININE FACIAL STRUCTURE AND CHARACTERISTICS. DO NOT GENERATE A MALE.";
    }

    const constraints = `Ensure outfit is highly detailed traditional Indonesian clothing (pakaian adat) with clear motifs and textures. Preserve original facial structure, eye shape, and skin tone accurately. Maintain natural proportions and identity. ${strictGenderConstraint} Avatar transform strength 0.45 - 0.6. Avoid armor, avoid knight or warrior fantasy tropes. Focus on fashion, elegant traditional textiles, and Vogue-style photography. Avoid exaggerated features, distorted face, over-sharpened, heavy makeup, cartoonish deformation.`;

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
