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

    <div id="golive-overlay">
        <div id="gl-display">
            <div id="gl-video-container">
                <video id="gl-video" autoplay playsinline muted></video>
                <div id="gl-logo-static">
                    <img src="assets/Khan AI logo.png" alt="Khan AI">
                </div>
            </div>
            <div id="gl-pulsar"></div>
            <div id="gl-status-pill">Ready to talk</div>
        </div>
        <div id="gl-content">
            <div id="gl-transcript-msg">Your conversation will appear here.</div>
        </div>
        <div id="gl-vis-container">
            <canvas id="gl-visualizer"></canvas>
        </div>
        <div id="gl-controls">
            <button id="gl-mic-btn" class="gl-btn" title="Toggle Mic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
            <button id="gl-camera-btn" class="gl-btn" title="Toggle Camera">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            </button>
            <button id="gl-switch-btn" class="gl-btn" style="display:none;" title="Switch Camera">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
            <div id="gl-timer-pill">00:00</div>
            <button id="gl-close-btn" class="gl-btn gl-danger" title="End Call">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    </div>

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

    /* LISTENING STATE */
    #voice-input-btn.listening {
        color: #ef4444;
        animation: micPulse 1.5s infinite ease-in-out;
    }
    @keyframes micPulse {
        0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(239, 68, 68, 0)); }
        50% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6)); }
        100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(239, 68, 68, 0)); }
    }

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

    /* PREMIUM MESSAGE ACTIONS */
    .cm-actions {
        display: flex;
        gap: 6px;
        margin-top: 10px;
        opacity: 0.4;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cm-ai:hover .cm-actions {
        opacity: 1;
    }
    .cma-btn {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #777;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.25s;
        backdrop-filter: blur(4px);
    }
    .cma-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .cma-btn svg { width: 14px; height: 14px; stroke-width: 2.5; }
    
    .cma-btn.success {
        color: #10b981 !important;
        border-color: rgba(16, 185, 129, 0.4) !important;
        background: rgba(16, 185, 129, 0.1) !important;
    }

    .live-call-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 10px;
        background: rgba(34, 197, 94, 0.12);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.25);
        border-radius: 100px;
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 10px;
        box-shadow: 0 2px 10px rgba(34, 197, 94, 0.1);
    }
    .live-call-badge svg { width: 10px; height: 10px; stroke-width: 3.5; }

    .live-session-sep {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px 0;
        position: relative;
    }
    .live-session-sep::before {
        content: '';
        position: absolute;
        left: 20px; right: 20px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        z-index: 0;
    }
    .live-session-sep span {
        background: #000;
        padding: 6px 18px;
        border-radius: 100px;
        border: 1px solid rgba(255,255,255,0.15);
        font-size: 0.72rem;
        font-weight: 700;
        color: #777;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .live-session-sep span svg { color: #22c55e; filter: drop-shadow(0 0 5px #22c55e); }

    /* GO LIVE OVERLAY PREMIUM STYLES */
    #golive-overlay {
        position: fixed; inset: 0; z-index: 200001;
        background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
        display: none; flex-direction: column; align-items: center; justify-content: center;
        padding: 40px 20px;
        animation: glFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #golive-overlay.show { display: flex; }
    @keyframes glFadeIn { from { opacity: 0; transform: scale(1.05); filter: blur(20px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }

    #gl-display { position: relative; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; }
    #gl-video-container {
        width: 180px; height: 180px; border-radius: 50%; overflow: hidden;
        border: 4px solid rgba(255,255,255,0.1); box-shadow: 0 0 50px rgba(0,0,0,0.5);
        background: #000; position: relative;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .gl-camera-active #gl-video-container { width: 300px; height: 225px; border-radius: 24px; border-color: rgba(255,255,255,0.2); }
    
    #gl-video { width: 100%; height: 100%; object-fit: cover; display: none; }
    #gl-logo-static { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 40px; }
    #gl-logo-static img { width: 100%; height: 100%; object-fit: contain; }
    .gl-camera-active #gl-logo-static { display: none; }

    #gl-pulsar {
        position: absolute; inset: -20px; border-radius: 50%;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
        z-index: -1; animation: glPulse 2s infinite;
    }
    @keyframes glPulse { 0% { transform: scale(0.9); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.2; } 100% { transform: scale(0.9); opacity: 0.5; } }

    #gl-status-pill {
        margin-top: 20px; padding: 6px 16px; background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1); border-radius: 100px;
        font-size: 0.75rem; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.1em;
    }

    #gl-content {
        flex: 1; width: 100%; max-width: 500px; overflow-y: auto;
        padding: 20px; display: flex; flex-direction: column;
        scrollbar-width: none; mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    }
    #gl-content::-webkit-scrollbar { display: none; }
    #gl-transcript-msg { margin: auto; color: #444; font-style: italic; text-align: center; font-size: 0.9rem; }

    .gl-msg {
        margin-bottom: 12px; padding: 12px 18px; border-radius: 20px; max-width: 85%;
        font-size: 0.95rem; line-height: 1.5; animation: glMsgFade 0.3s ease;
    }
    @keyframes glMsgFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    #gl-vis-container { width: 100%; height: 60px; margin: 20px 0; display: flex; align-items: center; justify-content: center; }
    #gl-visualizer { width: 280px; height: 100%; }

    #gl-controls {
        display: flex; align-items: center; gap: 20px; padding-bottom: 40px;
    }
    .gl-btn {
        width: 64px; height: 64px; border-radius: 50%; border: none;
        background: rgba(255,255,255,0.08); color: #fff;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s;
    }
    .gl-btn:hover { background: rgba(255,255,255,0.15); transform: scale(1.05); }
    .gl-btn:active { transform: scale(0.95); }
    .gl-btn.active { background: #22c55e; color: #000; box-shadow: 0 0 30px rgba(34, 197, 94, 0.4); }
    .gl-btn.gl-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
    .gl-btn.gl-danger:hover { background: #ef4444; color: #fff; box-shadow: 0 0 30px rgba(239, 68, 68, 0.4); }

    #gl-timer-pill {
        padding: 10px 20px; background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1); border-radius: 100px;
        color: #fff; font-family: monospace; font-size: 1.1rem; font-weight: 700;
    }

    @media (max-width: 480px) {
        .gl-camera-active #gl-video-container { width: 100%; height: 260px; border-radius: 0; border: none; position: fixed; top: 0; left: 0; z-index: -1; }
        .gl-camera-active #gl-display { margin-bottom: 200px; }
        #gl-controls { gap: 12px; width: 100%; justify-content: center; }
        .gl-btn { width: 56px; height: 56px; }
        #gl-timer-pill { padding: 8px 16px; font-size: 0.9rem; }
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
        .then(() => loadScript('khan-logic-v45.js?v=' + v, 'logic-js'))
        .catch(err => console.error('Failed to load Khan AI scripts:', err));

})();
