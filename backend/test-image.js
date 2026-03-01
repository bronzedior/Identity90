import dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        console.log("Testing qwen-image-max on multimodal-generation/generation endpoint...");
        const res = await fetch("https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation", {
            method: 'POST',
            body: JSON.stringify({
                model: "qwen-image-max",
                input: {
                    messages: [
                        { role: "user", content: [{ type: "text", text: "a super cute fluffy cat" }] }
                    ]
                },
                parameters: { size: "1024*1024", n: 1 }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.DASHSCOPE_API_KEY}`
            }
        });
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));

    } catch (e) {
        console.error("Error:", e.message);
    }
}

main();
