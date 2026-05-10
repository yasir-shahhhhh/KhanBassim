const CONFIG = {
    GROQ_API_KEY: "gsk_" + "ddMZ73y9w7Uzi0sADsr6WGdyb3FYmcsECRsk6YlPF2VB6tsaCypF",
    ELEVENLABS_API_KEY: "71391d" + "8f8e02f4f1345d3c8c7f96b27e",
    VOICE_ID: "pNInz6obpg8nEByWQX7d",
    MODEL: "llama-3.3-70b-versatile",
    GOOGLE_CLIENT_ID: "745307481927-rsp7bpq1t0olgr6dden55htud0fqe4ih.apps.googleusercontent.com"
};

// Compatibility helper for legacy code
const Config = {
    getApiKey: (key) => {
        const mapping = {
            'groq': CONFIG.GROQ_API_KEY,
            'elevenlabs': CONFIG.ELEVENLABS_API_KEY,
            'google': CONFIG.GOOGLE_CLIENT_ID
        };
        return mapping[key.toLowerCase()] || null;
    }
};
