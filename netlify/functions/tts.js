

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        const voiceId = process.env.VOICE_ID || "pNInz6obpg8nEByWQX7d";

        if (!apiKey) {
            console.error('[BACKEND ERROR] ELEVENLABS_API_KEY is missing');
            return { statusCode: 500, body: JSON.stringify({ error: 'TTS Configuration Error' }) };
        }

        const { text } = JSON.parse(event.body);
        if (!text) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Text is required' }) };
        }

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'audio/mpeg'
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[ELEVENLABS ERROR]', errorText);
            return { statusCode: response.status, body: errorText };
        }

        const audioBuffer = Buffer.from(await response.arrayBuffer());
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': '*'
            },
            body: audioBuffer.toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('[CRITICAL TTS FAILURE]', error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: 'Internal Server Error', message: error.message }) 
        };
    }
};
