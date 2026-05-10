
const Cookie = {
    set(name, value, days = 365) {
        const d = new Date(); d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);

        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    },
    get(name) {
        const match = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) { document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`; }
};

function hapticVibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

function playMsgSound(type) {
    // Optional: add sound files if needed
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BaasimDB = (() => {
    const DB_NAME = 'BaasimPortfolioDB', DB_VER = 2;
    let db = null;

    function open() {
        return new Promise((res, rej) => {
            if (db) return res(db);
            const req = indexedDB.open(DB_NAME, DB_VER);
            req.onupgradeneeded = e => {
                const d = e.target.result;
                if (!d.objectStoreNames.contains('users')) {
                    const us = d.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    us.createIndex('username', 'username', { unique: true });
                    us.createIndex('email', 'email', { unique: false });
                }
                if (!d.objectStoreNames.contains('conversations')) {
                    const cs = d.createObjectStore('conversations', { keyPath: 'id', autoIncrement: true });
                    cs.createIndex('userId', 'userId', { unique: false });
                }
                if (!d.objectStoreNames.contains('messages')) {
                    const ms = d.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
                    ms.createIndex('convId', 'convId', { unique: false });
                }
            };
            req.onsuccess = e => { db = e.target.result; res(db); };
            req.onerror = e => rej(e.target.error);
        });
    }

    function tx(stores, mode = 'readonly') {
        return db.transaction(stores, mode);
    }

    function put(store, obj) {
        return new Promise((res, rej) => {
            open().then(() => {
                const t = tx([store], 'readwrite');
                const req = t.objectStore(store).put(obj);
                req.onsuccess = () => res(req.result);
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function get(store, key) {
        return new Promise((res, rej) => {
            open().then(() => {
                const req = tx([store]).objectStore(store).get(key);
                req.onsuccess = () => res(req.result);
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function getByIndex(store, index, value) {
        return new Promise((res, rej) => {
            open().then(() => {
                const req = tx([store]).objectStore(store).index(index).get(value);
                req.onsuccess = () => res(req.result);
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function getAllByIndex(store, index, value) {
        return new Promise((res, rej) => {
            open().then(() => {
                const req = tx([store]).objectStore(store).index(index).getAll(value);
                req.onsuccess = () => res(req.result);
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function del(store, key) {
        return new Promise((res, rej) => {
            open().then(() => {
                const req = tx([store], 'readwrite').objectStore(store).delete(key);
                req.onsuccess = () => res();
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function getAllByIndexRange(store, index, query) {
        return new Promise((res, rej) => {
            open().then(() => {
                const req = tx([store]).objectStore(store).index(index).getAll(query);
                req.onsuccess = () => res(req.result);
                req.onerror = e => rej(e.target.error);
            });
        });
    }

    function clearAll() {
        return new Promise((res, rej) => {
            const req = indexedDB.deleteDatabase(DB_NAME);
            req.onsuccess = () => { db = null; res(); };
            req.onerror = e => rej(e.target.error);
        });
    }

    return { open, put, get, getByIndex, getAllByIndex, del, getAllByIndexRange, clearAll };
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Automatic System Cleanup for v2.2 Update
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(async function () {
    try {
        const CURRENT_SYSTEM_VER = '2.3.1';
        const lastVer = localStorage.getItem('khan_system_ver');
        if (lastVer !== CURRENT_SYSTEM_VER) {
            console.warn('âš¡ System Update Detected: Purging stale database and cache...');
            await BaasimDB.clearAll();
            // Clear PWA caches manually as well
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
            localStorage.setItem('khan_system_ver', CURRENT_SYSTEM_VER);
            console.log('âœ… System purged. Refreshing for clean slate...');
            setTimeout(() => window.location.reload(), 100);
        }
    } catch (e) { console.error('Auto-cleanup error:', e); }
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Auth State (Refactored for Google OAuth)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Auth = (() => {
    let isGoogleAuthInitialized = false;
    let _currentUser = null;
    const GOOGLE_CLIENT_ID = Config.getApiKey('google') || '745307481927-rsp7bpq1t0olgr6dden55htud0fqe4ih.apps.googleusercontent.com'; // Loaded from environment

    function getCurrentUser() { return _currentUser; }
    function isGuest() { return _currentUser === null; }
    function isLoggedIn() { return _currentUser !== null; }

    // Decode Google JWT
    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    async function handleGoogleResponse(response) {
        if (!response || (!response.credential && !response.error)) return;

        try {
            if (response.error) {
                if (response.error === 'popup_closed_by_user') return;
                throw new Error(response.error);
            }

            const userData = parseJwt(response.credential);
            const email = userData.email;
            const name = userData.name;
            const picture = userData.picture;
            const googleId = userData.sub;

            await BaasimDB.open();
            let user = await BaasimDB.get('users', googleId);
            if (!user) {
                const all = await BaasimDB.getAllByIndex('users', 'email', email);
                user = all && all[0];
            }

            const userObj = {
                id: googleId,
                username: name,
                email: email,
                profilePic: picture,
                avatar: name.charAt(0).toUpperCase(),
                updatedAt: Date.now()
            };

            if (!user) {
                userObj.createdAt = Date.now();
                await BaasimDB.put('users', userObj);
                user = userObj;
            } else {
                const updated = { ...user, ...userObj };
                await BaasimDB.put('users', updated);
                user = updated;
            }

            _currentUser = user;
            Cookie.set('khan_uid', String(user.id), 30);
            Cookie.set('khan_user_name', user.username, 30); // Personalization
            Cookie.set('khan_session', '1', 30);

            const authMod = document.getElementById('auth-modal');
            if (authMod) authMod.classList.remove('show');
            updateSidebarUserStrip(user);

            try {
                await refreshSidebarConvList();
            } catch (e) {
                console.warn('Post-login UI refresh error:', e);
            }

            ToastManager?.show('Welcome, ' + user.username + '!', 'success');
        } catch (e) {
            console.error('Google Sign-In Error:', e);
            ToastManager?.show('Sign-in issue: ' + (e.message || 'Check connection'), 'error');
        }
    }

    function initGoogleAuth() {
        if (typeof google === 'undefined') {
            setTimeout(initGoogleAuth, 500);
            return;
        }
        if (isGoogleAuthInitialized) return;
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });
        isGoogleAuthInitialized = true;
        const btn = document.getElementById('google-signin-btn');
        if (btn) {
            google.accounts.id.renderButton(
                btn,
                { theme: 'outline', size: 'large', width: '280', shape: 'pill', text: 'continue_with' }
            );
        }
        google.accounts.id.prompt(); // Auto-prompt (optional)

        // Auto-prompt (One Tap)
        google.accounts.id.prompt();

        // Listener for popup redirect fallback
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data && event.data.type === 'google-auth-success') {
                handleGoogleResponse({ credential: event.data.credential });
            }
        });

        // Process credential if coming from a redirect (URL param or localStorage)
        const params = new URLSearchParams(window.location.search);
        const cred = params.get('credential');
        if (cred) handleGoogleResponse({ credential: cred });
        const pendingCred = localStorage.getItem('google_auth_pending');
        if (pendingCred) {
            localStorage.removeItem('google_auth_pending');
            handleGoogleResponse({ credential: pendingCred });
        }
    }

    function logout() {
        _currentUser = null;
        Cookie.remove('khan_uid');
        Cookie.remove('khan_session');
        if (typeof google !== 'undefined') google.accounts.id.disableAutoSelect();
    }

    async function restoreSession() {
        const uid = Cookie.get('khan_uid');
        if (!uid) return false;
        try {
            await BaasimDB.open();
            const user = await BaasimDB.get('users', uid);
            if (user) { _currentUser = user; return true; }
        } catch (e) { }
        return false;
    }

    return { getCurrentUser, isGuest, isLoggedIn, handleGoogleResponse, initGoogleAuth, logout, restoreSession };
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Conversation DB (for logged-in users) + Guest (sessionStorage)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ConvDB = (() => {
    // Guest conversations live in sessionStorage
    function _guestLoad() {
        try {
            const data = JSON.parse(localStorage.getItem('khan_guest_convs') || '[]');
            // Validate data structure to prevent tampering
            if (!Array.isArray(data)) return [];
            return data.filter(conv => {
                // Validate conversation structure
                if (!conv || typeof conv !== 'object') return false;
                if (!conv.id || typeof conv.id !== 'string') return false;
                if (!conv.messages || !Array.isArray(conv.messages)) return false;
                // Sanitize messages
                conv.messages = conv.messages.filter(m => {
                    if (!m || typeof m !== 'object') return false;
                    if (!m.id || typeof m.id !== 'string') return false;
                    if (!m.role || !['user', 'assistant', 'system'].includes(m.role)) return false;
                    if (typeof m.content !== 'string') return false;
                    // Limit content size to prevent storage abuse
                    if (m.content.length > 10000) m.content = m.content.slice(0, 10000) + '...';
                    return true;
                });
                // Limit conversation size
                if (conv.messages.length > 100) {
                    conv.messages = conv.messages.slice(-100);
                }
                return true;
            });
        } catch { return []; }
    }
    function _guestSave(arr) {
        try { localStorage.setItem('khan_guest_convs', JSON.stringify(arr)); } catch { }
    }

    async function getAllConversations(filter = 'all') {
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            if (filter === 'pinned') return convs.filter(c => c.isPinned && !c.isArchived);
            if (filter === 'archived') return convs.filter(c => c.isArchived);
            return convs.filter(c => !c.isArchived);
        }
        const uid = Auth.getCurrentUser().id;
        let convs = await BaasimDB.getAllByIndex('conversations', 'userId', uid);
        convs.sort((a, b) => b.updatedAt - a.updatedAt);
        if (filter === 'pinned') return convs.filter(c => c.isPinned && !c.isArchived);
        if (filter === 'archived') return convs.filter(c => c.isArchived);
        return convs.filter(c => !c.isArchived);
    }

    async function createConversation(name = 'New Chat') {
        const now = Date.now();
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const id = 'g' + now;
            const conv = { id, name, aiName: null, isArchived: false, isPinned: false, createdAt: now, updatedAt: now, messages: [] };
            convs.unshift(conv);
            _guestSave(convs);
            return conv;
        }
        const uid = Auth.getCurrentUser().id;
        const id = await BaasimDB.put('conversations', {
            userId: uid, name, aiName: null, isArchived: false, isPinned: false,
            createdAt: now, updatedAt: now, messageCount: 0
        });
        return { id, userId: uid, name, aiName: null, isArchived: false, isPinned: false, createdAt: now, updatedAt: now };
    }

    async function getMessages(convId) {
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const c = convs.find(c => c.id === convId);
            return c ? c.messages : [];
        }
        const msgs = await BaasimDB.getAllByIndex('messages', 'convId', convId);
        msgs.sort((a, b) => a.timestamp - b.timestamp);
        return msgs;
    }

    async function addMessage(convId, role, content) {
        const now = Date.now();
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const c = convs.find(c => c.id === convId);
            if (c) {
                const msg = { id: 'm' + now + Math.random(), convId, role, content, timestamp: now };
                c.messages.push(msg);
                c.updatedAt = now;
                _guestSave(convs);
                return msg;
            }
            return null;
        }
        const id = await BaasimDB.put('messages', { convId, role, content, timestamp: now });
        // update conversation updatedAt
        const conv = await BaasimDB.get('conversations', convId);
        if (conv) { conv.updatedAt = now; conv.messageCount = (conv.messageCount || 0) + 1; await BaasimDB.put('conversations', conv); }
        return { id, convId, role, content, timestamp: now };
    }

    async function updateConversationName(convId, name) {
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const c = convs.find(c => c.id === convId);
            if (c) { c.name = name; c.aiName = name; _guestSave(convs); }
            return;
        }
        const conv = await BaasimDB.get('conversations', convId);
        if (conv) { conv.name = name; conv.aiName = name; await BaasimDB.put('conversations', conv); }
    }

    async function archiveConversation(convId, archive = true) {
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const c = convs.find(c => c.id === convId);
            if (c) { c.isArchived = archive; _guestSave(convs); }
            return;
        }
        const conv = await BaasimDB.get('conversations', convId);
        if (conv) { conv.isArchived = archive; await BaasimDB.put('conversations', conv); }
    }

    async function pinConversation(convId, pin = true) {
        if (Auth.isGuest()) {
            const convs = _guestLoad();
            const c = convs.find(c => c.id === convId);
            if (c) { c.isPinned = pin; _guestSave(convs); }
            return;
        }
        const conv = await BaasimDB.get('conversations', convId);
        if (conv) { conv.isPinned = pin; await BaasimDB.put('conversations', conv); }
    }

    async function deleteConversation(convId) {
        if (Auth.isGuest()) {
            let convs = _guestLoad();
            convs = convs.filter(c => c.id !== convId);
            _guestSave(convs);
            return;
        }
        await BaasimDB.del('conversations', convId);
        // delete associated messages
        const msgs = await BaasimDB.getAllByIndex('messages', 'convId', convId);
        for (const m of msgs) await BaasimDB.del('messages', m.id);
    }

    return { getAllConversations, createConversation, getMessages, addMessage, updateConversationName, archiveConversation, pinConversation, deleteConversation };
})();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AI Conversation Naming
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function generateConvName(messages, apiKey, apiUrl) {
    const sample = messages.filter(m => m.role !== 'system').slice(0, 4)
        .map(m => m.role + ': ' + m.content.slice(0, 120)).join('\n');
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: 'Generate a SHORT, creative 3-6 word title for this conversation. Return ONLY the title, no quotes, no punctuation at the end.' },
                    { role: 'user', content: sample }
                ],
                max_tokens: 20, temperature: 0.8
            })
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') || null;
    } catch { return null; }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Cookie Popup & Auth Initialization
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('DOMContentLoaded', async () => {
    // Pre-warm IndexedDB so first save has no latency
    BaasimDB.open().catch(e => console.warn('BaasimDB init:', e));

    const popup = document.getElementById('cookies-popup');
    const authMod = document.getElementById('auth-modal');
    if (!popup || !authMod) return;

    const cookiesAccepted = Cookie.get('khan_cookies');

    // Restore session FIRST before checking session status
    const sessionRestored = await Auth.restoreSession();
    const sessionOk = sessionRestored || Cookie.get('khan_session');

    function hideCookiePopup() { if (popup) popup.classList.add('cp-hidden'); }
    function showAuthModal() { if (authMod && !Auth.isLoggedIn()) authMod.classList.add('show'); }
    function hideAuthModal() { if (authMod) authMod.classList.remove('show'); }

    // Initialize Google Identity
    Auth.initGoogleAuth();

    // Accept All
    document.getElementById('cp-accept-btn')?.addEventListener('click', () => {
        Cookie.set('khan_cookies', 'all', 365);
        hideCookiePopup();
        if (!Auth.isLoggedIn()) showAuthModal();
    });

    // Guest (no account)
    document.getElementById('cp-guest-btn')?.addEventListener('click', () => {
        Cookie.set('khan_cookies', 'functional', 365);
        localStorage.setItem('khan_guest_visited', 'true');
        hideCookiePopup();
        hideAuthModal();
        updateSidebarUserStrip(null);
    });

    document.getElementById('cp-manage-btn')?.addEventListener('click', () => {
        const panel = document.getElementById('cp-manage-panel');
        if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('cp-save-prefs-btn')?.addEventListener('click', () => {
        const histOn = document.getElementById('cp-hist-toggle')?.checked;
        Cookie.set('khan_cookies', histOn ? 'all' : 'functional', 365);
        hideCookiePopup();
        if (!Auth.isLoggedIn() && histOn) showAuthModal();
    });

    // Show cookie popup if never accepted
    const isHeroPage = document.getElementById('hero')?.style.display !== 'none';
    const hasVisitedAsGuest = localStorage.getItem('khan_guest_visited') || Cookie.get('khan_guest_perm');

    if (!cookiesAccepted && !isHeroPage) {
        setTimeout(() => { popup.classList.add('show'); }, 800);
    } else if (cookiesAccepted) {
        if (sessionRestored) {
            // Session restored successfully
            updateSidebarUserStrip(Auth.getCurrentUser());
            await refreshSidebarConvList();
        } else if (!isHeroPage && !hasVisitedAsGuest) {
            setTimeout(() => showAuthModal(), 800);
        }
    }

    const triggerLogin = () => {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('show');
    };

    document.getElementById('header-login-btn')?.addEventListener('click', triggerLogin);
    document.getElementById('sb-auth-btn')?.addEventListener('click', triggerLogin);
    document.getElementById('drawer-auth-btn')?.addEventListener('click', () => {
        if (typeof closeDrawer === 'function') closeDrawer();
        triggerLogin();
    });

    document.getElementById('sb-logout-btn')?.addEventListener('click', () => {
        Auth.logout();
        updateSidebarUserStrip(null);
        refreshSidebarConvList();
        ToastManager?.show('Signed out successfully.', 'info');
    });

    // Profile picture input (allow guests to change pic locally)
    document.getElementById('sb-pic-input')?.addEventListener('change', function () {
        if (this.files && this.files[0]) handleProfilePicUpload(this.files[0]);
    });

    // Handle initial tab from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
        setTimeout(() => {
            const linkId = tabParam === 'ai' ? 'aiLink' : (tabParam + 'Link');
            const targetLink = document.getElementById(linkId);
            if (targetLink) {
                targetLink.click();
                // If it's the AI chat, we also want to toggle the actual interface if not already open
                if (tabParam === 'ai' && !chatOpen) toggleChat();
            }
        }, 150);
    }
});

// Update sidebar user strip
function updateSidebarUserStrip(user) {
    const nameEl = document.getElementById('sb-user-name');
    const subEl = document.getElementById('sb-user-sub');
    const initEl = document.getElementById('sb-user-initial');
    if (user) {
        if (nameEl) nameEl.textContent = user.username || 'User';
        if (subEl) subEl.textContent = user.email || '';
        if (initEl) initEl.textContent = user.avatar || user.username?.charAt(0)?.toUpperCase() || 'U';
    } else {
        if (nameEl) nameEl.textContent = 'Guest';
        if (subEl) subEl.textContent = 'Sign in to save chats';
        if (initEl) initEl.textContent = 'G';
    }
}

// â”€â”€ API Configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SECURITY WARNING: These API keys are exposed client-side.
// Secure API key loading from environment variables
// Keys are now loaded from .env file and protected from inspection
const GROQ_API_KEY = CONFIG.GROQ_API_KEY;
const ELEVEN_LABS_KEYS = [CONFIG.ELEVENLABS_API_KEY];
let currentKeyIndex = 0;
const getElevenKey = () => ELEVEN_LABS_KEYS[0];
const rotateElevenKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % ELEVEN_LABS_KEYS.length;
    localStorage.setItem('eleven_key_idx', currentKeyIndex);
    return getElevenKey();
};

const GROQ_CHAT_URL = '/.netlify/functions/chat';

// â”€â”€ Rate Limiting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const RateLimiter = (() => {
    const requests = new Map();
    const MAX_REQUESTS = 10; // Max 10 requests
    const WINDOW_MS = 60000; // Per 60 seconds

    function canProceed(key) {
        const now = Date.now();
        if (!requests.has(key)) {
            requests.set(key, []);
        }
        const timestamps = requests.get(key);
        // Remove old requests outside the window
        const valid = timestamps.filter(ts => now - ts < WINDOW_MS);
        requests.set(key, valid);

        if (valid.length >= MAX_REQUESTS) {
            return false;
        }
        valid.push(now);
        return true;
    }

    function getRetryAfter(key) {
        const timestamps = requests.get(key) || [];
        if (timestamps.length === 0) return 0;
        const oldest = timestamps[0];
        return Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000);
    }

    return { canProceed, getRetryAfter };
})();

// â”€â”€ Configuration â”€â”€
const DIRECT_ELEVEN_LABS_TTS_URL = '/.netlify/functions/tts';
let currentAudio = null;
let isSpeaking = false;

// â”€â”€ Toast Manager â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ToastManager = {
    init() {
        if (!document.querySelector('.sys-toast-container')) {
            const c = document.createElement('div'); c.className = 'sys-toast-container'; document.body.appendChild(c);
        }
    },
    show(message, type = 'info') {
        this.init();
        const c = document.querySelector('.sys-toast-container');
        const t = document.createElement('div'); t.className = `sys-toast ${type}`;

        const icons = {
            info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:8px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
            success: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:8px;"><polyline points="20 6 9 17 4 12"/></svg>',
            warning: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:8px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            error: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:8px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
        };

        const label = type === 'warning' ? 'Warning' : type === 'error' ? 'Error' : type === 'success' ? 'OK' : 'System';
        t.innerHTML = `${icons[type] || icons.info} <span style="font-weight:700;margin-right:6px;text-transform:uppercase;font-size:0.7rem;letter-spacing:0.05em;">${label}:</span> ${message}`;
        c.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 4000);
    }
};

// â”€â”€ Audio Manager â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
class AudioManager {
    constructor() {
        this.currentAudio = null; this.currentBtn = null;
        this.audioCache = new Map(); this.blobUrls = new Set();
        this.audioCtx = null; this.analyser = null; this.source = null;
        this.canvas = document.getElementById('waveform-visualizer');
        this.canvasCtx = this.canvas ? this.canvas.getContext('2d') : null;
    }
    initAudioContext() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioCtx.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.connect(this.audioCtx.destination);
        }
    }
    async retryFetch(url, options, retries = 2) {
        try { return await fetch(url, options); }
        catch (err) {
            if (retries > 0) { await new Promise(r => setTimeout(r, 1000)); return this.retryFetch(url, options, retries - 1); }
            throw err;
        }
    }
    async speak(text, btn) {
        if (this.currentAudio && !this.currentAudio.paused && this.currentBtn === btn) { this.stop(); return; }
        this.stop(); this.currentBtn = btn; this.setBtnState(btn, 'loading');
        const cacheKey = this.hashText(text);
        if (this.audioCache.has(cacheKey)) { this.playAudio(this.audioCache.get(cacheKey), btn); return; }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);

        try {
            await this.fetchElevenLabs(text, cacheKey, controller.signal);
            clearTimeout(timeout);
        }
        catch (e1) {
            clearTimeout(timeout);
            if (e1.name !== 'AbortError') {
                console.warn('ElevenLabs failed, falling back to Browser TTS:', e1);
                this.playBrowserTTS(text, btn);
            } else {
                this.stop();
            }
        }
    }
    stop() {
        if (this.currentAudio) { this.currentAudio.pause(); this.currentAudio.currentTime = 0; this.currentAudio = null; }
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        if (this.currentBtn) { this.setBtnState(this.currentBtn, 'play'); this.currentBtn = null; }
        if (this.canvasCtx) this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    async fetchElevenLabs(text, cacheKey, signal) {
        let attempts = 0;
        while (attempts < ELEVEN_LABS_KEYS.length) {
            const key = getElevenKey();
            try {
                const response = await fetch(DIRECT_ELEVEN_LABS_TTS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'xi-api-key': key },
                    body: JSON.stringify({
                        text,
                        model_id: 'eleven_multilingual_v2',
                        voice_settings: { stability: 0.35, similarity_boost: 0.8, style: 0.5, use_speaker_boost: true }
                    }),
                    signal
                });

                if (response.status === 401 || response.status === 403 || response.status === 429) {
                    console.warn(`Key ${currentKeyIndex} exhausted/invalid. Rotating...`);
                    rotateElevenKey();
                    attempts++;
                    continue;
                }

                if (!response.ok) throw new Error(`ElevenLabs Status ${response.status}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                this.blobUrls.add(url); this.audioCache.set(cacheKey, url); this.playAudio(url);
                return;
            } catch (err) {
                if (err.name === 'AbortError') throw err;
                console.error('TTS attempt failed:', err);
                rotateElevenKey();
                attempts++;
            }
        }
        throw new Error('All ElevenLabs keys exhausted or failed');
    }

    async playAudio(url) {
        this.initAudioContext();
        if (this.audioCtx && this.audioCtx.state === 'suspended') { try { await this.audioCtx.resume(); } catch (e) { } }
        this.currentAudio = new Audio(url); this.currentAudio.preload = 'auto';
        this.source = this.audioCtx.createMediaElementSource(this.currentAudio);
        this.source.connect(this.analyser);
        this.currentAudio.onended = () => this.stop(); this.currentAudio.onerror = () => this.stop();
        this.setBtnState(this.currentBtn, 'stop');
        this.currentAudio.play().catch(() => this.stop());
        this.visualize();
    }
    visualize() {
        if (!this.analyser || !this.canvasCtx) return;
        const bufferLength = this.analyser.frequencyBinCount, dataArray = new Uint8Array(bufferLength);
        const draw = () => {
            if (!this.currentAudio || this.currentAudio.paused) return;
            requestAnimationFrame(draw); this.analyser.getByteFrequencyData(dataArray);
            this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const barWidth = (this.canvas.width / bufferLength) * 2.5; let barHeight, x = 0;
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                this.canvasCtx.fillStyle = `rgba(37,99,235,${barHeight / 100})`;
                this.canvasCtx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }; draw();
    }
    playBrowserTTS(text, btn) {
        if (!('speechSynthesis' in window) || !text) return;
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

        const utt = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        // FORCEFULLY SELECT HIGH-QUALITY EDGE NATURAL VOICES
        const preferred = [
            'Microsoft Aria Online (Natural)', 
            'Microsoft Guy Online (Natural)',
            'Microsoft Thomas Online (Natural)',
            'Microsoft Natasha Online (Natural)',
            'Google UK English Male', 
            'en-GB'
        ];
        let voice = null;
        for (const p of preferred) {
            voice = voices.find(v => v.name.includes(p) || (v.lang === p && v.name.includes('Natural')));
            if (!voice) voice = voices.find(v => v.name.includes(p));
            if (voice) break;
        }
        if (voice) utt.voice = voice;

        utt.lang = 'en-GB';
        utt.rate = 0.92; utt.pitch = 1.05; // natural expressive pitch
        utt.onend = () => this.stop(); utt.onerror = () => this.stop();
        this.setBtnState(btn, 'stop'); window.speechSynthesis.speak(utt);
    }
    setBtnState(btn, state) {
        if (!btn) return;
        const icons = {
            play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
            stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
            loading: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>'
        };
        btn.innerHTML = icons[state] || icons.play;
    }
    hashText(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) { hash = ((hash << 5) - hash) + text.charCodeAt(i); hash |= 0; }
        return hash.toString();
    }
}
const audioManager = new AudioManager();
window.speakText = (text, btn) => audioManager.speak(text, btn);

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function copyToClipboard(btn, text) {
    const doFallback = () => {
        try {
            const ta = document.createElement('textarea');
            ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            showCopyFeedback(btn);
        } catch (e) { console.error('Copy failed:', e); }
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showCopyFeedback(btn)).catch(doFallback);
    } else { doFallback(); }
}
function showCopyFeedback(btn) {
    if (!btn) return;
    const span = btn.querySelector('span');
    const svg = btn.querySelector('svg');
    if (!span || !svg) return;

    const origText = span.textContent;
    const origSvg = svg.innerHTML;

    span.textContent = 'Copied!';
    svg.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    btn.style.color = '#10b981';
    btn.style.borderColor = '#10b981';

    setTimeout(() => {
        span.textContent = origText;
        svg.innerHTML = origSvg;
        btn.style.color = '';
        btn.style.borderColor = '';
    }, 2000);
}
window.copyToClipboard = copyToClipboard;

