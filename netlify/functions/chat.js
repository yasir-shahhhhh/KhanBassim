const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // SECURITY: Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error('[BACKEND ERROR] GROQ_API_KEY is missing');
            return { statusCode: 500, body: JSON.stringify({ error: 'API Key Configuration Error' }) };
        }

        const body = JSON.parse(event.body);
        
        // HARDENING: Sanitize input and force safety parameters
        const sanitizedBody = {
            model: body.model || "llama-3.3-70b-versatile",
            messages: body.messages || [],
            temperature: Math.min(Math.max(body.temperature || 0.7, 0), 2),
            max_tokens: Math.min(body.max_tokens || 1024, 4096),
            stream: false
        };

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            timeout: 15000, // 15s timeout protection
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Khan-AI-Backend/1.0'
            },
            body: JSON.stringify(sanitizedBody)
        });

        const data = await response.json();

        // RESPONSE HARDENING
        return {
            statusCode: response.status,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store, no-cache, must-revalidate'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('[CRITICAL BACKEND FAILURE]', error);
        return { 
            statusCode: 500, 
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ 
                error: 'Internal Server Error', 
                message: error.message,
                timestamp: new Date().toISOString()
            }) 
        };
    }
};
