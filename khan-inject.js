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
                    <div id="chat-input-container">
                        <textarea id="chat-user-input" placeholder="Message Khan AI..." rows="1"></textarea>
                        
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

    <div id="khan-image-modal" style="display: none !important;">
        <button id="kim-close-img" class="kim-close-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        <img id="kim-img" src="" alt="Viewed Image">
    </div>

    <input type="file" id="chat-file-input" style="display:none;" accept="image/*,.pdf,.txt,.csv,.json,.md,.js,.py,.html,.css">
    <div id="chat-drop-zone" class="drop-zone">Drop file to attach</div>

    `;

    const style = `
    /* ULTRA DARK BLACKIE AESTHETICS */
    #chat-interface {
        position: fixed; bottom: 30px; right: 30px; z-index: 10001;
        width: 440px; height: 720px; max-width: calc(100vw - 40px); max-height: calc(100vh - 120px);
        background: #000000; color: #ffffff; border-radius: 32px;
        box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1);
        display: flex; flex-direction: column; overflow: hidden;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Inter', -apple-system, sans-serif;
        border: 1px solid rgba(255,255,255,0.1);
    }
    #chat-main { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; background: #000; }
    
    #chat-header {
        padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08);
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(5,5,5,0.9); backdrop-filter: blur(25px); z-index: 10;
    }
    #chat-hdr-left { display: flex; align-items: center; gap: 12px; }
    #chat-hdr-logo { width: 30px; height: 30px; object-fit: contain; border-radius: 8px; background: #fff; padding: 4px; }
    #chat-hdr-name { font-weight: 700; font-size: 1.15rem; color: #fff; letter-spacing: -0.02em; }
    
    .chat-hdr-btn {
        width: 36px; height: 36px; border-radius: 10px; border: none;
        background: transparent; color: #888;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s;
    }
    .chat-hdr-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .chat-hdr-btn svg { width: 20px; height: 20px; stroke-width: 2.25; }

    #chat-button {
        position: fixed; bottom: 30px; right: 30px; z-index: 10000;
        width: 62px; height: 62px; border-radius: 50%;
        background: #fff; color: #000; display: flex; align-items: center; justify-content: center;
        cursor: pointer; box-shadow: 0 10px 40px rgba(0,0,0,0.3); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        border: 2px solid #000;
    }
    #chat-button:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 15px 50px rgba(0,0,0,0.4); }
    #chat-button svg { width: 26px; height: 26px; }

    #chat-messages {
        flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px;
        background: #000000; scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch; touch-action: pan-y; overscroll-behavior-y: contain;
    }
    .chat-message { max-width: 85%; display: flex; flex-direction: column; gap: 6px; }
    .cm-user { align-self: flex-end; }
    .cm-ai { align-self: flex-start; width: 100%; position: relative; }
    
    .cm-user-bubble {
        background: #fff; color: #000; padding: 14px 22px; border-radius: 24px 24px 4px 24px;
        font-size: 0.95rem; line-height: 1.5; font-weight: 500; box-shadow: 0 10px 30px rgba(255,255,255,0.05);
    }
    .cm-ai-bubble { background: transparent; color: #eee; padding: 0; border: none; font-size: 0.95rem; line-height: 1.6; }
    .cm-ai-text { word-break: break-word; color: #e0e0e0; }
    .cm-ai-text p { margin-bottom: 12px; }
    
    #chat-footer {
        padding: 16px 24px 24px;
        background: rgba(5,5,5,0.95); border-top: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(25px);
    }
    
    #suggestion-chips { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
    #suggestion-chips::-webkit-scrollbar { display: none; }
    .chip {
        padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 100px; color: #aaa; font-size: 0.8rem; font-weight: 500;
        cursor: pointer; transition: all 0.2s; white-space: nowrap;
    }
    .chip:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); color: #fff; transform: translateY(-1px); }

    #chat-input-container {
        position: relative; background: #0a0a0a;
        border: 1px solid rgba(255,255,255,0.1); border-radius: 22px;
        padding: 14px 18px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex; flex-direction: column; gap: 10px;
    }
    #chat-input-container:focus-within { border-color: rgba(255,255,255,0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    
    #chat-user-input {
        width: 100%; background: transparent; border: none; color: #fff;
        font-size: 0.95rem; line-height: 1.5; resize: none; max-height: 150px;
        padding: 4px 0; outline: none; font-family: inherit;
    }
    #chat-user-input::placeholder { color: #444; }

    #chat-pill-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
    .pill-btn {
        display: flex; align-items: center; gap: 6px; padding: 6px 14px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 100px; color: #999; font-size: 0.75rem; font-weight: 600;
        cursor: pointer; transition: all 0.2s;
    }
    .pill-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .pill-btn.active { background: #fff; color: #000; border-color: #fff; }

    .io-actions { display: flex; align-items: center; gap: 12px; }
    .io-btn { background: transparent; border: none; color: #666; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; padding: 4px; }
    .io-btn:hover { color: #fff; transform: scale(1.1); }
    
    .send-pill-btn {
        width: 36px; height: 36px; border-radius: 50% !important;
        background: #fff !important; color: #000 !important; display: flex !important;
        align-items: center; justify-content: center; border: none; cursor: pointer; transition: all 0.2s;
    }
    .send-pill-btn:hover { transform: scale(1.1); background: #eee !important; }

    #chat-disclaimer { font-size: 0.65rem; color: #333; text-align: center; margin-top: 14px; }

    /* Image Modal Glitch Fix */
    #khan-image-modal { 
        position: fixed; inset: 0; z-index: 100002; display: none; 
        align-items: center; justify-content: center; background: rgba(0,0,0,0.95);
        backdrop-filter: blur(20px); animation: fadeIn 0.3s ease;
    }
    #khan-image-modal.show { display: flex; }
    #kim-img { max-width: 90%; max-height: 80%; border-radius: 12px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); }
    .kim-close-btn { 
        position: absolute; top: 30px; right: 30px; background: rgba(255,255,255,0.1); 
        border: none; color: #fff; width: 50px; height: 50px; border-radius: 50%;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: all 0.3s;
    }
    .kim-close-btn:hover { background: rgba(255,255,255,0.2); transform: rotate(90deg); }

    /* Mobile Adaptations - FULL SCREEN FORCED */
    @media (max-width: 480px) {
        #chat-interface { 
            right: 0 !important; 
            bottom: 0 !important; 
            width: 100% !important; 
            height: 100% !important; 
            max-width: 100% !important; 
            max-height: 100% !important; 
            border-radius: 0 !important; 
            border: none !important;
            z-index: 200000 !important;
        }
        #chat-header { padding: 18px 20px; }
        #chat-button { bottom: 20px; right: 20px; }
        #chat-messages { padding: 20px; }
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
            document.head.appendChild(script);
        });
    }

    // Initialize scripts with cache busting
    const v = new Date().getTime();
    loadScript('config.js?v=' + v, 'config-js')
        .then(() => loadScript('khan-logic.js?v=' + v, 'logic-js'))
        .catch(err => console.error('Failed to load Khan AI scripts:', err));

})();