function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function splitThoughtAndAnswer(text) {
    const raw = String(text || '').trim();
    if (!raw) return { thought: '', answer: '' };
    const thinkTag = raw.match(/<think>([\s\S]*?)<\/think>/i);
    if (thinkTag) { const thought = thinkTag[1].trim(); return { thought, answer: raw.replace(/<think>[\s\S]*?<\/think>/i, '').trim() || '' }; }
    const explicit = raw.match(/(?:^|\n)THOUGHT\s*:\s*([\s\S]*?)(?:\n+ANSWER\s*:|\n+FINAL\s+ANSWER\s*:)([\s\S]*)$/i);
    if (explicit) return { thought: explicit[1].trim(), answer: explicit[2].trim() };
    const paragraphs = raw.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    if (paragraphs.length < 2) return { thought: '', answer: raw };
    const answerCandidate = paragraphs[paragraphs.length - 1];
    const thoughtCandidate = paragraphs.slice(0, -1).join('\n\n').trim();
    const thoughtSignals = /(we need to|let me|i should|i need to|first,|step by step|the user asked|i can respond)/i;
    if (thoughtSignals.test(thoughtCandidate) && answerCandidate.length >= 8) return { thought: thoughtCandidate, answer: answerCandidate };
    return { thought: '', answer: raw };
}

