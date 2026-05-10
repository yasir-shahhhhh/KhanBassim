(function () {
    const chatUI = `
    <div id="chat-button" title="Open Chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </div>
    <div id="chat-interface" style="display:none;">
        <div id="chat-main">
            <div id="chat-header">
                <div id="chat-hdr-left">
                    <img src="assets/Khan%20AI%20logo.png" alt="Khan AI Logo" id="chat-hdr-logo">
                    <span id="chat-hdr-name">Khan AI</span>
                </div>
                    <div class="chat-hdr-controls" style="display: flex !important; flex-direction: row !important; align-items: center !important; gap: 10px !important; flex-wrap: nowrap !important; margin-left: auto !important;">
                        <button id="call-btn" class="chat-hdr-btn" title="Voice Mode"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
                        <button id="reset-chat-btn" class="chat-hdr-btn" title="Clear Conversation"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
                        <button id="close-chat-btn" class="chat-hdr-btn" title="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
                    </div>
            </div>
            
            <div id="chat-messages"></div>
            
            <div id="typing-indicator" style="display:none;">
                <div class="typing-dots"><span></span><span></span><span></span></div>
            </div>

            <div id="chat-footer">
                <div id="upload-status-bar" style="display:none;">
                    <div id="file-preview-container">
                        <div class="file-preview-thumbnail"></div>
                        <div class="file-preview-details">
                            <span id="upload-status">File</span>
                            <span id="upload-type">Attached</span>
                        </div>
                        <button id="upload-clear-btn" class="preview-close-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>

                <div id="suggestion-chips">
                    <button class="chip">Who is Baasim?</button>
                    <button class="chip">Work</button>
                    <button class="chip">Skills</button>
                    <button class="chip">Contact</button>
                </div>

                <div id="chat-input-area">
                    <div id="chat-input-box">
                        <textarea id="user-input" placeholder="Message Khan AI..." autocomplete="off" rows="1"></textarea>
                        <div id="chat-pill-row">
                            <div class="io-tools">
                                <button id="think-toggle" class="pill-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 3v4"/><path d="M17 5h4"/></svg> DeepThink</button>
                            </div>
                            <div class="io-actions">
                                <button id="attach-button" class="io-btn" title="Attach file"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></button>
                                <button id="voice-input-btn" class="io-btn" title="Voice input"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg></button>
                                <button id="chat-send-btn" class="send-pill-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
                <p id="chat-disclaimer">KHAN AI can make mistakes. Please double-check responses.</p>
            </div>
        </div>
    </div>

    <!-- Info Modal -->
    <div id="khan-info-modal" style="display:none;">
        <div id="kim-overlay"></div>
        <div id="kim-content">
            <div id="kim-header">
                <h3 id="kim-title">Organization Info</h3>
                <button id="kim-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
            </div>
            <div id="kim-body"></div>
        </div>
    </div>

    <div id="khan-image-modal">
        <button id="kim-close-img" class="kim-close-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        <img id="kim-img" src="" alt="Viewed Image">
    </div>

    <input type="file" id="chat-file-input" style="display:none;" accept="image/*,.pdf,.txt,.csv,.json,.md,.js,.py,.html,.css">
    <div id="chat-drop-zone" class="drop-zone">Drop file to attach</div>

    `;

    const style = `
    /* Corporate Premium Aesthetics (Microsoft/Apple inspired) */
    #chat-interface {
        position: fixed; bottom: 100px; right: 30px; z-index: 10001;
        width: 440px; height: 720px; max-width: calc(100vw - 40px); max-height: calc(100vh - 120px);
        background: #ffffff; color: #111111; border-radius: 28px;
        box-shadow: 0 24px 80px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.05);
        display: flex; flex-direction: column; overflow: hidden;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Inter', -apple-system, sans-serif;
    }
    #chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; }
    
    #chat-header {
        padding: 18px 24px; border-bottom: 1px solid #f2f2f2;
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); z-index: 10;
    }
    #chat-hdr-left { display: flex; align-items: center; gap: 12px; }
    #chat-hdr-logo { width: 30px; height: 30px; object-fit: contain; border-radius: 8px; background: #000; padding: 4px; }
    #chat-hdr-name { font-weight: 700; font-size: 1.15rem; color: #000; letter-spacing: -0.02em; }
    
    .chat-hdr-controls { 
        display: flex !important; 
        flex-direction: row !important; 
        align-items: center !important; 
        gap: 10px !important; 
        flex-wrap: nowrap !important;
        margin-left: auto;
    }
    .chat-hdr-btn {
        width: 36px; height: 36px; border-radius: 10px; border: none;
        background: transparent; color: #555;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .chat-hdr-btn:hover { background: #f5f5f5; color: #000; }
    .chat-hdr-btn svg { width: 20px; height: 20px; stroke-width: 2.25; }

    .chat-hdr-voice-btn {
        display: flex; align-items: center; gap: 8px; padding: 6px 14px;
        background: #fff; border: 1px solid #f0f0f0; border-radius: 100px;
        color: #ff3b30; font-size: 0.7rem; font-weight: 800; cursor: pointer;
        transition: all 0.2s; box-shadow: 0 2px 10px rgba(255,59,48,0.1);
        margin-right: 4px; letter-spacing: 0.05em;
    }
    .chat-hdr-voice-btn:hover { background: #fff1f1; transform: translateY(-1px); box-shadow: 0 4px 15px rgba(255,59,48,0.15); }
    .voice-dot { width: 8px; height: 8px; background: #ff3b30; border-radius: 50%; animation: voiceBlink 1.5s infinite; }
    @keyframes voiceBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

    #chat-button {
        position: fixed; bottom: 30px; right: 30px; z-index: 10000;
        width: 58px; height: 58px; border-radius: 50%;
        background: #000; color: #fff; border: none; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #chat-button:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 15px 50px rgba(0,0,0,0.2); }
    #chat-button svg { width: 24px; height: 24px; }
    #chat-button.chat-open-hidden { opacity: 0; pointer-events: none; transform: scale(0.8); }

    /* Messages */
    #chat-messages {
        flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px;
        background: #ffffff; scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch; touch-action: pan-y; overscroll-behavior-y: contain; pointer-events: auto;
    }
    .chat-message { max-width: 85%; display: flex; flex-direction: column; gap: 6px; }
    .cm-user { align-self: flex-end; }
    .cm-ai { align-self: flex-start; width: 100%; position: relative; }
    
    .cm-user-bubble {
        background: #000; color: #fff; padding: 12px 20px; border-radius: 22px 22px 4px 22px;
        font-size: 0.95rem; line-height: 1.5; font-weight: 500; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .cm-ai-bubble { background: transparent; color: #111; padding: 0; border: none; font-size: 0.95rem; line-height: 1.6; }
    .cm-ai-text { word-break: break-word; color: #1a1a1a; }
    .cm-ai-text p { margin-bottom: 12px; }
    
    .cm-thought {
        background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;
        margin-bottom: 12px; overflow: hidden;
    }
    .cm-thought summary {
        padding: 10px 14px; font-size: 0.85rem; font-weight: 600; color: #555;
        cursor: pointer; display: flex; align-items: center; gap: 8px; user-select: none;
        list-style: none;
    }
    .cm-thought summary::-webkit-details-marker { display: none; }
    .cm-thought summary svg { animation: pulse 2s infinite; }
    .cm-thought-body {
        padding: 0 14px 14px 36px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
        line-height: 1.6; color: #666; white-space: pre-wrap;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

    .cm-actions { display: flex; gap: 14px; margin-top: 12px; }
    .cma-btn { background: transparent; border: none; color: #aaa; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; }
    .cma-btn:hover { color: #000; }
    .cma-btn svg { width: 16px; height: 16px; }

    /* Footer & Suggestions */
    #chat-footer { padding: 16px 24px 24px; border-top: 1px solid #f2f2f2; background: #fff; position: relative; }
    
    #upload-status-bar {
        position: absolute; bottom: 100%; left: 0; right: 0;
        background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
        padding: 14px 24px; z-index: 100; border-top: 1px solid #f2f2f2;
    }
    #file-preview-container {
        display: flex; align-items: center; gap: 12px; background: #f8f8f8; 
        padding: 8px 12px; border-radius: 14px; border: 1px solid #eee;
    }
    .file-preview-thumbnail { 
        width: 44px; height: 44px; border-radius: 8px; background: #eee; 
        display: flex; align-items: center; justify-content: center; overflow: hidden;
        background-size: cover; background-position: center;
    }
    .file-preview-details { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    #upload-status { font-weight: 600; font-size: 0.85rem; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #upload-type { font-size: 0.7rem; color: #777; text-transform: uppercase; letter-spacing: 0.05em; }
    .preview-close-btn { 
        width: 28px; height: 28px; border-radius: 50%; border: none; background: #fff; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; display: flex; align-items: center; justify-content: center;
        color: #666; transition: all 0.2s;
    }
    .preview-close-btn:hover { color: #000; transform: scale(1.1); }

    #suggestion-chips { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
    #suggestion-chips::-webkit-scrollbar { display: none; }
    .chip {
        white-space: nowrap; padding: 6px 12px; border-radius: 100px;
        background: #fff; border: 1px solid #eaeaea; color: #444;
        font-size: 0.75rem; font-weight: 500; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .chip:hover { border-color: #000; color: #000; background: #fbfbfb; transform: translateY(-1px); }

    #chat-input-area { width: 100%; }
    #chat-input-box {
        background: #fdfdfd; border: 1px solid #e5e5e5; border-radius: 20px;
        padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; transition: all 0.3s ease;
        position: relative;
    }
    #chat-input-box:focus-within { background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-color: #d0d0d0; }
    
    #user-input {
        width: 100%; background: transparent; border: none; color: #000; outline: none;
        font-size: 0.95rem; padding: 2px 0; resize: none; max-height: 120px; line-height: 1.4;
    }
    #user-input::placeholder { color: #aaa; }

    #chat-pill-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
    #chat-pill-actions { display: flex; gap: 8px; }
    .pill-btn {
        display: flex; align-items: center; gap: 6px; padding: 5px 12px;
        background: #fff; border: 1px solid #e5e5e5; border-radius: 100px;
        color: #555; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .pill-btn:hover { background: #f7f7f7; border-color: #ccc; color: #111; }
    .pill-btn.active { background: #000; border-color: #000; color: #fff; }
    .pill-btn svg { width: 13px; height: 13px; }

    .io-tools, .io-actions { display: flex; align-items: center; gap: 8px; }
    .io-btn { background: transparent; border: none; color: #666; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; padding: 4px; }
    .io-btn:hover { color: #000; transform: scale(1.1); }
    .io-btn svg { width: 19px; height: 19px; stroke-width: 2; }
    
    .send-pill-btn {
        width: 34px; height: 34px; border-radius: 50% !important;
        background: #000 !important; color: #fff !important; display: flex !important;
        align-items: center; justify-content: center; border: none; cursor: pointer; transition: all 0.2s;
        margin-left: 2px;
    }
    .send-pill-btn:hover { transform: scale(1.05); background: #333 !important; }
    .send-pill-btn svg { width: 18px; height: 18px; stroke-width: 3; }
    
    #chat-disclaimer { text-align: center; font-size: 0.65rem; color: #aaa; margin-top: 10px; font-weight: 500; }

    /* Drop Zone */
    .drop-zone {
        position: fixed; inset: 0; background: rgba(0,0,0,0.05);
        backdrop-filter: blur(20px); z-index: 100000;
        display: none; align-items: center; justify-content: center;
        border: 2px dashed #000; color: #000; font-size: 1.5rem; font-weight: 700;
        pointer-events: none;
    }

    /* GoLive Premium */
    #golive-overlay {
        position: fixed; inset: 0; background: #fff; z-index: 10002;
        display: none; flex-direction: column; font-family: 'Inter', sans-serif;
    }
    #golive-overlay.show { display: flex; animation: glFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    #gl-container { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; }
    #gl-top-glow {
        position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
        width: 100vw; height: 50vh; background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%);
        pointer-events: none;
    }
    #gl-display { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; z-index: 2; }
    #gl-logo-section { position: relative; width: 130px; height: 130px; }
    #gl-logo-glow {
        position: absolute; inset: -40px; border-radius: 50%;
        background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%);
        animation: logoPulse 4s infinite ease-in-out;
    }
    @keyframes logoPulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.15); opacity: 1; } }
    #gl-main-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; background: #000; padding: 12px; border: 5px solid #f9f9f9; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }

    #gl-info { text-align: center; }
    #gl-name { font-size: 2.25rem; font-weight: 800; color: #000; margin-bottom: 14px; letter-spacing: -0.03em; }
    #gl-status-pill {
        display: inline-block; padding: 10px 24px; background: #f5f5f5; color: #000;
        border-radius: 100px; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.01em;
    }
    #gl-content { flex: 1; display: flex; flex-direction: column; width: 85%; overflow-y: auto; text-align: left; margin: 20px 0; padding-right: 10px; scrollbar-width: none; }
    #gl-content::-webkit-scrollbar { display: none; }
    #gl-transcript-msg { color: #888; font-size: 1.05rem; font-weight: 500; line-height: 1.5; text-align: center; margin: auto; }

    #gl-bottom-controls {
        width: 100%; max-width: 440px; padding: 28px; margin-bottom: 50px;
        background: #ffffff; border: 1px solid #f2f2f2; border-radius: 40px;
        display: flex; align-items: center; justify-content: space-between; z-index: 5;
        box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    }
    .gl-round-btn {
        width: 58px; height: 58px; border-radius: 50%; border: 1px solid #f0f0f0;
        background: #fff; color: #000; display: flex; align-items: center; justify-content: center; 
        cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .gl-round-btn:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .gl-round-btn.muted { background: #fff1f1; color: #ff3b30; border-color: #ff3b30; }
    .gl-round-btn.gl-red-btn { background: #ff3b30; color: #fff; border: none; }
    .gl-round-btn.gl-red-btn:hover { background: #e02d22; }
    .gl-round-btn svg { width: 24px; height: 24px; }
    #gl-timer-pill { font-weight: 700; font-size: 1rem; color: #000; background: #f5f5f5; padding: 10px 20px; border-radius: 100px; }
    #gl-drag-handle { width: 45px; height: 5px; background: #eee; border-radius: 10px; margin-bottom: 15px; }

    /* Info Modal */
    #khan-info-modal { position: fixed; inset: 0; z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 60px 20px; }
    #kim-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(15px); }
    #kim-content { 
        position: relative; z-index: 10; width: 100%; max-width: 580px; max-height: 100%; 
        background: #ffffff; border: 1px solid #eee; border-radius: 24px; 
        display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 30px 100px rgba(0,0,0,0.1);
        animation: kimFade 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #kim-header { padding: 24px 30px; border-bottom: 1px solid #f2f2f2; display: flex; align-items: center; justify-content: space-between; }
    #kim-title { font-size: 1.2rem; font-weight: 800; color: #000; letter-spacing: -0.02em; }
    #kim-close { background: transparent; border: none; color: #aaa; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
    #kim-close:hover { color: #000; transform: scale(1.1); }
    #kim-close svg { width: 22px; height: 22px; }
    #kim-body { padding: 30px; overflow-y: auto; color: #444; line-height: 1.8; font-size: 1rem; scrollbar-width: none; }
    #kim-body h4 { color: #000; margin: 25px 0 12px; font-size: 1.1rem; font-weight: 700; }
    #kim-body strong { color: #000; }

    @keyframes glFadeIn { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes kimFade { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

    /* Image Modal Glitch Fix */
    #khan-image-modal { 
        position: fixed; inset: 0; z-index: 100002; display: none; 
        align-items: center; justify-content: center; background: rgba(0,0,0,0.9);
        backdrop-filter: blur(10px); animation: fadeIn 0.3s ease;
    }
    #khan-image-modal.show { display: flex; }
    #kim-img { max-width: 90%; max-height: 80%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .kim-close-btn { 
        position: absolute; top: 30px; right: 30px; background: rgba(255,255,255,0.1); 
        border: none; color: #fff; width: 50px; height: 50px; border-radius: 50%;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: all 0.3s;
    }
    .kim-close-btn:hover { background: rgba(255,255,255,0.2); transform: rotate(90deg); }

    /* Mobile Adaptations */
    @media (max-width: 480px) {
        #chat-interface { right: 0; bottom: 0; width: 100%; height: 100%; max-height: 100%; border-radius: 0; border: none; }
    }
    `;

    const el = document.createElement('div');
    el.innerHTML = chatUI;
    document.body.appendChild(el);

    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.appendChild(styleEl);

    function loadScript(src, id) {
        if (document.getElementById(id)) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    async function initAll() {
        try {
            const v = Date.now(); // Cache buster
            await loadScript('config.js?v=' + v, 'khan-config-js');
            await loadScript('khan-logic.js?v=' + v, 'khan-logic-js');
            if (window.lucide) window.lucide.createIcons();
        } catch (e) {
            console.error('Khan AI failed to load dependencies:', e);
        }
    }
    initAll();
})();
