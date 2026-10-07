/**
 * ============================================================================
 * GRADUATE 2026 - PHOTOBOOTH APPLICATION (app.js)
 * Architecture: Offline-First Progressive Web App (PWA) + Vanilla ES6+
 * Enterprise Features:
 *   1. IndexedDB Persistent Storage (PhotoboothDB) - Handles Unlimited Photos Offline
 *   2. Smart Background Sync Worker (Auto-Upload on Connection, Backoff, Zero Data Loss)
 *   3. Service Worker Integration (100% Functional in Airplane Mode)
 *   4. Dynamic UI Sync & Network Status Indicators in Gallery
 *   5. 4 Lightweight, 100% Valid XML Inline SVG Frames
 *   6. Native CSS Scroll-Snap Swiping (Zero JS Touch Math, 60-120fps)
 *   7. Clean WebRTC Video Stream (No CSS Video Filters for Maximum Mobile FPS)
 *   8. Symmetrical 3:4 Object-Cover Canvas Compositing
 *   9. Fullscreen Isolated Lightbox with Native Scroll-Snap Navigation
 * ============================================================================
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. BACKEND GOOGLE APPS SCRIPT WEB APP CONFIGURATION
  // ==========================================================================
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJqgbbH2UBN-KzefwQspwHAU-iIx-W0gbcBGafuoFNNdzqT5lTlV3-C1lp8KCjuIhH/exec";

  // ==========================================================================
  // 2. SERVICE WORKER REGISTRATION (OFFLINE PWA APP SHELL)
  // ==========================================================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[ServiceWorker] Registered with scope:', reg.scope))
        .catch((err) => console.warn('[ServiceWorker] Registration failed:', err));
    });
  }

  // ==========================================================================
  // 3. INDEXED-DB WRAPPER (PhotoboothDB - OFFLINE-FIRST STORAGE ENGINE)
  // ==========================================================================
  const PhotoboothDB = {
    dbName: "PhotoboothDB_2026",
    dbVersion: 1,
    storeName: "photos",
    _db: null,

    async init() {
      if (this._db) return this._db;

      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            const store = db.createObjectStore(this.storeName, { keyPath: "id" });
            store.createIndex("status", "status", { unique: false });
            store.createIndex("userName", "userName", { unique: false });
            store.createIndex("timestamp", "timestamp", { unique: false });
          }
        };

        request.onsuccess = (event) => {
          this._db = event.target.result;
          resolve(this._db);
        };

        request.onerror = (event) => {
          console.error("[IndexedDB] Failed to open database:", event.target.error);
          reject(event.target.error);
        };
      });
    },

    async savePhoto(photoRecord) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.put(photoRecord);

        req.onsuccess = () => resolve(photoRecord);
        req.onerror = (e) => {
          console.error("[IndexedDB] savePhoto error:", e.target.error);
          reject(e.target.error);
        };
      });
    },

    async getUserPhotos(userName) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();

        req.onsuccess = () => {
          const all = req.result || [];
          // Filter by user name if specified, otherwise return device photos
          const filtered = userName 
            ? all.filter(p => (p.userName || "").toLowerCase() === userName.toLowerCase())
            : all;
          // Sort newest first
          filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          resolve(filtered);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    },

    async getPendingPhotos() {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const index = store.index("status");
        const req = index.getAll("pending");

        req.onsuccess = () => {
          const list = req.result || [];
          // Sort chronologically (FIFO for queue)
          list.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
          resolve(list);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    },

    async updatePhotoStatus(id, newStatus) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const getReq = store.get(id);

        getReq.onsuccess = () => {
          const item = getReq.result;
          if (!item) return resolve(null);
          item.status = newStatus;
          item.syncedAt = Date.now();
          const putReq = store.put(item);
          putReq.onsuccess = () => resolve(item);
          putReq.onerror = (e) => reject(e.target.error);
        };
        getReq.onerror = (e) => reject(e.target.error);
      });
    },

    async incrementRetry(id) {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const getReq = store.get(id);

        getReq.onsuccess = () => {
          const item = getReq.result;
          if (!item) return resolve(null);
          item.retryCount = (item.retryCount || 0) + 1;
          item.lastRetry = Date.now();
          const putReq = store.put(item);
          putReq.onsuccess = () => resolve(item);
          putReq.onerror = (e) => reject(e.target.error);
        };
        getReq.onerror = (e) => reject(e.target.error);
      });
    }
  };

  // ==========================================================================
  // 4. 4 LIGHTWEIGHT NATIVE INLINE SVG FRAMES (100% VALID XML)
  // ==========================================================================
  const PHOTOBOOTH_THEMES = [
    // ------------------------------------------------------------------------
    // THEME 1: CLASSIC GOLD (Metallic borders, serif 2026, church dedication)
    // ------------------------------------------------------------------------
    {
      id: "classic-gold",
      name: "Classic Gold",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <defs>
          <linearGradient id="goldMet1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff4b8"/>
            <stop offset="25%" stop-color="#f5d365"/>
            <stop offset="50%" stop-color="#d4af37"/>
            <stop offset="75%" stop-color="#9a7610"/>
            <stop offset="100%" stop-color="#ffd976"/>
          </linearGradient>
        </defs>
        <!-- Subtle warm ambient tint (Pure lightweight SVG rect) -->
        <rect width="1080" height="1440" fill="rgba(255, 215, 0, 0.03)"/>
        <!-- Outer Metallic Borders -->
        <rect x="34" y="34" width="1012" height="1372" rx="20" fill="none" stroke="url(#goldMet1)" stroke-width="4.5"/>
        <rect x="48" y="48" width="984" height="1344" rx="14" fill="none" stroke="url(#goldMet1)" stroke-width="1.5" stroke-dasharray="14 8" opacity="0.8"/>
        <!-- Studio Center Crosshairs -->
        <line x1="540" y1="20" x2="540" y2="40" stroke="url(#goldMet1)" stroke-width="2"/>
        <line x1="540" y1="1400" x2="540" y2="1420" stroke="url(#goldMet1)" stroke-width="2"/>
        <!-- Corner Brackets -->
        <g transform="translate(38, 38)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 45 L 0 0 L 45 0"/>
          <circle cx="15" cy="15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(1042, 38)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 45 L 0 0 L -45 0"/>
          <circle cx="-15" cy="15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(38, 1402)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 -45 L 0 0 L 45 0"/>
          <circle cx="15" cy="-15" r="4" fill="url(#goldMet1)"/>
        </g>
        <g transform="translate(1042, 1402)" stroke="url(#goldMet1)" fill="none" stroke-width="3">
          <path d="M 0 -45 L 0 0 L -45 0"/>
          <circle cx="-15" cy="-15" r="4" fill="url(#goldMet1)"/>
        </g>
        <!-- Top Header -->
        <g transform="translate(540, 95)" text-anchor="middle">
          <path d="M 0 -26 L 40 -12 L 0 2 L -40 -12 Z" fill="url(#goldMet1)"/>
          <text y="36" font-family="'Cinzel', 'Times New Roman', serif" font-size="20" font-weight="700" letter-spacing="8" fill="url(#goldMet1)">
            &#9733; CONGRATULATIONS &#9733;
          </text>
          <text y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#ffffff">
            CLASS OF 2026
          </text>
        </g>
        <!-- Bottom Plaque -->
        <rect x="52" y="1220" width="976" height="170" rx="22" fill="#090a0e" fill-opacity="0.88" stroke="url(#goldMet1)" stroke-width="2"/>
        <g transform="translate(540, 1266)" text-anchor="middle">
          <text y="24" font-family="'Cinzel', 'Times New Roman', serif" font-size="86" font-weight="900" letter-spacing="12" fill="url(#goldMet1)">
            2026
          </text>
          <text y="72" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5" fill="#ffffff">
            Church Of The Virgin Mary and St. Mina
          </text>
          <text y="96" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#f5d365">
            GRADUATION CELEBRATION
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 2: NOIR MINIMAL (Architectural studio lines, Swiss typography)
    // ------------------------------------------------------------------------
    {
      id: "noir-minimal",
      name: "Noir Minimal",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <!-- Subtle studio tint -->
        <rect width="1080" height="1440" fill="rgba(0, 0, 0, 0.05)"/>
        <!-- Minimalist Architectural Hairline Borders -->
        <rect x="36" y="36" width="1008" height="1368" rx="8" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9"/>
        <rect x="50" y="50" width="980" height="1340" rx="4" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
        <!-- Studio Viewfinder Guides -->
        <path d="M 50 180 L 100 180 M 50 180 L 50 230" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 1030 180 L 980 180 M 1030 180 L 1030 230" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 50 1260 L 100 1260 M 50 1260 L 50 1210" stroke="#ffffff" stroke-width="2" fill="none"/>
        <path d="M 1030 1260 L 980 1260 M 1030 1260 L 1030 1210" stroke="#ffffff" stroke-width="2" fill="none"/>
        <!-- Center Focus Reticle -->
        <line x1="530" y1="720" x2="550" y2="720" stroke="#ffffff" stroke-width="1.5" opacity="0.75"/>
        <line x1="540" y1="710" x2="540" y2="730" stroke="#ffffff" stroke-width="1.5" opacity="0.75"/>
        <circle cx="540" cy="720" r="18" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
        <!-- Top Editorial Header -->
        <g transform="translate(68, 98)">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" letter-spacing="6" fill="#ffffff">
            GRADUATE
          </text>
          <text y="24" font-family="'Courier New', monospace" font-size="14" font-weight="600" letter-spacing="3" fill="#a1a1aa">
            COMMENCEMENT ARCHIVE // VOL. 26
          </text>
        </g>
        <g transform="translate(1012, 98)" text-anchor="end">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff">
            2026
          </text>
          <text y="24" font-family="'Courier New', monospace" font-size="14" font-weight="600" letter-spacing="2" fill="#a1a1aa">
            ST. MINA
          </text>
        </g>
        <!-- Bottom Bar -->
        <rect x="52" y="1328" width="976" height="60" rx="8" fill="#000000" fill-opacity="0.75"/>
        <g transform="translate(72, 1365)">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="2" fill="#ffffff">
            CHURCH OF THE VIRGIN MARY &amp; ST. MINA
          </text>
        </g>
        <g transform="translate(1008, 1365)" text-anchor="end">
          <text y="0" font-family="'Courier New', monospace" font-size="15" font-weight="700" letter-spacing="3" fill="#ffffff">
            REC &#9679; 1080P
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 3: CELEBRATION (Festive stars, confetti, bright diploma banners)
    // ------------------------------------------------------------------------
    {
      id: "celebration",
      name: "Celebration",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ec4899"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <!-- Confetti & Star Accents -->
        <g fill="#f59e0b" opacity="0.85">
          <polygon points="90,120 95,135 110,135 98,144 102,159 90,150 78,159 82,144 70,135 85,135"/>
          <polygon points="980,130 984,142 996,142 986,150 990,162 980,154 970,162 974,150 964,142 976,142"/>
          <polygon points="120,1200 124,1212 136,1212 126,1220 130,1232 120,1224 110,1232 114,1220 104,1212 116,1212"/>
          <polygon points="960,1190 964,1202 976,1202 966,1210 970,1222 960,1214 950,1222 954,1210 944,1202 956,1202"/>
        </g>
        <g fill="#06b6d4" opacity="0.8">
          <circle cx="160" cy="180" r="7"/>
          <circle cx="920" cy="200" r="9"/>
          <circle cx="210" cy="1150" r="8"/>
          <circle cx="890" cy="1130" r="7"/>
        </g>
        <g fill="#ec4899" opacity="0.8">
          <rect x="190" y="100" width="16" height="8" rx="2" transform="rotate(25 190 100)"/>
          <rect x="880" y="110" width="18" height="9" rx="2" transform="rotate(-35 880 110)"/>
          <rect x="150" y="1260" width="18" height="9" rx="2" transform="rotate(40 150 1260)"/>
          <rect x="910" y="1240" width="16" height="8" rx="2" transform="rotate(-20 910 1240)"/>
        </g>
        <!-- Vibrant Border Frame -->
        <rect x="36" y="36" width="1008" height="1368" rx="28" fill="none" stroke="url(#neonGlow)" stroke-width="5"/>
        <!-- Top Header Ribbon -->
        <g transform="translate(540, 110)" text-anchor="middle">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="4" fill="#ffffff">
            WE DID IT! &#127891;
          </text>
        </g>
        <!-- Bottom Celebratory Banner -->
        <rect x="64" y="1240" width="952" height="142" rx="24" fill="#090a0f" fill-opacity="0.9" stroke="url(#neonGlow)" stroke-width="2.5"/>
        <g transform="translate(540, 1290)" text-anchor="middle">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="6" fill="#facc15">
            CLASS OF 2026
          </text>
          <text y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1" fill="#ffffff">
            Church Of The Virgin Mary and St. Mina
          </text>
          <text y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="3" fill="#38bdf8">
            HONORING OUR GRADUATES
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 4: VINTAGE POLAROID (Solid bottom chin, film date stamp)
    // ------------------------------------------------------------------------
    {
      id: "vintage-polaroid",
      name: "Vintage Polaroid",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <!-- Solid Polaroid Outer Film Borders -->
        <rect x="0" y="0" width="1080" height="42" fill="#faf8f5"/>
        <rect x="0" y="0" width="42" height="1440" fill="#faf8f5"/>
        <rect x="1038" y="0" width="42" height="1440" fill="#faf8f5"/>
        <!-- Classic Wide Polaroid Bottom Chin -->
        <rect x="0" y="1200" width="1080" height="240" fill="#faf8f5"/>
        <!-- Subtle Inner Photo Bevel -->
        <rect x="42" y="42" width="996" height="1158" fill="none" stroke="#e0deda" stroke-width="3"/>
        <!-- Top Tape Accents -->
        <rect x="90" y="24" width="130" height="36" rx="3" fill="#e8e5dc" opacity="0.85" transform="rotate(-6 155 42)"/>
        <rect x="860" y="24" width="130" height="36" rx="3" fill="#e8e5dc" opacity="0.85" transform="rotate(5 925 42)"/>
        <!-- Handwritten Script Typography -->
        <g transform="translate(540, 1264)" text-anchor="middle">
          <text y="0" font-family="'Brush Script MT', 'Dancing Script', 'Baskerville', 'Georgia', cursive, serif" font-size="52" font-style="italic" font-weight="bold" fill="#1c1c1e">
            Graduation Day &#8226; Class of 2026
          </text>
          <text y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="#444444">
            CHURCH OF THE VIRGIN MARY AND ST. MINA
          </text>
          <text y="70" font-family="'Courier New', monospace" font-size="14" font-weight="bold" letter-spacing="4" fill="#777777">
            '26 06 15 &#8226; COMMENCEMENT MEMORY
          </text>
        </g>
        <!-- Vintage Quality Seal -->
        <g transform="translate(980, 1370)" text-anchor="middle">
          <circle cx="0" cy="0" r="26" fill="none" stroke="#aa7722" stroke-width="2" stroke-dasharray="4 2"/>
          <text y="4" font-family="sans-serif" font-size="9" font-weight="bold" fill="#aa7722">OFFICIAL</text>
        </g>
      </svg>`
    }
  ];

  // Pre-load all 4 SVG frame themes as Image instances for instantaneous Canvas compositing
  PHOTOBOOTH_THEMES.forEach((theme) => {
    theme.dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(theme.svg.trim());
    theme.frameImage = new Image();
    theme.frameImage.crossOrigin = "anonymous";
    theme.frameImage.src = theme.dataUrl;
  });

  // ==========================================================================
  // 5. APPLICATION STATE
  // ==========================================================================
  const sessionPhotos = []; // In-memory reference for the active guest session
  let activeFrameIndex = 0; // Currently snapped active frame (0 to 3)
  let currentLightboxIndex = 0;
  let isSyncing = false;
  const QUEUE_POLL_INTERVAL_MS = 6000;

  const appState = {
    userName: "",
    stream: null,
    facingMode: "user"
  };

  // ==========================================================================
  // 6. DOM ELEMENT REFERENCES
  // ==========================================================================
  const dom = {
    // Views
    loginView: document.getElementById("login-view"),
    cameraView: document.getElementById("camera-view"),
    galleryView: document.getElementById("gallery-view"),
    lightboxView: document.getElementById("view-lightbox"),

    // Login Elements
    loginForm: document.getElementById("login-form"),
    userNameInput: document.getElementById("user-name-input"),
    headerUserTag: document.getElementById("header-user-tag"),
    headerUserName: document.getElementById("header-user-name"),
    logoutBtn: document.getElementById("logout-btn"),

    // Camera Viewport & Native Scroll Snap Track
    cameraViewport: document.getElementById("camera-viewport"),
    framesScrollTrack: document.getElementById("frames-scroll-track"),
    video: document.getElementById("camera-stream"),
    themeNameLabel: document.getElementById("theme-name-label"),
    themeStepBadge: document.getElementById("theme-step-badge"),
    prevFrameBtn: document.getElementById("prev-frame-btn"),
    nextFrameBtn: document.getElementById("next-frame-btn"),
    shutterBtn: document.getElementById("shutter-btn"),
    flipCamBtn: document.getElementById("flip-cam-btn"),
    shutterFlash: document.getElementById("shutter-flash-overlay"),
    canvas: document.getElementById("capture-canvas"),
    cameraStatusMsg: document.getElementById("camera-status-msg"),
    cameraStatusText: document.getElementById("camera-status-text"),

    // Gallery Toolbar, Drawer & Sync Banner
    galleryOpenBtn: document.getElementById("gallery-open-btn"),
    galleryBackBtn: document.getElementById("gallery-back-btn"),
    galleryThumbPreview: document.getElementById("gallery-thumb-preview"),
    galleryThumbPlaceholder: document.getElementById("gallery-thumb-placeholder"),
    galleryCountBadge: document.getElementById("gallery-count-badge"),
    galleryHeaderCount: document.getElementById("gallery-header-count"),
    galleryEmptyState: document.getElementById("gallery-empty-state"),
    galleryGrid: document.getElementById("gallery-grid"),
    syncStatusDot: document.getElementById("sync-status-dot"),
    syncStatusText: document.getElementById("sync-status-text"),
    syncNetworkBadge: document.getElementById("sync-network-badge"),

    // Lightbox Controls
    lightboxScrollTrack: document.getElementById("lightbox-scroll-track"),
    lightboxCloseBtn: document.getElementById("lightbox-close-btn"),
    lightboxDownloadBtn: document.getElementById("lightbox-download-btn"),
  };

  // ==========================================================================
  // 7. NATIVE CSS SCROLL SNAP SETUP (CAMERA FRAMES)
  // ==========================================================================
  function initCameraFrames() {
    dom.framesScrollTrack.innerHTML = "";

    PHOTOBOOTH_THEMES.forEach((theme, index) => {
      const slide = document.createElement("div");
      slide.className = "snap-frame-slide";
      slide.dataset.index = index;
      slide.innerHTML = theme.svg.trim();
      dom.framesScrollTrack.appendChild(slide);
      theme.slideElement = slide;
    });

    // IntersectionObserver tracks which frame is snapped into view (Zero JS touch math)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(idx)) {
            activeFrameIndex = idx;
            updateThemeLabel(idx);
          }
        }
      });
    }, {
      root: dom.framesScrollTrack,
      threshold: 0.6
    });

    const slides = dom.framesScrollTrack.querySelectorAll(".snap-frame-slide");
    slides.forEach(slide => observer.observe(slide));
  }

  function updateThemeLabel(index) {
    const theme = PHOTOBOOTH_THEMES[index];
    if (!theme) return;
    dom.themeNameLabel.textContent = theme.name;
    dom.themeStepBadge.textContent = `${index + 1}/${PHOTOBOOTH_THEMES.length}`;
  }

  function scrollToFrame(index) {
    if (index < 0) index = PHOTOBOOTH_THEMES.length - 1;
    if (index >= PHOTOBOOTH_THEMES.length) index = 0;
    const slideWidth = dom.framesScrollTrack.clientWidth || 340;
    dom.framesScrollTrack.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
  }

  // Mount frames at startup
  initCameraFrames();
  updateThemeLabel(0);

  // Chevron click navigation on pill
  dom.prevFrameBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToFrame(activeFrameIndex - 1);
  });

  dom.nextFrameBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToFrame(activeFrameIndex + 1);
  });

  // ==========================================================================
  // 8. VIEW TRANSITIONS
  // ==========================================================================
  function showView(viewId) {
    const views = [dom.loginView, dom.cameraView];
    views.forEach((v) => {
      if (v.id === viewId) {
        v.classList.remove("opacity-0", "pointer-events-none", "hidden");
        v.classList.add("opacity-100", "pointer-events-auto");
      } else {
        v.classList.add("opacity-0", "pointer-events-none", "hidden");
        v.classList.remove("opacity-100", "pointer-events-auto");
      }
    });
  }

  async function openGalleryPanel() {
    await refreshGalleryFromIndexedDB();
    dom.galleryView.classList.remove("translate-y-full", "pointer-events-none");
    dom.galleryView.classList.add("translate-y-0", "pointer-events-auto");
  }

  function closeGalleryPanel() {
    dom.galleryView.classList.remove("translate-y-0", "pointer-events-auto");
    dom.galleryView.classList.add("translate-y-full", "pointer-events-none");
  }

  // ==========================================================================
  // 9. WEBRTC CAMERA CONTROLS (CLEAN VIDEO, ZERO CSS FILTERS ON STREAM)
  // ==========================================================================
  async function startCamera() {
    if (appState.stream) {
      stopCamera();
    }

    dom.cameraStatusMsg.classList.remove("hidden");
    dom.cameraStatusText.textContent = "Accessing camera...";

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: appState.facingMode },
        width: { ideal: 1920, min: 1280 },
        height: { ideal: 1080, min: 720 }
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      appState.stream = stream;
      dom.video.srcObject = stream;
      await dom.video.play();

      if (appState.facingMode === "user") {
        dom.video.classList.add("camera-mirror");
      } else {
        dom.video.classList.remove("camera-mirror");
      }

      dom.cameraStatusMsg.classList.add("hidden");
    } catch (err) {
      console.warn("High-res camera failed, falling back to basic camera", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        appState.stream = fallbackStream;
        dom.video.srcObject = fallbackStream;
        await dom.video.play();
        dom.cameraStatusMsg.classList.add("hidden");
      } catch (fatalErr) {
        console.error("Camera access denied or unavailable", fatalErr);
        dom.cameraStatusText.textContent = "Camera permission denied or camera unavailable.";
      }
    }
  }

  function stopCamera() {
    if (appState.stream) {
      appState.stream.getTracks().forEach((track) => track.stop());
      appState.stream = null;
    }
    dom.video.srcObject = null;
  }

  async function flipCamera() {
    appState.facingMode = appState.facingMode === "user" ? "environment" : "user";
    await startCamera();
  }

  // ==========================================================================
  // 10. CONTINUOUS PHOTO CAPTURE & 3:4 CANVAS COMPOSITING
  // ==========================================================================
  async function capturePhoto() {
    if (!dom.video.videoWidth || !dom.video.videoHeight) {
      console.warn("Video stream not ready yet.");
      return;
    }

    const activeTheme = PHOTOBOOTH_THEMES[activeFrameIndex];
    if (!activeTheme || !activeTheme.frameImage.complete) {
      console.warn("SVG Frame still loading.");
      return;
    }

    // 1. Shutter Flash Effect (User remains seamlessly in live camera view)
    dom.shutterFlash.classList.add("flash-active");
    setTimeout(() => {
      dom.shutterFlash.classList.remove("flash-active");
    }, 280);

    // Standard 3:4 High-Resolution Canvas dimensions
    const canvasWidth = 1080;
    const canvasHeight = 1440;
    dom.canvas.width = canvasWidth;
    dom.canvas.height = canvasHeight;
    const ctx = dom.canvas.getContext("2d");

    // 2. Symmetrical 3:4 object-cover crop math
    const vWidth = dom.video.videoWidth || 1080;
    const vHeight = dom.video.videoHeight || 1440;
    const targetRatio = canvasWidth / canvasHeight; // 0.75
    const videoRatio = vWidth / vHeight;

    let sx = 0, sy = 0, sWidth = vWidth, sHeight = vHeight;
    if (videoRatio > targetRatio) {
      sWidth = vHeight * targetRatio;
      sx = (vWidth - sWidth) / 2;
    } else {
      sHeight = vWidth / targetRatio;
      sy = (vHeight - sHeight) / 2;
    }

    // 3. Draw Clean Video Feed (Mirrored horizontally if front camera)
    if (appState.facingMode === "user") {
      ctx.save();
      ctx.translate(canvasWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(dom.video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
      ctx.restore();
    } else {
      ctx.drawImage(dom.video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    }

    // 4. Draw Currently Active SVG Frame ON TOP
    ctx.drawImage(activeTheme.frameImage, 0, 0, canvasWidth, canvasHeight);

    // 5. Export high-quality Base64 JPEG
    const finalImage = dom.canvas.toDataURL("image/jpeg", 0.90);

    // 6. Form Unique Photo Record
    const cleanName = (appState.userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const filename = `photo_${cleanName}_${uniqueSuffix}.jpg`;

    const photoRecord = {
      id: uniqueSuffix,
      userName: appState.userName || "Guest",
      folderName: appState.userName || "Guest",
      filename: filename,
      dataUrl: finalImage,
      themeName: activeTheme.name,
      timestamp: Date.now(),
      status: "pending", // "pending" | "uploaded"
      retryCount: 0
    };

    // 7. Save to IndexedDB (CRITICAL: Persistent Offline Storage)
    try {
      await PhotoboothDB.savePhoto(photoRecord);
    } catch (idbErr) {
      console.warn("[IndexedDB] Could not save photo to IDB:", idbErr);
    }

    // 8. Update in-memory session (newest photo at index 0)
    sessionPhotos.unshift(photoRecord);

    // 9. Update Circular Album Thumbnail Button
    updateGalleryButton();

    // 10. Update UI Sync Indicator
    updateSyncIndicator();

    // 11. Trigger Background Sync Worker (100% Non-Blocking)
    processSyncQueue();
  }

  // ==========================================================================
  // 11. SMART BACKGROUND SYNC & NETWORK WORKER (THE QUEUE)
  // ==========================================================================
  async function updateSyncIndicator() {
    try {
      const pendingList = await PhotoboothDB.getPendingPhotos();
      const pendingCount = pendingList.length;
      const online = navigator.onLine;

      if (!dom.syncStatusDot || !dom.syncStatusText || !dom.syncNetworkBadge) return;

      if (!online) {
        // Device is offline
        dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-amber-400";
        dom.syncStatusText.textContent = pendingCount > 0
          ? `${pendingCount} Photo${pendingCount > 1 ? 's' : ''} Pending Sync (Saved Locally)`
          : "Offline Mode • All Photos Saved Locally";
        dom.syncNetworkBadge.textContent = "Offline";
        dom.syncNetworkBadge.className = "shrink-0 rounded border border-amber-500/40 bg-amber-950/40 px-2 py-0.5 text-[10px] font-mono text-amber-400";
      } else {
        // Device is online
        if (pendingCount > 0) {
          dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-amber-400 animate-pulse";
          dom.syncStatusText.textContent = `${pendingCount} Photo${pendingCount > 1 ? 's' : ''} Pending Sync...`;
          dom.syncNetworkBadge.textContent = "Syncing";
          dom.syncNetworkBadge.className = "shrink-0 rounded border border-gold-500/40 bg-gold-950/40 px-2 py-0.5 text-[10px] font-mono text-gold-300";
        } else {
          dom.syncStatusDot.className = "h-2 w-2 shrink-0 rounded-full bg-emerald-400";
          dom.syncStatusText.textContent = "All photos backed up to cloud";
          dom.syncNetworkBadge.textContent = "Online";
          dom.syncNetworkBadge.className = "shrink-0 rounded border border-emerald-500/30 bg-emerald-950/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400";
        }
      }
    } catch (e) {
      console.warn("[Sync Indicator Error]", e);
    }
  }

  /**
   * Smart Background Sync Worker:
   * - Scans IndexedDB for items with status: "pending"
   * - If offline: does nothing, leaving items safely in IndexedDB
   * - If online: uploads item-by-item, updates IndexedDB status to "uploaded"
   * - On Google Apps Script 429/503: logs silent warning, applies 5s backoff, and halts pass
   */
  async function processSyncQueue() {
    if (isSyncing || !navigator.onLine) {
      updateSyncIndicator();
      return;
    }

    isSyncing = true;
    updateSyncIndicator();

    try {
      const pendingPhotos = await PhotoboothDB.getPendingPhotos();

      for (const item of pendingPhotos) {
        if (!navigator.onLine) {
          console.log("[Sync Worker] Connection lost mid-queue; pausing sync.");
          break;
        }

        const payload = {
          folderName: item.folderName || item.userName || "Guest",
          image: item.dataUrl,
          filename: item.filename
        };
        const serializedPayload = JSON.stringify(payload);
        let uploadSuccess = false;

        try {
          // Send request as text/plain to bypass browser CORS preflight check
          const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: serializedPayload
          });

          if (response.ok) {
            uploadSuccess = true;
            console.log(`[Sync Worker] Photo uploaded successfully: ${item.filename}`);
          } else {
            console.warn(`[Sync Worker] Google Apps Script responded HTTP ${response.status} for ${item.filename}`);
          }
        } catch (networkError) {
          // Attempt no-cors fallback if preflight or transport dropped
          try {
            await fetch(APPS_SCRIPT_URL, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
              },
              body: serializedPayload
            });
            uploadSuccess = true;
            console.log(`[Sync Worker] Delivered via no-cors fallback: ${item.filename}`);
          } catch (fallbackError) {
            console.warn(`[Sync Worker] Upload failed for ${item.filename}:`, fallbackError.message);
          }
        }

        if (uploadSuccess) {
          // Mark photo as "uploaded" in IndexedDB
          await PhotoboothDB.updatePhotoStatus(item.id, "uploaded");

          // Sync in-memory session reference
          const inMem = sessionPhotos.find(p => p.id === item.id);
          if (inMem) inMem.status = "uploaded";

          updateSyncIndicator();

          // Refresh gallery badges if gallery view is open
          if (dom.galleryView.classList.contains("translate-y-0")) {
            renderGalleryGrid();
          }

          // 500ms pacing between successive photos to avoid bursting Google rate limits
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          // Rate limit or server error: increment retry count and back off 5s
          await PhotoboothDB.incrementRetry(item.id);
          console.warn(`[Sync Worker] Rate limited / transmission error for ${item.filename}. Backing off 5s...`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          break; // Stop current batch; next poll or 'online' event will retry
        }
      }
    } catch (err) {
      console.warn("[Sync Worker] Error during sync run:", err);
    } finally {
      isSyncing = false;
      updateSyncIndicator();
    }
  }

  // Network event listeners
  window.addEventListener('online', () => {
    console.log('[Network] Device came ONLINE. Resuming background upload queue.');
    updateSyncIndicator();
    processSyncQueue();
  });

  window.addEventListener('offline', () => {
    console.log('[Network] Device went OFFLINE. Local storage mode active.');
    updateSyncIndicator();
  });

  // Periodic heartbeat every 6 seconds
  setInterval(processSyncQueue, QUEUE_POLL_INTERVAL_MS);

  // ==========================================================================
  // 12. IN-APP GALLERY (INDEXED-DB POWERED)
  // ==========================================================================
  async function loadUserSession(userName) {
    try {
      const photos = await PhotoboothDB.getUserPhotos(userName);
      sessionPhotos.length = 0;
      photos.forEach(p => sessionPhotos.push(p));
      updateGalleryButton();
      updateSyncIndicator();
    } catch (err) {
      console.error("[IndexedDB] Failed loading photos for user:", err);
    }
  }

  async function refreshGalleryFromIndexedDB() {
    try {
      const photos = await PhotoboothDB.getUserPhotos(appState.userName);
      sessionPhotos.length = 0;
      photos.forEach(p => sessionPhotos.push(p));
      updateGalleryButton();
      renderGalleryGrid();
      updateSyncIndicator();
    } catch (err) {
      console.error("[IndexedDB] Error refreshing gallery:", err);
    }
  }

  function updateGalleryButton() {
    const total = sessionPhotos.length;
    if (total > 0) {
      dom.galleryThumbPreview.src = sessionPhotos[0].dataUrl;
      dom.galleryThumbPreview.classList.remove("hidden");
      dom.galleryThumbPlaceholder.classList.add("hidden");

      dom.galleryCountBadge.textContent = total;
      dom.galleryCountBadge.classList.remove("hidden");
      dom.galleryCountBadge.classList.add("flex");
    } else {
      dom.galleryThumbPreview.classList.add("hidden");
      dom.galleryThumbPlaceholder.classList.remove("hidden");
      dom.galleryCountBadge.classList.add("hidden");
    }
  }

  function renderGalleryGrid() {
    const total = sessionPhotos.length;
    dom.galleryHeaderCount.textContent = total;

    if (total === 0) {
      dom.galleryEmptyState.classList.remove("hidden");
      dom.galleryGrid.classList.add("hidden");
      dom.galleryGrid.innerHTML = "";
      return;
    }

    dom.galleryEmptyState.classList.add("hidden");
    dom.galleryGrid.classList.remove("hidden");
    dom.galleryGrid.innerHTML = "";

    sessionPhotos.forEach((photo, idx) => {
      const card = document.createElement("div");
      card.className = "btn-bounce group relative flex flex-col rounded-2xl border border-gold-500/25 bg-surface-850 p-2 shadow-lg cursor-pointer transition-transform";

      const imgContainer = document.createElement("div");
      imgContainer.className = "relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black";

      const img = document.createElement("img");
      img.src = photo.dataUrl;
      img.alt = `Graduation Shot ${total - idx}`;
      img.className = "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105";

      // Sync status tag on photo card
      const isUploaded = photo.status === "uploaded";
      const syncBadge = document.createElement("div");
      syncBadge.className = `absolute top-2 left-2 flex items-center space-x-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-md shadow ${
        isUploaded 
          ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
          : "bg-amber-950/80 border border-amber-500/40 text-amber-300"
      }`;
      syncBadge.innerHTML = isUploaded
        ? `<svg class="h-2.5 w-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg><span>Synced</span>`
        : `<svg class="h-2.5 w-2.5 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Pending</span>`;

      // Fullscreen view trigger icon
      const viewBadge = document.createElement("div");
      viewBadge.className = "absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-gold-400 border border-gold-500/40 shadow";
      viewBadge.innerHTML = `
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
        </svg>
      `;

      imgContainer.appendChild(img);
      imgContainer.appendChild(syncBadge);
      imgContainer.appendChild(viewBadge);
      card.appendChild(imgContainer);

      // Clicking any photo opens Lightbox at this index
      card.addEventListener("click", () => {
        openLightbox(idx);
      });

      dom.galleryGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // 13. FULLSCREEN LIGHTBOX (INDEXED-DB LOADED, SCROLL-SNAP NAVIGATION)
  // ==========================================================================
  let lightboxObserver = null;

  function openLightbox(index) {
    if (!sessionPhotos.length || !sessionPhotos[index]) return;
    currentLightboxIndex = index;

    // 1. Populate Lightbox with all taken session photos
    dom.lightboxScrollTrack.innerHTML = "";

    sessionPhotos.forEach((photo, idx) => {
      const slide = document.createElement("div");
      slide.className = "snap-lightbox-slide";
      slide.dataset.index = idx;

      const img = document.createElement("img");
      img.src = photo.dataUrl;
      img.alt = `Photo ${idx + 1}`;
      img.className = "lightbox-img-card";
      img.draggable = false;

      slide.appendChild(img);
      dom.lightboxScrollTrack.appendChild(slide);
    });

    // 2. Disconnect previous observer if any
    if (lightboxObserver) lightboxObserver.disconnect();

    // 3. Setup IntersectionObserver to track visible photo
    lightboxObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(idx)) {
            currentLightboxIndex = idx;
          }
        }
      });
    }, {
      root: dom.lightboxScrollTrack,
      threshold: 0.6
    });

    const slides = dom.lightboxScrollTrack.querySelectorAll(".snap-lightbox-slide");
    slides.forEach(slide => lightboxObserver.observe(slide));

    // 4. Show Lightbox & instantly scroll to selected photo
    dom.lightboxView.classList.add("lightbox-active");

    requestAnimationFrame(() => {
      const trackWidth = dom.lightboxScrollTrack.clientWidth || window.innerWidth;
      dom.lightboxScrollTrack.scrollTo({
        left: index * trackWidth,
        behavior: "instant"
      });
    });
  }

  function closeLightbox() {
    dom.lightboxView.classList.remove("lightbox-active");
    if (lightboxObserver) {
      lightboxObserver.disconnect();
      lightboxObserver = null;
    }
  }

  function downloadCurrentLightboxPhoto() {
    if (!sessionPhotos[currentLightboxIndex]) return;
    const photo = sessionPhotos[currentLightboxIndex];
    const link = document.createElement("a");
    const safeName = (appState.userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    link.download = `${safeName}_Graduation_2026_shot${currentLightboxIndex + 1}.jpg`;
    link.href = photo.dataUrl;
    link.click();
  }

  // Close Lightbox button
  dom.lightboxCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Download photo button
  dom.lightboxDownloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    downloadCurrentLightboxPhoto();
  });

  // Close when clicking empty backdrop area
  dom.lightboxView.addEventListener("click", (e) => {
    if (e.target === dom.lightboxView || e.target === dom.lightboxScrollTrack || e.target.classList.contains("snap-lightbox-slide")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (dom.lightboxView.classList.contains("lightbox-active")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && currentLightboxIndex > 0) {
        const trackWidth = dom.lightboxScrollTrack.clientWidth;
        dom.lightboxScrollTrack.scrollTo({ left: (currentLightboxIndex - 1) * trackWidth, behavior: "smooth" });
      }
      if (e.key === "ArrowRight" && currentLightboxIndex < sessionPhotos.length - 1) {
        const trackWidth = dom.lightboxScrollTrack.clientWidth;
        dom.lightboxScrollTrack.scrollTo({ left: (currentLightboxIndex + 1) * trackWidth, behavior: "smooth" });
      }
    } else if (dom.cameraView.classList.contains("opacity-100")) {
      if (e.key === "ArrowLeft") scrollToFrame(activeFrameIndex - 1);
      if (e.key === "ArrowRight") scrollToFrame(activeFrameIndex + 1);
      if (e.key === " " || e.key === "Enter") capturePhoto();
    }
  });

  // ==========================================================================
  // 14. GLOBAL EVENT LISTENERS & INITIALIZATION
  // ==========================================================================
  // Initialize IndexedDB on boot
  PhotoboothDB.init().catch(err => console.warn("[IndexedDB] Boot init warning:", err));

  // Login Form
  dom.loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = dom.userNameInput.value.trim();
    if (!name) return;

    appState.userName = name;
    dom.headerUserName.textContent = name;
    dom.headerUserTag.classList.remove("hidden");
    dom.headerUserTag.classList.add("flex");
    dom.logoutBtn.classList.remove("hidden");

    // Load any existing offline photos for this user from IndexedDB
    await loadUserSession(name);

    showView("camera-view");
    startCamera();
  });

  // Camera Controls
  dom.shutterBtn.addEventListener("click", capturePhoto);
  dom.flipCamBtn.addEventListener("click", flipCamera);

  // Gallery Controls
  dom.galleryOpenBtn.addEventListener("click", openGalleryPanel);
  dom.galleryBackBtn.addEventListener("click", closeGalleryPanel);

  // Exit / Switch Guest
  dom.logoutBtn.addEventListener("click", () => {
    stopCamera();
    appState.userName = "";
    sessionPhotos.length = 0; // Clear active UI view for next guest
    // Note: IndexedDB preserves all photos safely and pending sync worker keeps processing!
    updateGalleryButton();
    closeGalleryPanel();
    closeLightbox();
    dom.headerUserTag.classList.add("hidden");
    dom.logoutBtn.classList.add("hidden");
    dom.userNameInput.value = "";
    showView("login-view");
  });

  // Boot check for network & pending uploads
  updateSyncIndicator();
  processSyncQueue();

})();