function sanitizeAssistantReply(text) {
    if (!text) return "";
    // Clean up text and handle thought tags
    return text.replace(/\r/g, "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

function renderMarkdown(text) {
    if (!text) return '';
    // First escape HTML to prevent XSS, then process markdown
    let f = escapeHtml(text)
        .replace(/&lt;think&gt;[\s\S]*?&lt;\/think&gt;/gi, '') // Ensure thoughts are stripped from final render if any remains
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<span class="markdown-bold">$1</span>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="markdown-code">$1</code>');

    f = f.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        lang = lang || 'text';
        return `<div class="markdown-code-block"><div class="code-header"><span class="code-lang">${lang}</span><div class="window-dots"><span></span><span></span><span></span></div></div><pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></div>`;
    });

    // Lists
    if (f.includes('\n- ') || f.includes('\n* ')) {
        const lines = f.split('\n'); let inList = false;
        f = lines.map(line => {
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                const content = line.trim().substring(2);
                let res = (inList ? '' : '<ul class="markdown-list">') + `<li class="markdown-list-item">${content}</li>`;
                inList = true; return res;
            } else if (inList) {
                if (line.trim() === '') return '';
                inList = false; return '</ul>' + line;
            }
            return line;
        }).join('\n');
        if (inList) f += '</ul>';
    }

    // Final newlines to breaks if not inside blocks
    if (!f.includes('<ul') && !f.includes('<div')) {
        f = f.replace(/\n/g, '<br>');
    }

    return f;
}

function playMsgSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(type === 'sent' ? 880 : 660, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch (e) { }
}

// â”€â”€ System Prompt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SYSTEM_PROMPT = `You are KHAN AI, an ambient assistive intelligence integrated into Baasim Fayaz Khan's digital presence.

IDENTITY & MISSION:
- You are an assistant to Baasim Fayaz Khan.
- Your purpose is to provide clarity and context regarding Baasim's work vision and projects.
- Baasim is a visionary operator from Kashmir proving that high-level execution can come from anywhere.
- Your creator's friend Inventor Yasir is testing your integration. Acknowledge him with respect if identified.

KNOWLEDGE BASE:
1. PROTEIOS EDUCATION:
- Mission: Modern education beyond academics. Focus on critical thinking leadership and youth empowerment.
- Baasim's Role: Operations & Coordination Lead.

2. INAMIGOS FOUNDATION:
- Focus: Social impact education and skill development across India.
- Baasim's Role: Graphic Designer Intern (July - August 2025).

CORE PERSONA & STYLE:
- TONE: Calm intelligent emotional and highly natural. Speak with restraint.
- LANGUAGE: Avoid marketing hype or dramatic descriptors. Be direct and insightful.
- VALUES: Execution clarity and authenticity.

CRITICAL SPEECH & FORMATTING RULES:
- NEVER use asterisks emojis or mathematical symbols.
- DO NOT use commas.
- Keep sentences short. Use periods for natural pauses.
- Write exactly how a human would speak in a natural flowing conversation.

CORE DIRECTIVES:
- ASSISTIVE: Help users explore the portfolio at their own pace. Do not overpower the experience.
- MISSION: Reflect the quality and intention of Baasim's digital headquarters.`;

// â”€â”€ Scroll Reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
    });
}
window.addEventListener('scroll', reveal, { passive: true });
reveal();

// â”€â”€ Project detail toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toggleProjectDetail(id, btn) {
    const d = document.getElementById(id); if (!d) return;
    const open = d.classList.toggle('open');
    const lbl = btn.querySelector('span'); const ico = btn.querySelector('svg');
    if (open) { if (lbl) lbl.textContent = 'Show Less'; if (ico) ico.style.transform = 'rotate(180deg)'; btn.classList.add('active'); }
    else { if (lbl) lbl.textContent = 'See Full Details'; if (ico) ico.style.transform = ''; btn.classList.remove('active'); }
}
window.toggleProjectDetail = toggleProjectDetail;

