const CONFIG = {
    GROQ_API_KEY: "hidden_in_netlify",
    ELEVENLABS_API_KEY: "hidden_in_netlify",
    VOICE_ID: "JBFqnCBsd6RMkjVDRZzb",
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