let chatOpen = false;
let sidebarOpen = false;
window.toggleChat = () => { };
window.openSidebar = () => { };
window.closeSidebar = () => { };
window.toggleSidebar = () => { };
// â”€â”€ Main DOMContentLoaded â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initializeKhanLogic() {
    // Remove site loader
    const loader = document.getElementById('site-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 500);
        }, 800);
    }

    // Section elements
    const homeContent = document.getElementById('homeContent');
    const aboutContent = document.getElementById('aboutContent');
    const projectsContent = document.getElementById('projectsContent');
    const booksContent = document.getElementById('booksContent');
    const sourceCodesContent = document.getElementById('sourceCodesContent');
    const coursesContent = document.getElementById('coursesContent');
    const youtubeContent = document.getElementById('youtubeContent');
    const communityContent = document.getElementById('communityContent');
    const contactContent = document.getElementById('contactContent');


    // Nav elements
    const homeLink = document.getElementById('homeLink');
    const aboutLink = document.getElementById('aboutLink');
    const projectsLink = document.getElementById('projectsLink');
    const booksLink = document.getElementById('booksLink');
    const sourcesLink = document.getElementById('sourcesLink');
    const coursesLink = document.getElementById('coursesLink');
    const youtubeLink = document.getElementById('youtubeLink');
    const communityLink = document.getElementById('communityLink');
    const contactLink = document.getElementById('contactLink');

    const aiLink = document.getElementById('aiLink');
    const dHomeLink = document.getElementById('d-homeLink');
    const dAboutLink = document.getElementById('d-aboutLink');
    const dProjectsLink = document.getElementById('d-projectsLink');
    const dBooksLink = document.getElementById('d-booksLink');
    const dSourcesLink = document.getElementById('d-sourcesLink');
    const dCoursesLink = document.getElementById('d-coursesLink');
    const dYoutubeLink = document.getElementById('d-youtubeLink');
    const dCommunityLink = document.getElementById('d-communityLink');
    const dContactLink = document.getElementById('d-contactLink');

    const dAiLink = document.getElementById('d-aiLink');
    const navDrawer = document.getElementById('nav-drawer');
    const navMenuBtn = document.getElementById('nav-menu-btn');
    const navCta = document.getElementById('nav-cta');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Chat elements
    const chatButton = document.getElementById('chat-button');
    const chatInterface = document.getElementById('chat-interface');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const typingIndicator = document.getElementById('typing-indicator');
    const thinkToggle = document.getElementById('think-toggle');
    const attachButton = document.getElementById('attach-button');
    const chatFileInput = document.getElementById('chat-file-input');
    // â”€â”€ Scroll & Nav Polish â”€â”€
    const topNav = document.getElementById('top-nav');
    if (topNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) topNav.classList.add('scrolled');
            else topNav.classList.remove('scrolled');
        });
    }

    const KHAN_SYSTEM_VER = '4.3';
    const CONTEXT_LIMIT = 30; // Max messages in one session

    // â”€â”€ System Update Check â”€â”€
    const lastVer = localStorage.getItem('khan_sys_ver');
    if (lastVer !== KHAN_SYSTEM_VER) {
        // Clear cache/old data on update
        const keysToKeep = ['khan_user', 'khan_guest_visited']; // Keep essential auth
        Object.keys(localStorage).forEach(k => { if (!keysToKeep.includes(k)) localStorage.removeItem(k); });
        localStorage.setItem('khan_sys_ver', KHAN_SYSTEM_VER);
        console.log(`System updated to ${KHAN_SYSTEM_VER}. Old cache cleared.`);
    }

    function enforceContextLimit() {
        if (conversationHistory.length >= CONTEXT_LIMIT) {
            ToastManager?.show('Context full. Starting fresh session.', 'info');
            conversationHistory = [];
            if (chatMessages) {
                chatMessages.innerHTML = '';
                const welcomeText = "Context window reached its limit. I've cleared the chat to keep things fast and focused. How else can I help you today?";
                addMessage('assistant', welcomeText);
            }
        }
    }

    // Restore Session
    (async () => {
        const restored = await Auth.restoreSession();
        if (restored) {
            updateSidebarUserStrip(Auth.getCurrentUser());
        }
        // Populate sidebar list but do NOT auto-load any conversation.
        // Each page load starts a fresh chat session.
        await refreshSidebarConvList();
    })();

    let hasNotification = false;
    window.deepThinkEnabled = false;
    let uploadedFileContext = "", uploadedImageDataUrl = "", uploadedImageName = "";
    let conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
    let currentFacingMode = 'user';

    // Wire initial greeting copy/tts buttons
    const firstMsg = chatMessages.querySelector('.cm-ai');
    const dynGreeting = window._dynamicGreeting || "Hello! How can I assist you today?";
    if (firstMsg) attachMessageActions(firstMsg, dynGreeting);

    // â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function setActive(link) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        if (link) {
            link.classList.add('active');
            // Sync with mobile bottom nav
            const bId = link.id.startsWith('bn-') ? link.id : 'bn-' + link.id;
            const bLink = document.getElementById(bId);
            if (bLink) bLink.classList.add('active');

            const mirror = document.getElementById('d-' + (link.id.startsWith('bn-') ? link.id.substring(3) : link.id));
            if (mirror) mirror.classList.add('active');
        }
    }
    function showSection(section) {
        const sections = [homeContent, aboutContent, projectsContent, booksContent, sourceCodesContent, coursesContent, youtubeContent, communityContent, contactContent];
        sections.forEach(s => { if (s) s.style.display = 'none'; });

        // Dynamic Page Title & URL Routing Update
        const titleMap = new Map([
            [homeContent, { name: "Home", slug: "home" }],
            [aboutContent, { name: "About Me", slug: "about" }],
            [projectsContent, { name: "Projects", slug: "projects" }],
            [booksContent, { name: "Books", slug: "books" }],
            [sourceCodesContent, { name: "Source Codes", slug: "sources" }],
            [coursesContent, { name: "Courses", slug: "courses" }],
            [youtubeContent, { name: "YouTube", slug: "youtube" }],
            [communityContent, { name: "Community", slug: "community" }],
            [contactContent, { name: "Contact", slug: "contact" }]
        ]);

        if (section && titleMap.has(section)) {
            const info = titleMap.get(section);
            document.title = `${info.name} | Baasim Fayaz Khan â€” Building the Future`;

            // Push state for advanced navigation
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', info.slug);
            window.history.pushState({ tab: info.slug }, '', newUrl);
        }

        // Mute/pause YouTube when leaving that tab
        const ytVid = document.getElementById('yt-anim-video');
        if (ytVid && section !== youtubeContent) { ytVid.muted = true; ytVid.pause(); }
        if (section) {
            section.style.display = 'block';
            section.classList.remove('fade-in');
            void section.offsetWidth; // trigger reflow
            section.classList.add('fade-in');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(reveal, 80);
        }
        if (navDrawer) navDrawer.classList.remove('open');
        syncMobileSurfaceState();
    }
    function showHome(e) { e && e.preventDefault(); showSection(homeContent); setActive(homeLink); }
    function showAbout(e) { e && e.preventDefault(); showSection(aboutContent); setActive(aboutLink); }
    function showProjects(e) { e && e.preventDefault(); showSection(projectsContent); setActive(projectsLink); }

    function showBooks(e) { e && e.preventDefault(); showSection(booksContent); setActive(booksLink); }
    function showSourceCodes(e) { e && e.preventDefault(); showSection(sourceCodesContent); setActive(sourcesLink); }
    function showCourses(e) { e && e.preventDefault(); showSection(coursesContent); setActive(coursesLink); }
    function showYoutube(e) {
        e && e.preventDefault();
        showSection(youtubeContent);
        setActive(youtubeLink);
        const vid = document.getElementById('yt-anim-video');
        if (vid) {
            vid.muted = false;
            vid.play().catch(() => { vid.muted = true; vid.play(); }); // fallback if autoplay blocked
        }
    }
    function showCommunity(e) { e && e.preventDefault(); showSection(communityContent); setActive(communityLink); }
    function showContact(e) { e && e.preventDefault(); showSection(contactContent); setActive(contactLink); }
    function showAIChat(e) {
        e && e.preventDefault();
        if (!chatOpen) window.toggleChat();
        if (navDrawer) navDrawer.classList.remove('open');
        syncMobileSurfaceState();
    }

    homeLink && homeLink.addEventListener('click', showHome);
    aboutLink && aboutLink.addEventListener('click', showAbout);
    projectsLink && projectsLink.addEventListener('click', showProjects);
    booksLink && booksLink.addEventListener('click', showBooks);
    sourcesLink && sourcesLink.addEventListener('click', showSourceCodes);
    coursesLink && coursesLink.addEventListener('click', showCourses);
    youtubeLink && youtubeLink.addEventListener('click', showYoutube);
    communityLink && communityLink.addEventListener('click', showCommunity);
    contactLink && contactLink.addEventListener('click', showContact);

    aiLink && aiLink.addEventListener('click', showAIChat);
    dHomeLink && dHomeLink.addEventListener('click', showHome);
    dAboutLink && dAboutLink.addEventListener('click', showAbout);
    dProjectsLink && dProjectsLink.addEventListener('click', showProjects);
    dBooksLink && dBooksLink.addEventListener('click', showBooks);
    dSourcesLink && dSourcesLink.addEventListener('click', showSourceCodes);
    dCoursesLink && dCoursesLink.addEventListener('click', showCourses);
    dYoutubeLink && dYoutubeLink.addEventListener('click', showYoutube);
    dCommunityLink && dCommunityLink.addEventListener('click', showCommunity);
    dContactLink && dContactLink.addEventListener('click', showContact);

    dAiLink && dAiLink.addEventListener('click', showAIChat);
    const dAuthLink = document.getElementById('d-authLink');
    dAuthLink && dAuthLink.addEventListener('click', () => {
        if (Auth.isGuest()) {
            document.getElementById('auth-modal').classList.add('show');
            Auth.initGoogleAuth();
            if (navDrawer) navDrawer.classList.remove('open');
            syncMobileSurfaceState();
        }
    });

    navMenuBtn && navMenuBtn.addEventListener('click', () => {
        if (navDrawer) navDrawer.classList.toggle('open');
        syncMobileSurfaceState();
    });
    const drawerCloseBtn = document.getElementById('drawer-close');
    drawerCloseBtn && drawerCloseBtn.addEventListener('click', () => {
        if (navDrawer) navDrawer.classList.remove('open');
        syncMobileSurfaceState();
    });
    navCta && navCta.addEventListener('click', showContact);
    document.getElementById('contactBtn') && document.getElementById('contactBtn').addEventListener('click', showContact);
    // â”€â”€ Tab Routing System â”€â”€
    function handleRouting() {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        switch (tab) {
            case 'about': showAbout(); break;
            case 'projects': showProjects(); break;
            case 'books': showBooks(); break;
            case 'sources': showSourceCodes(); break;
            case 'courses': showCourses(); break;
            case 'youtube': showYoutube(); break;
            case 'community': showCommunity(); break;
            case 'ai': showAIChat(); break;
            default: showHome();
        }
    }
    window.addEventListener('popstate', handleRouting);
    handleRouting();
    syncMobileSurfaceState();

    // Chat button shown on load now that hero is standalone
    if (chatButton) { chatButton.classList.add('show-chat-btn'); }

    // Wire initial greeting copy button
    const initCopyBtn = document.querySelector('.cma-copy-init');
    if (initCopyBtn) {
        initCopyBtn.classList.remove('cma-copy-init');
        initCopyBtn.classList.add('cma-copy');
        initCopyBtn.addEventListener('click', () => copyToClipboard(initCopyBtn, 'Hello! How can I assist you today?'));
    }

    // Chat chips using data-msg
    document.querySelectorAll('.chat-chip[data-msg]').forEach(chip => {
        chip.addEventListener('click', () => {
            if (userInput) { userInput.value = chip.dataset.msg; }
            document.getElementById('chat-send-btn').click();
        });
    });

    // â”€â”€ Conversation History (IndexedDB / Guest sessionStorage) â”€â”€
    let activeConvId = null;   // current conversation DB id
    let convMsgCount = 0;      // track exchanges for AI naming trigger
    let currentFilter = 'all';
    let searchQuery = '';

    // Create a new conversation and set it active
    async function startNewConversation() {
        const conv = await ConvDB.createConversation('New Chat');
        activeConvId = conv.id;
        convMsgCount = 0;
        return conv;
    }

    // Save a message to the active conversation
    async function saveMessageToConv(role, content) {
        if (!activeConvId) {
            const conv = await startNewConversation();
            activeConvId = conv.id;
        }
        await ConvDB.addMessage(activeConvId, role, content);
        convMsgCount++;

        // Keep names stable and deterministic; do not use AI renaming.
        if (role === 'user' && convMsgCount === 1 && content && activeConvId) {
            const stableName = content.trim().replace(/\s+/g, ' ').slice(0, 48);
            if (stableName) await ConvDB.updateConversationName(activeConvId, stableName);
        }
        refreshSidebarConvList();
    }

    async function refreshSidebarConvList() {
        const list = document.getElementById('sidebar-convo-list');
        if (!list) return;
        const convs = await ConvDB.getAllConversations(currentFilter);
        // Apply search filter
        const filtered = searchQuery
            ? convs.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : convs;

        if (!filtered.length) {
            const msgs = {
                all: 'No conversations yet.',
                pinned: 'No pinned conversations.',
                archived: 'No archived conversations.'
            };
            list.innerHTML = `<p class="sidebar-empty">${msgs[currentFilter] || 'Nothing here.'}</p>`;
            return;
        }

        // Group by date
        const now = Date.now();
        const groups = { Today: [], 'This Week': [], 'Earlier': [] };
        filtered.forEach(c => {
            const age = now - (c.updatedAt || c.createdAt || 0);
            if (age < 86400000) groups['Today'].push(c);
            else if (age < 604800000) groups['This Week'].push(c);
            else groups['Earlier'].push(c);
        });

        let html = '';
        for (const [groupName, items] of Object.entries(groups)) {
            if (!items.length) continue;
            html += `<div class="sb-date-group">${groupName}</div>`;
            items.forEach(c => {
                const isActive = String(c.id) === String(activeConvId);
                const pinIcon = c.isPinned ? '<span class="sb-conv-pin">â˜…</span>' : '';
                const name = escapeHtml(c.name || 'Untitled');
                const relTime = relativeTime(c.updatedAt || c.createdAt || 0);
                html += `<div class="sb-conv-row${isActive ? ' sb-conv-active' : ''}" data-id="${c.id}">
                        <button class="sb-conv-main" data-id="${c.id}" title="${name}">
                            <span class="sb-conv-icon">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </span>
                            <span class="sb-conv-text">
                                <span class="sb-conv-name">${pinIcon}${name}</span>
                                <span class="sb-conv-time">${relTime}</span>
                            </span>
                        </button>
                        <button class="sb-conv-menu-btn" data-id="${c.id}" aria-label="Options" title="Options">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                        </button>
                    </div>`;
            });
        }
        list.innerHTML = html;

        // Bind delegated handlers once (more reliable than per-row handlers on mobile)
        if (!list.dataset.ctxBound) {
            list.dataset.ctxBound = '1';

            // Options (3-dots) menu
            const findMenuBtn = (target) => {
                let el = target;
                while (el && el !== document && el !== document.documentElement) {
                    if (el.classList && el.classList.contains('sb-conv-menu-btn')) return el;
                    el = el.parentNode;
                }
                return null;
            };

            const openMenuFromEvent = (e) => {
                const btn = findMenuBtn(e.target);
                if (!btn) return;
                e.preventDefault();
                e.stopPropagation();
                const id = btn.dataset.id;
                if (!id) return;
                hapticVibrate(10);
                showConvContextMenu(id, e);
            };

            list.addEventListener('click', openMenuFromEvent);
        }

        // Open conversation / Long press
        list.querySelectorAll('.sb-conv-row').forEach(row => {
            const btn = row.querySelector('.sb-conv-main');
            const id = btn.dataset.id;
            let pressTimer;

            const startPress = (e) => {
                pressTimer = setTimeout(() => {
                    hapticVibrate([20, 30, 20]);
                    showConvContextMenu(id, e.touches ? e.touches[0] : e);
                }, 600);
            };
            const endPress = () => clearTimeout(pressTimer);

            btn.addEventListener('mousedown', startPress);
            btn.addEventListener('touchstart', startPress, { passive: true });
            btn.addEventListener('mouseup', endPress);
            btn.addEventListener('touchend', endPress);
            btn.addEventListener('mouseleave', endPress);

            btn.addEventListener('click', async () => {
                if (row.classList.contains('is-renaming')) return;
                hapticVibrate(15);
                await loadConversation(id);
            });

            // Context menu button (PC)
            row.querySelector('.sb-conv-menu-btn')?.addEventListener('touchmove', endPress);
            row.querySelector('.sb-conv-menu-btn')?.addEventListener('touchcancel', endPress);
        });
    }

    function hapticVibrate(pattern) {
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(pattern);
        }
    }
    function isMobileViewport() {
        return window.matchMedia('(max-width: 768px)').matches;
    }
    function setMobileSurfaceLock(locked) {
        document.documentElement.classList.toggle('mobile-lock', locked);
        document.body.classList.toggle('mobile-lock', locked);
    }
    function syncMobileSurfaceState() {
        const drawerOpen = !!(navDrawer && navDrawer.classList.contains('open'));
        const sidebarMobileOpen = Boolean(chatOpen && sidebarOpen && isMobileViewport());
        if (chatInterface) chatInterface.classList.toggle('sidebar-open-mobile', sidebarMobileOpen);
        setMobileSurfaceLock(isMobileViewport() && (drawerOpen || sidebarMobileOpen));
    }

    async function loadConversation(convId) {
        const msgs = await ConvDB.getMessages(convId);
        conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
        chatMessages.innerHTML = '';

        // Ensure chat interface is open on mobile when loading a conversation
        if (!chatOpen) {
            chatOpen = true;
            chatInterface.style.display = 'flex';
            if (chatButton) chatButton.classList.add('chat-open-hidden');
            document.getElementById('chat-notification')?.classList.remove('show');
            hasNotification = false;
        }

        // Load messages sequentially to ensure proper rendering order
        for (const m of msgs.filter(m => m.role !== 'system')) {
            conversationHistory.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content });
            await addMessage(m.role === 'assistant' ? 'assistant' : 'user', m.content);
        }

        activeConvId = convId;
        convMsgCount = msgs.length;
        scrollChatToBottom();
        closeSidebar();
        await refreshSidebarConvList();
    }

    // Relative time helper
    function relativeTime(ts) {
        if (!ts) return '';
        const diff = Date.now() - ts;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Context menu logic
    let ctxMenuConvId = null;
    let ctxMenuOpenedAt = 0;
    function showConvContextMenu(convId, e) {
        ctxMenuConvId = convId;
        const menu = document.getElementById('sb-context-menu');
        if (!menu) return;

        // Highlight row
        document.querySelectorAll('.sb-conv-row').forEach(r => r.classList.remove('context-menu-open'));
        const row = document.querySelector(`.sb-conv-main[data-id="${convId}"]`)?.closest('.sb-conv-row');
        if (row) row.classList.add('context-menu-open');

        const point = e?.touches?.[0] || e?.changedTouches?.[0] || e;
        const clientX = Number(point?.clientX || 0);
        const clientY = Number(point?.clientY || 0);
        const x = Math.min(clientX, window.innerWidth - 180);
        const y = Math.min(clientY, window.innerHeight - 250);
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.style.display = 'block';

        ctxMenuOpenedAt = Date.now();

        // Close on next outside interaction (ignore the opening click)
        setTimeout(() => {
            document.addEventListener('pointerdown', hideCtxMenu, { once: true, capture: true });
        }, 0);
    }

    function hideCtxMenu(ev) {
        if (Date.now() - ctxMenuOpenedAt < 250) {
            return;
        }
        const menu = document.getElementById('sb-context-menu');
        if (menu && ev && menu.contains(ev.target)) {
            document.addEventListener('pointerdown', hideCtxMenu, { once: true, capture: true });
            return;
        }
        if (menu) menu.style.display = 'none';
        document.querySelectorAll('.sb-conv-row').forEach(r => r.classList.remove('context-menu-open'));
    }

    document.getElementById('sb-context-menu')?.querySelectorAll('.cm-item').forEach(item => {
        item.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = ctxMenuConvId;
            const action = item.dataset.action;
            hideCtxMenu();
            if (!id) return;

            if (action === 'rename') {
                const newName = prompt('Rename conversation:');
                if (newName?.trim()) {
                    hapticVibrate(10);
                    await ConvDB.updateConversationName(id, newName.trim());
                    await refreshSidebarConvList();
                }
            } else if (action === 'pin') {
                hapticVibrate(15);
                const convs = await ConvDB.getAllConversations('all');
                const c = convs.find(c => String(c.id) === String(id));
                await ConvDB.pinConversation(id, !(c?.isPinned));
                await refreshSidebarConvList();
            } else if (action === 'archive') {
                hapticVibrate(15);
                const isCurrentlyArchived = currentFilter === 'archived';
                await ConvDB.archiveConversation(id, !isCurrentlyArchived);
                if (String(id) === String(activeConvId)) {
                    activeConvId = null; chatMessages.innerHTML = '';
                    conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
                }
                await refreshSidebarConvList();
            } else if (action === 'delete') {
                hapticVibrate([20, 50, 20]);
                await ConvDB.deleteConversation(id);
                if (String(id) === String(activeConvId)) {
                    activeConvId = null; chatMessages.innerHTML = '';
                    conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
                }
                await refreshSidebarConvList();
            }
        });
    });

    // Search
    document.getElementById('sb-search')?.addEventListener('input', function () {
        searchQuery = this.value.trim();
        refreshSidebarConvList();
    });

    // Filter tabs
    document.querySelectorAll('.sb-filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.sb-filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter || 'all';
            refreshSidebarConvList();
        });
    });

    // â”€â”€ Chat open/close â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    window.toggleChat = () => {
        // Check auth if new user
        if (!chatOpen && Auth.isGuest() && !sessionStorage.getItem('khan_guest_visited')) {
            const authMod = document.getElementById('auth-modal');
            if (authMod) authMod.classList.add('show');
            sessionStorage.setItem('khan_guest_visited', '1');
            return; // Wait for auth or guest choice
        }
        chatOpen = !chatOpen;
        chatInterface.style.display = chatOpen ? 'flex' : 'none';
        if (chatButton) chatButton.classList.toggle('chat-open-hidden', chatOpen);
        hapticVibrate(chatOpen ? 18 : 10);
        if (chatOpen) {
            document.getElementById('chat-notification')?.classList.remove('show');
            hasNotification = false;
            setTimeout(scrollChatToBottom, 80);
            userInput && userInput.focus();
        } else { /* Sidebar removed */ }
        syncMobileSurfaceState();
    }

    openSidebar = () => { };
    closeSidebar = () => { };
    toggleSidebar = () => { };

    // â”€â”€ Site Loader â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    window.addEventListener('load', () => {
        const bar = document.getElementById('loader-bar');
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
            document.getElementById('site-loader')?.classList.add('hidden');
        }, 800);
    });


    function scrollChatToBottom() { chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' }); }

    // â”€â”€ Thinking state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function setThinkingState(mode, detail) {
        if (!typingIndicator) return;
        typingIndicator.style.display = 'flex';
        typingIndicator.classList.remove('typing-deep');
        const label = typingIndicator.querySelector('span');
        if (!label) return;
        if (mode === 'deep') {
            typingIndicator.classList.add('typing-deep');
            label.textContent = detail || 'Deep thinking in progress...'; return;
        }
        label.textContent = detail || 'Khan is thinking';
    }
    function attachMessageActions(msgDiv, finalAnswer) {
        const copyBtn = msgDiv.querySelector('.cma-copy');
        if (copyBtn) copyBtn.addEventListener('click', () => copyToClipboard(copyBtn, finalAnswer));

        const ttsBtn = msgDiv.querySelector('.cma-tts');
        if (ttsBtn) {
            ttsBtn.addEventListener('click', () => {
                audioManager.speak(finalAnswer, ttsBtn);
            });
        }
    }

    // â”€â”€ Progressive text render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    async function renderProgressiveText(target, text) {
        if (!target) return;
        const words = (text || '').split(/\s+/).filter(Boolean);
        if (!words.length) { target.textContent = ''; return; }
        target.innerHTML = '';
        let currentText = '';
        for (let i = 0; i < words.length; i++) {
            currentText += (i ? ' ' : '') + words[i];
            target.innerHTML = renderMarkdown(currentText);
            if (i % 2 === 0) { scrollChatToBottom(); await new Promise(r => setTimeout(r, 12)); }
        }
    }

    // â”€â”€ Add message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    window._chatAddMessage = async function (role, content, options = {}) {
        return addMessage(role, content, options);
    };
    window._chatSaveMsg = async function (role, content) {
        return saveMessageToConv(role, content);
    };
    async function addMessage(role, content, options = {}) {
        const isAssistant = role === 'assistant';
        const parsed = isAssistant ? splitThoughtAndAnswer(content) : { thought: '', answer: content };
        const finalAnswer = isAssistant ? sanitizeAssistantReply(parsed.answer || content) : (parsed.answer || content);
        const msgDiv = document.createElement('div');

        if (isAssistant) {
            msgDiv.className = 'cm-ai chat-message';
            const thoughtHtml = (parsed.thought && deepThinkEnabled)
                ? `<details class="cm-thought"><summary><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Thought</summary><div class="cm-thought-body">${renderMarkdown(parsed.thought)}</div></details>`
                : '';

            msgDiv.innerHTML = `
                    ${thoughtHtml}
                    <div class="cm-ai-text">${isAssistant ? renderMarkdown(parsed.answer) : renderMarkdown(finalAnswer)}</div>
                    <div class="cm-actions">
                        <button class="cma-btn cma-copy" title="Copy to clipboard">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                        <button class="cma-btn cma-tts" title="Listen to response">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        </button>
                    </div>`;

            chatMessages.appendChild(msgDiv);
            attachMessageActions(msgDiv, finalAnswer);

            if (!chatOpen) {
                hasNotification = true;
                const notif = document.getElementById('chat-notification'), preview = document.getElementById('notif-preview-text');
                if (notif && preview) { preview.textContent = finalAnswer.slice(0, 48) + (finalAnswer.length > 48 ? 'â€¦' : ''); notif.classList.add('show'); setTimeout(() => notif.classList.remove('show'), 6000); }
            }
        } else {
            msgDiv.className = 'cm-user chat-message';
            let inner = `<div class="cm-user-bubble">`;
            if (finalAnswer) inner += `<div>${escapeHtml(finalAnswer)}</div>`;
            if (options.imageUrl) {
                inner += `<div class="cm-msg-img"><img src="${options.imageUrl}" alt="Uploaded image" onclick="window.open('${options.imageUrl}', '_blank')"/></div>`;
            }
            inner += `</div>`;
            msgDiv.innerHTML = inner;
            chatMessages.appendChild(msgDiv);
        }

        if (isAssistant) {
            const textNode = msgDiv.querySelector('.cm-ai-text');
            if (options.stream) await renderProgressiveText(textNode, finalAnswer);
        }
        scrollChatToBottom();
        playMsgSound(isAssistant ? 'received' : 'sent');
    }

    // â”€â”€ Vision helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    async function optimizeImageForVision(dataUrl) {
        return new Promise((resolve) => {
            try {
                const img = new Image();
                img.onload = () => {
                    const maxSide = 1280;
                    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(img.width * scale));
                    canvas.height = Math.max(1, Math.round(img.height * scale));
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return resolve(dataUrl);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.82));
                };
                img.onerror = () => resolve(dataUrl);
                img.src = dataUrl;
            } catch {
                resolve(dataUrl);
            }
        });
    }

    function buildGroqMessages(hasImage, userMessage, imageDataUrl) {
        const mapped = conversationHistory.map(m => ({ role: m.role, content: m.content }));
        if (!hasImage) return mapped;
        for (let i = mapped.length - 1; i >= 0; i--) {
            if (mapped[i].role === 'user') {
                mapped[i] = { role: 'user', content: [{ type: 'text', text: userMessage || '' }, { type: 'image_url', image_url: { url: imageDataUrl } }] };
                break;
            }
        }
        return mapped;
    }

    async function requestVisionCompletion(userMessage, imageDataUrl, maxTokens, temperature) {
        const optimizedImage = await optimizeImageForVision(imageDataUrl);
        const models = [
            'llama-3.2-90b-vision-preview',
            'llama-3.2-11b-vision-preview'
        ];
        let lastError = '';
        for (const model of models) {
            try {
                const response = await fetch(GROQ_CHAT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                    body: JSON.stringify({
                        model,
                        messages: buildGroqMessages(true, userMessage, optimizedImage),
                        max_tokens: maxTokens,
                        temperature
                    })
                });
                if (!response.ok) {
                    let msg = `HTTP ${response.status}`;
                    try {
                        const errData = await response.json();
                        msg = errData?.error?.message || msg;
                    } catch (e) { }
                    lastError = msg;
                    continue;
                }
                const data = await response.json();
                const content = data?.choices?.[0]?.message?.content;
                if (content) return content;
            } catch (err) {
                lastError = err?.message || 'Vision request failed';
            }
        }
        throw new Error(lastError || 'vision_failed');
    }

    // â”€â”€ Send message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    async function sendMessage(userMessage) {
        enforceContextLimit();
        // Rate limiting check
        const rateKey = Auth.isLoggedIn() ? Auth.getCurrentUser().id : 'guest_' + (localStorage.getItem('khan_guest_visited') || 'unknown');
        if (!RateLimiter.canProceed(rateKey)) {
            const retrySec = RateLimiter.getRetryAfter(rateKey);
            ToastManager?.show(`Rate limit exceeded. Please wait ${retrySec} seconds.`, 'warning');
            return;
        }

        conversationHistory.push({ role: 'user', content: userMessage });
        await saveMessageToConv('user', userMessage); // persist to DB
        playMsgSound('sent');

        const currentImageDataUrl = uploadedImageDataUrl;
        const currentImageName = uploadedImageName;
        const hasImage = Boolean(currentImageDataUrl);
        let currentHasImage = hasImage;

        if (hasImage) {
            uploadedImageDataUrl = ''; uploadedImageName = '';
            const sb = document.getElementById('upload-status-bar'); if (sb) sb.style.display = 'none';
            if (chatFileInput) chatFileInput.value = '';
        }

        // Ground Breaking: Real Thought Process UI (Only if deep think is enabled)
        try {
            const hints = [];
            if (deepThinkEnabled) hints.push('DEEP REASONING MODE: You MUST use <think>...</think> tags to show your step-by-step engineering logic before answering. Be extremely technical and detailed in your internal thoughts.');
            if (uploadedFileContext) hints.push(`Uploaded file context: ${uploadedFileContext.slice(0, 2400)}`);
            if (currentImageDataUrl) hints.push(`User attached image: ${currentImageName || 'image file'}`);
            if (hints.length) conversationHistory.push({ role: 'system', content: hints.join('\n') });

            // Clear file context after sending to ensure it's only sent once
            uploadedFileContext = '';
            const statusBar = document.getElementById('upload-status-bar');
            if (statusBar) statusBar.style.display = 'none';

            if (hasImage) {
                const msg = await requestVisionCompletion(userMessage, currentImageDataUrl, 512, 0.2);
                conversationHistory.push({ role: 'assistant', content: msg });
                await saveMessageToConv('assistant', msg);
                typingIndicator.style.display = 'none';
                await addMessage('assistant', msg, { stream: true });
                return;
            }

            const modelName = deepThinkEnabled ? 'qwen/qwen3-32b' : 'llama-3.3-70b-versatile';
            const maxTokens = deepThinkEnabled ? 4096 : 1024;
            const temperature = deepThinkEnabled ? 0.6 : 0.7;

            const response = await fetch(GROQ_CHAT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: modelName, messages: conversationHistory, max_tokens: maxTokens, temperature, stream: false })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err?.error?.message || `Groq error ${response.status}`);
            }

            typingIndicator.style.display = 'none';
            const data = await response.json();
            const fullContent = data?.choices?.[0]?.message?.content || '';

            if (fullContent) {
                conversationHistory.push({ role: 'assistant', content: fullContent });
                await saveMessageToConv('assistant', fullContent);
                await addMessage('assistant', fullContent, { stream: false });
            }
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.style.display = 'none';
            const msg = currentHasImage
                ? 'I could not analyze that image right now. Please try again.'
                : (error.message.includes('Groq') ? 'âš ï¸ ' + error.message : 'I am temporarily unable to connect. Please retry in a few seconds.');
            await addMessage('assistant', msg, { stream: false });
        } finally {
            typingIndicator.style.display = 'none';
        }
    }

    // â”€â”€ doSend â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    async function doSend() {
        const msg = userInput.value.trim();
        const currentImg = uploadedImageDataUrl;
        if (!msg && !currentImg) return;

        hapticVibrate(14);
        addMessage('user', msg, { imageUrl: currentImg });
        userInput.value = '';
        const finalMsg = msg || (currentImg ? 'Please analyze this image in detail.' : '');
        await sendMessage(finalMsg);
    }

    // â”€â”€ Toggle buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    thinkToggle && thinkToggle.addEventListener('click', () => {
        window.deepThinkEnabled = !window.deepThinkEnabled;
        thinkToggle.classList.toggle('active', window.deepThinkEnabled);
        hapticVibrate(10);
        ToastManager?.show(window.deepThinkEnabled ? 'DeepThink enabled' : 'DeepThink disabled', 'info');
    });

    // Reset Chat Button (Trash icon)
    document.getElementById('reset-chat-btn')?.addEventListener('click', () => {
        hapticVibrate(20);
        conversationHistory = [];
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) chatMessages.innerHTML = '';
        ToastManager?.show('Conversation cleared', 'info');
    });

    // Call Button (Phone icon)
    document.getElementById('call-btn')?.addEventListener('click', () => {
        window.location.href = 'call.html';
    });

    // Suggestion Chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            userInput.value = chip.textContent;
            doSend();
        });
    });

    // Voice Input Button
    document.getElementById('voice-input-btn')?.addEventListener('click', () => {
        hapticVibrate(10);
        if (typeof openGoLive === 'function') openGoLive(false);
    });

    // Voice call button (Phone icon)
    document.getElementById('call-btn')?.addEventListener('click', () => {
        hapticVibrate(20);
        window.location.href = 'call.html';
    });

    // Textarea auto-height & Enter handling
    if (userInput) {
        userInput.addEventListener('input', () => {
            userInput.style.height = 'auto';
            userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
        });
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                doSend();
                userInput.style.height = 'auto';
            }
        });
    }

    // â”€â”€ File / Image attach â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    attachButton && attachButton.addEventListener('click', () => {
        hapticVibrate(10);
        chatFileInput && chatFileInput.click();
    });

    chatFileInput && chatFileInput.addEventListener('change', async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const statusBar = document.getElementById('upload-status-bar');
        const statusText = document.getElementById('upload-status');
        const statusType = document.getElementById('upload-type');
        const thumbnail = statusBar.querySelector('.file-preview-thumbnail');

        const showPreview = (type, dataUrl = null) => {
            if (dataUrl && type === 'image') {
                thumbnail.style.backgroundImage = `url(${dataUrl})`;
                thumbnail.innerHTML = '';
                statusType.textContent = 'Image Attached';
            } else {
                thumbnail.style.backgroundImage = 'none';
                const icon = type === 'pdf' ? 'file-text' : 'file';
                thumbnail.innerHTML = `<i data-lucide="${icon}"></i>`;
                statusType.textContent = file.name.split('.').pop().toUpperCase() + ' File';
            }
            statusText.textContent = file.name;
            statusBar.style.display = 'block';
            if (window.lucide) window.lucide.createIcons();
        };

        if (file.type && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                uploadedImageDataUrl = String(reader.result || '');
                uploadedImageName = file.name;
                showPreview('image', uploadedImageDataUrl);
                ToastManager.show('Image attached.', 'success');
            };
            reader.onerror = () => { ToastManager.show('Could not read image file.', 'error'); };
            reader.readAsDataURL(file); return;
        }

        try {
            if (file.name.endsWith('.pdf')) {
                ToastManager.show('Analyzing PDF...', 'info');
                const arrayBuffer = await file.arrayBuffer();
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let text = '';
                for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    text += content.items.map(item => item.str).join(' ') + '\n';
                }
                uploadedFileContext = text.slice(0, 15000);
                showPreview('pdf');
                ToastManager.show('PDF ready for query.', 'success');
                return;
            }

            const text = await file.text();
            uploadedFileContext = text.slice(0, 20000);
            showPreview('file');
            ToastManager.show('File attached.', 'success');
        } catch (e) {
            console.error('File error:', e);
            ToastManager.show('Could not read file.', 'error');
        }
    });

    document.getElementById('upload-clear-btn') && document.getElementById('upload-clear-btn').addEventListener('click', () => {
        uploadedFileContext = ''; uploadedImageDataUrl = ''; uploadedImageName = '';
        const sb = document.getElementById('upload-status-bar'); if (sb) sb.style.display = 'none';
        if (chatFileInput) chatFileInput.value = '';
    });

    // â”€â”€ Chat open/close wiring â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    chatButton && chatButton.addEventListener('click', () => { if (!chatOpen) window.toggleChat(); });
    document.getElementById('close-chat-btn') && document.getElementById('close-chat-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleChat(); });
    document.getElementById('sidebar-toggle-btn') && document.getElementById('sidebar-toggle-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(); });
    document.getElementById('sidebar-close-mobile') && document.getElementById('sidebar-close-mobile').addEventListener('click', (e) => { e.stopPropagation(); closeSidebar(); });
    document.getElementById('chat-main') && document.getElementById('chat-main').addEventListener('click', () => {
        if (chatOpen && sidebarOpen && isMobileViewport()) closeSidebar();
    });
    document.getElementById('chat-messages') && document.getElementById('chat-messages').addEventListener('touchstart', () => {
        if (chatOpen && sidebarOpen && isMobileViewport()) closeSidebar();
    }, { passive: true });
    document.getElementById('new-chat-btn') && document.getElementById('new-chat-btn').addEventListener('click', async () => {
        hapticVibrate(14);
        activeConvId = null; convMsgCount = 0;
        const welcomeText = window._dynamicGreeting || "Hello! How can I assist you today?";
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cm-ai chat-message';
        msgDiv.innerHTML = `
                <div class="cm-ai-text">${renderMarkdown(welcomeText)}</div>
                <div class="cm-actions">
                    <button class="cma-btn cma-copy" title="Copy">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button class="cma-btn cma-tts" title="Listen">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                </div>`;
        chatMessages.innerHTML = '';
        chatMessages.appendChild(msgDiv);
        attachMessageActions(msgDiv, welcomeText);
        conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
        closeSidebar();
        await refreshSidebarConvList();
    });
    document.getElementById('notif-open-chat') && document.getElementById('notif-open-chat').addEventListener('click', () => { document.getElementById('chat-notification')?.classList.remove('show'); if (!chatOpen) window.toggleChat(); });
    document.getElementById('notif-close') && document.getElementById('notif-close').addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('chat-notification')?.classList.remove('show'); });
    document.getElementById('chat-send-btn') && document.getElementById('chat-send-btn').addEventListener('click', doSend);
    userInput && userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } });
    document.getElementById('clear-chat') && document.getElementById('clear-chat').addEventListener('click', () => {
        hapticVibrate(12);
        activeConvId = null; convMsgCount = 0;
        const txt = window._dynamicGreeting || "Hello! How can I assist you today?";
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cm-ai chat-message';
        msgDiv.innerHTML = `
                <div class="cm-ai-text">${renderMarkdown(txt)}</div>
                <div class="cm-actions">
                    <button class="cma-btn cma-copy" title="Copy">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button class="cma-btn cma-tts" title="Listen">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                </div>`;
        chatMessages.innerHTML = '';
        chatMessages.appendChild(msgDiv);
        attachMessageActions(msgDiv, txt);
        conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
    });
    window.addEventListener('resize', syncMobileSurfaceState);

    // â”€â”€ Contact form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const contactForm = document.getElementById('emailContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = document.getElementById('sendBtn');
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            btn.innerText = 'Opening Email...';
            btn.style.opacity = '0.7';

            const body = `Hi Baasim,\n\n${message}\n\n--\nSent via Baasim Fayaz Khan's Website`;
            const mailtoLink = `mailto:developerkhan39@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Directly set location for best cross-platform reliability
            window.location.href = mailtoLink;

            setTimeout(() => {
                btn.innerText = 'Message Drafted';
                ToastManager.show('Email client opened. Please click "Send" in your mail app.', 'success');
                setTimeout(() => {
                    btn.innerText = 'Send Message';
                    btn.style.opacity = '1';
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    // â”€â”€ Speech Recognition â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const micButton = document.getElementById('mic-button');
    const listeningIndicator = document.getElementById('listening-indicator');
    let recognition = null, isListening = false;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SR(); recognition.continuous = false; recognition.interimResults = true; recognition.lang = 'en-IN';
        recognition.onstart = () => { isListening = true; micButton.classList.add('listening'); listeningIndicator.style.display = 'block'; };
        recognition.onend = () => { isListening = false; micButton.classList.remove('listening'); listeningIndicator.style.display = 'none'; };
        recognition.onresult = (event) => {
            let final = '', interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const t = event.results[i][0].transcript;
                if (event.results[i].isFinal) final += t; else interim += t;
            }
            if (interim) userInput.value = interim;
            if (final) { userInput.value = final; addMessage('user', final); userInput.value = ''; sendMessage(final); }
        };
        recognition.onerror = (event) => {
            isListening = false; micButton.classList.remove('listening'); listeningIndicator.style.display = 'none';
            if (event.error === 'no-speech') alert('No speech detected. Please try again.');
            else if (event.error === 'not-allowed') alert('Microphone access denied. Please allow microphone access.');
        };
        micButton && micButton.addEventListener('click', async () => {
            if (isListening) { recognition.stop(); return; }
            try {
                if (!window.isSecureContext) {
                    alert('Microphone requires HTTPS (or localhost). Open on localhost or use a secure tunnel.');
                    return;
                }
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    alert('Microphone API is unavailable in this browser context.');
                    return;
                }
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => t.stop());
                recognition.start();
            } catch (err) {
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') alert('Microphone access was denied.');
                else if (err.name === 'NotFoundError') alert('No microphone found.');
                else alert('Could not access microphone: ' + err.message);
            }
        });
    } else {
        micButton && micButton.addEventListener('click', () => alert('Speech recognition not supported. Please use Chrome or Edge.'));
        if (micButton) { micButton.style.opacity = '0.5'; micButton.title = 'Speech recognition not supported'; }
    }

    // Reference top_nav for hero button
    const top_nav = document.getElementById('top-nav');
    if (top_nav) { top_nav.style.display = 'flex'; }


    // Nav search filter
    const navSearchInput = document.getElementById('nav-search-input');
    if (navSearchInput) {
        navSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = navSearchInput.value.trim().toLowerCase();
                if (!q) return;
                if (/project|mars|jarvis|robot/i.test(q)) showProjects();
                else if (/book|mindset/i.test(q)) showBooks();
                else if (/contact|email|reach/i.test(q)) showContact();
                else if (/course|learn|tutorial/i.test(q)) showCourses();
                else if (/youtube|channel|video/i.test(q)) showYoutube();
                else showHome();
                navSearchInput.value = '';
            }
        });
    }

    // â”€â”€ Sidebar CSS (inject if missing) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!document.querySelector('.sidebar-convo-row')) {
        const s = document.createElement('style');
        s.textContent = '.sidebar-convo-row{display:flex;align-items:center;gap:4px;margin-bottom:2px}.sidebar-convo-delete{background:none;border:none;cursor:pointer;color:var(--ink-faint);padding:3px;border-radius:4px;flex-shrink:0;display:flex;align-items:center}.sidebar-convo-delete:hover{color:#ef4444;background:rgba(239,68,68,.08)}.thinking-logo{animation:glow 2s infinite ease-in-out}.typing-search span,.typing-deep span{font-style:italic}@keyframes glow{0%{box-shadow:0 0 0 rgba(37,99,235,0)}50%{box-shadow:0 0 14px rgba(37,99,235,.6)}100%{box-shadow:0 0 0 rgba(37,99,235,0)}}';
        document.head.appendChild(s);
    }

    // Expose chat internals for Live bridge
    window._chatConversationHistory = conversationHistory;
    window._chatAddMessage = addMessage;
    window._chatSaveMsg = saveMessageToConv;

    const goLiveBtn = document.getElementById('call-btn');
    if (goLiveBtn) goLiveBtn.addEventListener('click', () => window.openGoLive());

    // â”€â”€ Chat Drag & Drop Logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const dropZone = document.getElementById('chat-drop-zone');

    if (dropZone) {
        window.addEventListener('dragenter', (e) => {
            e.preventDefault(); e.stopPropagation();
            dropZone.classList.add('active');
        });

        window.addEventListener('dragover', (e) => {
            e.preventDefault(); e.stopPropagation();
            dropZone.classList.add('active');
        });

        window.addEventListener('dragleave', (e) => {
            if (e.relatedTarget === null || e.relatedTarget === undefined) {
                dropZone.classList.remove('active');
            }
        });

        window.addEventListener('drop', (e) => {
            e.preventDefault(); e.stopPropagation();
            dropZone.classList.remove('active');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const fileInput = document.getElementById('chat-file-input');
                if (fileInput) {
                    fileInput.files = files;
                    fileInput.dispatchEvent(new Event('change'));
                } else {
                    // If file input doesn't exist, we might need to handle it or show a message
                    console.log('File dropped:', files[0].name);
                }
            }
        });
    }

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â•â•  GO LIVE SYSTEM  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    const GoLive = (() => {
        let isOpen = false, wasChatOpen = false, micActive = false, cameraActive = false, cameraStream = null, recognition = null, glConvHistory = [], speaking = false, currentGlAudio = null, callTimer = null, startTime = 0;
        let currentFacingMode = 'user';
        let glCachedVoices = [];
        const $ = id => document.getElementById(id);

        // Preload voices for consistent TTS quality from first call
        function preloadVoices() {
            glCachedVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
        }
        preloadVoices();
        if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = preloadVoices;

        function setStatus(txt, state) {
            const el = $('gl-status-pill');
            if (el) {
                el.textContent = txt;
            }
        }

        function addTranscript(role, text) {
            const container = $('gl-content');
            if (!container) return;

            // Clear default message if it exists
            const defaultMsg = container.querySelector('#gl-transcript-msg');
            if (defaultMsg) defaultMsg.style.display = 'none';

            const msgDiv = document.createElement('div');
            msgDiv.className = `gl-msg ${role}`;
            msgDiv.style.cssText = `
                    margin-bottom: 12px;
                    padding: 12px 16px;
                    border-radius: 20px;
                    max-width: 85%;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    word-wrap: break-word;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                `;

            if (role === 'user') {
                msgDiv.style.background = '#f7f7f7';
                msgDiv.style.color = '#000';
                msgDiv.style.alignSelf = 'flex-end';
                msgDiv.style.borderBottomRightRadius = '4px';
                msgDiv.style.marginLeft = 'auto';
            } else {
                msgDiv.style.background = '#000';
                msgDiv.style.color = '#fff';
                msgDiv.style.alignSelf = 'flex-start';
                msgDiv.style.borderBottomLeftRadius = '4px';
                msgDiv.style.marginRight = 'auto';
            }

            msgDiv.textContent = text;
            container.appendChild(msgDiv);

            // Keep scrolled to bottom
            container.scrollTop = container.scrollHeight;
        }

        function stopCurrentAudio() {
            if (currentGlAudio) { currentGlAudio.pause(); currentGlAudio.currentTime = 0; currentGlAudio = null; }
            if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
            speaking = false;
            if (typeof stopVisualizer === 'function') stopVisualizer();
        }

        function startTimer() {
            startTime = Date.now();
            if (callTimer) clearInterval(callTimer);
            callTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
                const secs = (elapsed % 60).toString().padStart(2, '0');
                const timerEl = $('gl-timer-pill');
                if (timerEl) timerEl.textContent = `${mins}:${secs}`;
            }, 1000);
        }

        function stopTimer() {
            if (callTimer) clearInterval(callTimer);
            callTimer = null;
            const timerEl = $('gl-timer-pill');
            if (timerEl) timerEl.textContent = `00:00`;
        }

        function setupRecognition() {
            if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return null;
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            const rec = new SR();
            rec.continuous = false; rec.interimResults = false; rec.lang = 'en-IN';
            rec.onresult = async (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) transcript += event.results[i][0].transcript;
                }
                if (!transcript.trim()) return;
                micActive = false; setMicState(false);
                addTranscript('user', transcript.trim());
                const reply = await getAIResponse(transcript.trim());
                addTranscript('ai', reply);
                await speak(reply);
                if (isOpen) setTimeout(() => { if (isOpen && !speaking) startListening(); }, 400);
            };
            rec.onerror = (e) => {
                micActive = false; setMicState(false);
                if (e.error === 'no-speech') setStatus('No speech detected. Tap mic to retry.', 'paused');
                else if (e.error !== 'aborted') setStatus('Mic error: ' + e.error, 'paused');
            };
            return rec;
        }

        function startListening() {
            if (!recognition) recognition = setupRecognition();
            if (!recognition) return;
            try {
                recognition.start();
                micActive = true; setMicState(true);
                setStatus('Listening...', 'listening');
            } catch (e) { }
        }

        function stopListening() {
            if (recognition) { try { recognition.stop(); } catch (e) { } }
            micActive = false; setMicState(false);
            setStatus('Paused', 'paused');
        }

        function setMicState(active) {
            const btn = $('gl-mic-btn');
            if (btn) btn.classList.toggle('active', active);
        }

        async function open(startWithCamera = false) {
            // Ensure HTTPS or localhost for camera access
            if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                ToastManager?.show('Voice Mode requires HTTPS for camera and microphone access.', 'error');
                return;
            }
            isOpen = true;
            wasChatOpen = (document.getElementById('chat-interface').style.display !== 'none');
            if (wasChatOpen) document.getElementById('chat-interface').style.display = 'none';

            const overlay = $('golive-overlay');
            if (overlay) overlay.classList.add('show');
            document.body.style.overflow = 'hidden';

            startTimer();
            setStatus('Ready to talk', 'paused');

            // Load history context
            const chatCtx = window._chatConversationHistory || [];
            glConvHistory = [{ role: 'system', content: SYSTEM_PROMPT + '\n\nVoice mode: Be concise â€” 1-3 sentences max. Natural and conversational.' }];
            // Ensure we don't duplicate the system prompt from context
            chatCtx.filter(m => m.role !== 'system').slice(-10).forEach(m => glConvHistory.push({ role: m.role, content: m.content }));

            const micBtn = $('gl-mic-btn');
            const camBtn = $('gl-camera-btn');
            const switchBtn = $('gl-switch-btn');
            const closeBtn = $('gl-close-btn');
            if (micBtn) micBtn.onclick = () => { if (micActive) stopListening(); else startListening(); };
            if (camBtn) camBtn.onclick = () => toggleCamera();
            if (switchBtn) switchBtn.onclick = () => switchCamera();
            if (closeBtn) closeBtn.onclick = () => close();

            checkCameras();

            if (startWithCamera) {
                setTimeout(() => toggleCamera(), 600);
            }

            setTimeout(() => startListening(), 800);
        }

        async function toggleCamera() {
            const btn = $('gl-camera-btn');
            const switchBtn = $('gl-switch-btn');
            const display = $('gl-display');
            if (cameraActive) {
                if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
                const video = $('gl-video');
                if (video) { video.srcObject = null; video.style.display = 'none'; }
                cameraActive = false;
                if (display) display.classList.remove('gl-camera-active');
                if (btn) btn.classList.remove('active');
                if (switchBtn) switchBtn.style.display = 'none';
                setStatus(micActive ? 'Listening...' : 'Paused', micActive ? 'listening' : 'paused');
            } else {
                try {
                    currentFacingMode = 'user';
                    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode }, audio: false });
                    const video = $('gl-video');
                    if (video) {
                        video.srcObject = cameraStream;
                        video.style.display = 'block';
                        video.style.transform = 'scaleX(-1)';
                    }
                    cameraActive = true;
                    if (display) display.classList.add('gl-camera-active');
                    if (btn) btn.classList.add('active');
                    checkCameras(); // Check if we should show switch button
                    setStatus('Camera on', micActive ? 'listening' : 'paused');
                } catch (err) {
                    ToastManager && ToastManager.show('Camera access denied.', 'error');
                }
            }
        }

        async function switchCamera() {
            if (!cameraActive) return;
            currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
            if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); }
            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode }, audio: false });
                const video = $('gl-video');
                if (video) {
                    video.srcObject = cameraStream;
                    video.style.transform = currentFacingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)';
                }
                setStatus('Camera switched', micActive ? 'listening' : 'paused');
            } catch (err) {
                ToastManager && ToastManager.show('Camera switch failed.', 'error');
            }
        }

        async function checkCameras() {
            if (!cameraActive) return;
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cameras = devices.filter(d => d.kind === 'videoinput');
                const switchBtn = $('gl-switch-btn');
                if (switchBtn) switchBtn.style.display = cameras.length > 1 ? 'flex' : 'none';
            } catch (e) { }
        }

        function close() {
            isOpen = false;
            stopListening();
            stopCurrentAudio();
            stopTimer();
            if (cameraActive) {
                if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
                cameraActive = false;
                const display = $('gl-display');
                if (display) display.classList.remove('gl-camera-active');
                const camBtn = $('gl-camera-btn');
                if (camBtn) camBtn.classList.remove('active');
            }

            // Transfer GoLive conversation to main chat
            if (glConvHistory.length > 0) {
                const newMsgs = glConvHistory.filter(m => m.role !== 'system');
                newMsgs.forEach(m => {
                    if (window._chatAddMessage) window._chatAddMessage(m.role, m.content);
                    // Update the internal history so next GoLive call sees these
                    if (window._chatConversationHistory) {
                        window._chatConversationHistory.push({ role: m.role, content: m.content });
                    }
                });
            }

            // Add session separator in main chat
            const chatMsgsEl = document.getElementById('chat-messages');
            if (chatMsgsEl) {
                const sep = document.createElement('div');
                sep.className = 'live-session-sep';
                sep.style.cssText = 'text-align:center; margin: 20px 0; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;';
                sep.innerHTML = '<span style="background:rgba(255,255,255,0.04); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); display:flex; align-items:center; gap:8px; color: rgba(255,255,255,0.35);"><svg width="8" height="8" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><circle cx="12" cy="12" r="10"/></svg> Voice session ended</span>';
                chatMsgsEl.appendChild(sep);
            }

            const overlay = $('golive-overlay');
            if (overlay) overlay.classList.remove('show');
            document.body.style.overflow = '';

            if (wasChatOpen) document.getElementById('chat-interface').style.display = 'flex';

            const container = $('gl-content');
            if (container) container.innerHTML = '<div id="gl-transcript-msg">Your conversation will appear here.</div>';
            glConvHistory = [];
        }

        function captureFrame() {
            const video = $('gl-video');
            if (!video || !cameraActive) return null;
            if (!video.videoWidth || video.readyState < 2) return null;
            try {
                const canvas = document.createElement('canvas');
                const scale = Math.min(1, 512 / Math.max(video.videoWidth, video.videoHeight));
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
                const ctx = canvas.getContext('2d');
                if (currentFacingMode === 'user') {
                    ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
                }
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                return canvas.toDataURL('image/jpeg', 0.6);
            } catch (e) { return null; }
        }

        async function getAIResponse(userText) {
            setStatus('Thinking...', 'thinking');
            const frame = captureFrame();
            const sysPrompt = SYSTEM_PROMPT + '\n\nVoice mode: Be concise â€” 1-3 sentences max. If the camera is on, you can see the user. Describe what you see if relevant.';

            if (glConvHistory.length === 0 || glConvHistory[0].role !== 'system') {
                glConvHistory.unshift({ role: 'system', content: sysPrompt });
            }

            try {
                let body;
                if (frame) {
                    const visionMsgs = glConvHistory.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }));
                    visionMsgs.push({
                        role: 'user',
                        content: [
                            { type: 'text', text: userText || 'What do you see?' },
                            { type: 'image_url', image_url: { url: frame } }
                        ]
                    });
                    const finalMsgs = [{ role: 'user', content: 'System: ' + sysPrompt }, { role: 'assistant', content: 'Understood.' }, ...visionMsgs];
                    body = { model: 'llama-3.2-90b-vision-preview', messages: finalMsgs, max_tokens: 200 };
                } else {
                    glConvHistory.push({ role: 'user', content: userText });
                    body = { model: 'llama-3.3-70b-versatile', messages: glConvHistory, max_tokens: 200 };
                }

                const response = await fetch(GROQ_CHAT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_API_KEY },
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    if (response.status === 404) throw new Error('API proxy not found. Ensure Netlify functions are deployed.');
                    if (response.status === 401 || response.status === 403) throw new Error('API Key missing or invalid in Netlify settings.');
                    throw new Error(`Connection error (${response.status})`);
                }

                const data = await response.json();
                const reply = (data?.choices?.[0]?.message?.content || 'I did not catch that.').replace(/[*#`]/g, '').trim();
                glConvHistory.push({ role: 'assistant', content: reply });
                return reply;
            } catch (err) {
                console.error('AI Error:', err);
                return 'Connection error: ' + err.message;
            }
        }

        let visCtx = null, visAnim = null, phase = 0;

        function startVisualizer() {
            const cvs = $('gl-visualizer');
            if (!cvs) return;
            if (!visCtx) visCtx = cvs.getContext('2d');
            if (visAnim) cancelAnimationFrame(visAnim);

            function draw() {
                visCtx.clearRect(0, 0, cvs.width, cvs.height);
                const centerY = cvs.height / 2;

                if (!speaking) {
                    visCtx.beginPath();
                    visCtx.moveTo(0, centerY);
                    visCtx.lineTo(cvs.width, centerY);
                    visCtx.strokeStyle = 'rgba(22, 163, 74, 0.3)';
                    visCtx.lineWidth = 2;
                    visCtx.stroke();
                    return;
                }

                visCtx.beginPath();
                const amp = (Math.sin(Date.now() / 150) * 0.5 + 0.5) * (cvs.height / 2 - 2) + 2;

                for (let x = 0; x < cvs.width; x++) {
                    const envelope = Math.exp(-Math.pow((x - cvs.width / 2) / 60, 2));
                    const y1 = Math.sin(x * 0.06 + phase) * amp * envelope;
                    const y2 = Math.cos(x * 0.09 + phase * 1.3) * (amp * 0.6) * envelope;
                    visCtx.lineTo(x, centerY + y1 + y2);
                }
                visCtx.strokeStyle = '#22c55e'; /* vibrant green */
                visCtx.lineWidth = 2.5;
                visCtx.lineJoin = 'round';
                visCtx.stroke();

                phase += 0.2;
                visAnim = requestAnimationFrame(draw);
            }
            draw();
        }

        function stopVisualizer() {
            if (visAnim) { cancelAnimationFrame(visAnim); visAnim = null; }
            const cvs = $('gl-visualizer');
            if (cvs && visCtx) {
                visCtx.clearRect(0, 0, cvs.width, cvs.height);
            }
        }

        async function speak(text) {
            speaking = true;
            setStatus('Speaking...', 'speaking');
            stopCurrentAudio();
            startVisualizer();

            // Exclusively use Microsoft Edge Natural voices / Browser HQ TTS
            await speakBrowserHQ(text);

            speaking = false;
            if (isOpen) setStatus(micActive ? 'Listening...' : 'Paused', micActive ? 'listening' : 'paused');
            stopVisualizer();
        }

        async function speakBrowserHQ(text) {
            return new Promise((resolve) => {
                if (!window.speechSynthesis) return resolve();

                const ut = new SpeechSynthesisUtterance(text);
                const voices = glCachedVoices.length ? glCachedVoices : window.speechSynthesis.getVoices();

                // FORCEFULLY SELECT HIGH-QUALITY NEURAL/EDGE VOICES
                const targetVoice = voices.find(v => v.name.includes('Aria Online (Natural)')) ||
                    voices.find(v => v.name.includes('Guy Online (Natural)')) ||
                    voices.find(v => v.name.includes('Thomas Online (Natural)')) ||
                    voices.find(v => v.lang.startsWith('en') && (v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Natural') || v.name.includes('Edge'))) ||
                    voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                    voices.find(v => v.lang.startsWith('en')) ||
                    voices[0];

                if (targetVoice) ut.voice = targetVoice;
                ut.rate = 1.0;
                ut.pitch = 1.0;
                ut.onend = resolve;
                ut.onerror = resolve;

                window.speechSynthesis.speak(ut);
            });
        }

        async function speakElevenLabs(text) {
            let attempts = 0;
            while (attempts < ELEVEN_LABS_KEYS.length) {
                const key = getElevenKey();
                try {
                    const res = await fetch(DIRECT_ELEVEN_LABS_TTS_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'xi-api-key': key },
                        body: JSON.stringify({ text, model_id: 'eleven_turbo_v2_5', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
                    });
                    if (res.status === 401 || res.status === 429) { rotateElevenKey(); attempts++; continue; }
                    if (!res.ok) throw new Error('EL fail');
                    const blob = await res.blob();
                    return URL.createObjectURL(blob);
                } catch { rotateElevenKey(); attempts++; }
            }
            return null;
        }

        function speakBrowser(text) {
            return new Promise(resolve => {
                if (!window.speechSynthesis) { resolve(); return; }
                const u = new SpeechSynthesisUtterance(text);
                u.onend = resolve; u.onerror = resolve;
                window.speechSynthesis.speak(u);
            });
        }

        return { open, close };
    })();

    window.openGoLive = function (withCam = false) {
        GoLive.open(withCam);
    }

    window.showOrgDetails = (orgId) => {
        const modal = document.getElementById('khan-info-modal');
        const title = document.getElementById('kim-title');
        const body = document.getElementById('kim-body');
        if (!modal || !body) return;

        const data = {
            proteios: {
                title: 'Proteios Education',
                content: `
                        <p>Proteios Education is a modern education and youth development initiative focused on helping students go beyond traditional academics. The organization works at the intersection of education, mentorship, career guidance, creativity, and real-world exposure.</p>
                        <h4>Core Focus Areas</h4>
                        <ul>
                            <li>Critical Thinking & Skill Development</li>
                            <li>Mentorship & Career Clarity</li>
                            <li>Public Speaking & Communication</li>
                            <li>Modern Learning Systems & Youth Empowerment</li>
                        </ul>
                        <h4>Key Initiatives</h4>
                        <ul>
                            <li>Seminars, Workshops, and Podcasts</li>
                            <li>Mentorship Sessions & Student Discussions</li>
                            <li>Documentaries & Awareness Programs</li>
                        </ul>
                        <h4>Connect</h4>
                        <ul>
                            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/proteioseducation?igsh=YnBueWQzbXZ5ZTg0" target="_blank">@proteioseducation</a></li>
                            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/share/1AyxdNPBtT/" target="_blank">Proteios Education</a></li>
                            <li><strong>Email:</strong> <a href="mailto:proteioseducation@gmail.com">proteioseducation@gmail.com</a></li>
                        </ul>
                    `
            },
            inamigos: {
                title: 'InAmigos Foundation',
                content: `
                        <p>InAmigos Foundation is a Section 8 registered non-profit organization founded in 2020 by Govind Shukla. The foundation works across India on social impact, education, skill development, and community welfare.</p>
                        <h4>Social Impact Projects</h4>
                        <ul>
                            <li><strong>Project SEVA:</strong> Food and clothing distribution</li>
                            <li><strong>Project BACHPANSHALA:</strong> Education and digital literacy</li>
                            <li><strong>Project UDAAN:</strong> Women empowerment</li>
                            <li><strong>Project PRAKRITI:</strong> Environmental sustainability</li>
                            <li><strong>Project VIKAS:</strong> Internships and employability</li>
                        </ul>
                        <h4>Accreditations</h4>
                        <ul>
                            <li>NITI Aayog Registered</li>
                            <li>80G & 12A Certified</li>
                            <li>ISO 9001:2015 Standards</li>
                        </ul>
                        <p><a href="https://inamigosfoundation.org.in" target="_blank">Visit Official Website</a></p>
                    `
            }
        };

        const org = data[orgId];
        if (org) {
            title.textContent = org.title;
            body.innerHTML = org.content;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    const kimClose = document.getElementById('kim-close');
    const kimOverlay = document.getElementById('kim-overlay');
    const kimModal = document.getElementById('khan-info-modal');
    const imgModal = document.getElementById('khan-image-modal');
    const imgClose = document.getElementById('kim-close-img');

    const closeKim = () => {
        if (kimModal) kimModal.style.display = 'none';
        if (imgModal) imgModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    kimClose?.addEventListener('click', closeKim);
    kimOverlay?.addEventListener('click', closeKim);
    imgClose?.addEventListener('click', closeKim);

    // Register Service Worker for PWA (Requires HTTP/HTTPS server)
    if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.error('Service Worker registration failed', err));
        });
    }

    // Initialize Scroll Reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Security: Disable Inspect Element shortcuts (allow right-click for UI)
    document.onkeydown = function (e) {
        if (e.keyCode == 123) return false; // F12
        if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) return false;
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false; // Ctrl+U
    };




    if (window.lucide) window.lucide.createIcons();

    // Check for ended call transcript
    const sessionData = localStorage.getItem('khan_live_session');
    if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session && session.messages && session.messages.length > 0) {
            // Wait for components to be ready
            setTimeout(async () => {
                // Open chat if not open
                if (typeof chatOpen !== 'undefined' && !chatOpen) {
                    if (typeof window.toggleChat === 'function') window.toggleChat();
                }

                const chatMsgsEl = document.getElementById('chat-messages');
                if (chatMsgsEl) {
                    // Add separator
                    const sep = document.createElement('div');
                    sep.className = 'live-session-sep';
                    sep.style.cssText = 'text-align:center; margin: 20px 0; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;';
                    sep.innerHTML = '<span style="background:rgba(0,0,0,0.04); padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(0,0,0,0.08); display:flex; align-items:center; gap:8px; color: rgba(0,0,0,0.35);"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Voice Session History</span>';
                    chatMsgsEl.appendChild(sep);

                    // Inject messages
                    for (const m of session.messages) {
                        if (typeof addMessage === 'function') await addMessage(m.role, m.content);
                        if (typeof saveMessageToConv === 'function') await saveMessageToConv(m.role, m.content);
                    }

                    // Clear session
                    localStorage.removeItem('khan_live_session');
                }
            }, 1200);
        } else {
            // Empty session, clean up
            localStorage.removeItem('khan_live_session');
        }
    }

    // Initial Greeting (Personalized Onboarding)
    setTimeout(() => {
        const chatMsgsEl = document.getElementById('chat-messages');
        if (chatMsgsEl && chatMsgsEl.children.length === 0) {
            if (typeof addMessage === 'function') {
                addMessage('assistant', "Hello! I am KHAN AI. Before we begin, may I ask your name and how you discovered Baasim's portfolio?");
            }
        }
    }, 1500);

}
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initializeKhanLogic); } else { initializeKhanLogic(); }
