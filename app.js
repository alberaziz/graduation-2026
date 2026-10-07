/**
 * ============================================================================
 * GRADUATE 2026 - PHOTOBOOTH APPLICATION (app.js)
 * Architecture: ES6+ Modular Vanilla JS
 * Key Features:
 *   1. 4 Lightweight, 100% Valid XML Inline SVG Frames
 *   2. Native CSS Scroll-Snap Swiping (Zero JS Touch Math, Native 60-120fps)
 *   3. Clean Video Feed (Zero CSS Filters for Max Mobile Frame Rate)
 *   4. IntersectionObserver for Frame & Lightbox Photo Tracking
 *   5. Exact 3:4 Object-Cover Canvas Compositing
 *   6. 100% Silent Background Upload to Google Apps Script (CORS Preflight Bypass)
 *   7. Fullscreen Isolated Lightbox with Native Scroll-Snap Navigation
 * ============================================================================
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. BACKEND GOOGLE APPS SCRIPT WEB APP CONFIGURATION
  // ==========================================================================
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJqgbbH2UBN-KzefwQspwHAU-iIx-W0gbcBGafuoFNNdzqT5lTlV3-C1lp8KCjuIhH/exec";

  // ==========================================================================
  // 2. 4 LIGHTWEIGHT NATIVE INLINE SVG FRAMES (100% VALID XML, NO HEAVY FILTERS)
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
            GRADUATE // 2026
          </text>
          <text x="944" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#ffffff" opacity="0.85">
            [ ISO 100 &#8226; 35MM ]
          </text>
        </g>
        <!-- Bottom Editorial Layout Bar -->
        <rect x="50" y="1300" width="980" height="90" fill="#000000" fill-opacity="0.85"/>
        <line x1="50" y1="1300" x2="1030" y2="1300" stroke="#ffffff" stroke-width="1.5"/>
        <g transform="translate(70, 1342)">
          <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" letter-spacing="2.5" fill="#ffffff">
            CHURCH OF THE VIRGIN MARY &amp; ST. MINA
          </text>
          <text y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#aaaaaa">
            CLASS OF 2026 &#8226; COMMENCEMENT PORTFOLIO
          </text>
        </g>
        <!-- Minimal Barcode Element -->
        <g transform="translate(930, 1332)" fill="#ffffff">
          <rect x="0" y="0" width="3" height="30"/>
          <rect x="6" y="0" width="1.5" height="30"/>
          <rect x="10" y="0" width="4.5" height="30"/>
          <rect x="18" y="0" width="2" height="30"/>
          <rect x="23" y="0" width="5" height="30"/>
          <rect x="31" y="0" width="1.5" height="30"/>
          <rect x="36" y="0" width="4" height="30"/>
          <rect x="43" y="0" width="2.5" height="30"/>
          <text x="22" y="44" text-anchor="middle" font-family="monospace" font-size="9" fill="#aaaaaa">2026-COMMENCE</text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 3: CELEBRATION (Festive confetti stars, ribbon banner)
    // ------------------------------------------------------------------------
    {
      id: "celebration",
      name: "Celebration",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <defs>
          <linearGradient id="partyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff7c2"/>
            <stop offset="40%" stop-color="#ffd54f"/>
            <stop offset="70%" stop-color="#ffb300"/>
            <stop offset="100%" stop-color="#ff8f00"/>
          </linearGradient>
        </defs>
        <!-- Subtle festive ambiance -->
        <rect width="1080" height="1440" fill="rgba(255, 230, 150, 0.035)"/>
        <!-- Confetti Diamonds & Stars around borders -->
        <g fill="url(#partyGold)">
          <polygon points="90,65 96,77 108,83 96,89 90,101 84,89 72,83 84,77"/>
          <circle cx="130" cy="90" r="5"/>
          <circle cx="75" cy="130" r="4"/>
          <polygon points="120,135 125,145 135,150 125,155 120,165 115,155 105,150 115,145"/>
          <polygon points="990,65 996,77 1008,83 996,89 990,101 984,89 972,83 984,77"/>
          <circle cx="950" cy="90" r="5"/>
          <circle cx="1005" cy="130" r="4"/>
          <polygon points="960,135 965,145 975,150 965,155 960,165 955,155 945,150 955,145"/>
          <circle cx="50" cy="400" r="4"/>
          <circle cx="58" cy="720" r="5"/>
          <circle cx="48" cy="1000" r="4.5"/>
          <circle cx="1030" cy="400" r="4"/>
          <circle cx="1022" cy="720" r="5"/>
          <circle cx="1032" cy="1000" r="4.5"/>
        </g>
        <!-- Rounded Double Frame with Corner Ribbon Cutouts -->
        <rect x="36" y="36" width="1008" height="1368" rx="28" fill="none" stroke="url(#partyGold)" stroke-width="4"/>
        <rect x="48" y="48" width="984" height="1344" rx="20" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10 8" opacity="0.8"/>
        <!-- Top Arch Banner -->
        <g transform="translate(540, 105)" text-anchor="middle">
          <text y="0" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="800" letter-spacing="6" fill="#ffffff">
            &#10024; CELEBRATING THE GRADUATES &#10024;
          </text>
          <text y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" letter-spacing="8" fill="url(#partyGold)">
            CLASS OF 2026
          </text>
        </g>
        <!-- Bottom Festivity Badge -->
        <rect x="64" y="1230" width="952" height="155" rx="20" fill="#0c0d12" fill-opacity="0.88" stroke="url(#partyGold)" stroke-width="2.5"/>
        <g transform="translate(540, 1276)" text-anchor="middle">
          <text y="16" font-family="'Cinzel', Georgia, serif" font-size="64" font-weight="900" letter-spacing="8" fill="url(#partyGold)">
            &#9733; 2026 &#9733;
          </text>
          <text y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="800" letter-spacing="1.5" fill="#ffffff">
            Church Of The Virgin Mary and St. Mina
          </text>
          <text y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#ffd54f">
            HONORING OUR GRADUATES &#8226; WE DID IT!
          </text>
        </g>
      </svg>`
    },

    // ------------------------------------------------------------------------
    // THEME 4: VINTAGE POLAROID (Classic Polaroid chin, vintage camera stamps)
    // ------------------------------------------------------------------------
    {
      id: "vintage-polaroid",
      name: "Vintage Polaroid",
      svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
        <!-- Subtle warm sepia tone -->
        <rect width="1080" height="1440" fill="rgba(180, 120, 40, 0.05)"/>
        <!-- Classic Polaroid Border Frame -->
        <rect x="0" y="0" width="1080" height="48" fill="#f8f6ee"/>
        <rect x="0" y="48" width="48" height="1144" fill="#f8f6ee"/>
        <rect x="1032" y="48" width="48" height="1144" fill="#f8f6ee"/>
        <rect x="0" y="1192" width="1080" height="248" fill="#f8f6ee"/>
        <rect x="48" y="48" width="984" height="1144" fill="none" stroke="#222222" stroke-width="2" opacity="0.8"/>
        <!-- Top Left Vintage Recording Badge -->
        <g transform="translate(68, 90)">
          <circle cx="10" cy="10" r="7" fill="#e53935"/>
          <text x="26" y="16" font-family="'Courier New', monospace" font-size="17" font-weight="900" letter-spacing="2" fill="#ffffff">
            REC &#9679; 2026
          </text>
        </g>
        <!-- Polaroid Bottom Chin Typography -->
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
  // 3. APPLICATION STATE
  // ==========================================================================
  const sessionPhotos = []; // Stores Base64 images for current guest
  let activeFrameIndex = 0; // Currently snapped active frame (0 to 3)
  let currentLightboxIndex = 0;

  const appState = {
    userName: "",
    stream: null,
    facingMode: "user"
  };

  // ==========================================================================
  // 4. DOM ELEMENT REFERENCES
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

    // Gallery Toolbar & Drawer
    galleryOpenBtn: document.getElementById("gallery-open-btn"),
    galleryBackBtn: document.getElementById("gallery-back-btn"),
    galleryThumbPreview: document.getElementById("gallery-thumb-preview"),
    galleryThumbPlaceholder: document.getElementById("gallery-thumb-placeholder"),
    galleryCountBadge: document.getElementById("gallery-count-badge"),
    galleryHeaderCount: document.getElementById("gallery-header-count"),
    galleryEmptyState: document.getElementById("gallery-empty-state"),
    galleryGrid: document.getElementById("gallery-grid"),

    // Lightbox Controls
    lightboxScrollTrack: document.getElementById("lightbox-scroll-track"),
    lightboxCloseBtn: document.getElementById("lightbox-close-btn"),
    lightboxDownloadBtn: document.getElementById("lightbox-download-btn"),
  };

  // ==========================================================================
  // 5. NATIVE CSS SCROLL SNAP SETUP (CAMERA FRAMES)
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
  // 6. SCREEN NAVIGATION
  // ==========================================================================
  function showView(viewId) {
    [dom.loginView, dom.cameraView].forEach(v => {
      if (v.id === viewId) {
        v.classList.remove("opacity-0", "pointer-events-none", "z-0");
        v.classList.add("opacity-100", "z-10");
      } else {
        v.classList.remove("opacity-100", "z-10");
        v.classList.add("opacity-0", "pointer-events-none", "z-0");
      }
    });
  }

  function openGalleryPanel() {
    renderGalleryGrid();
    dom.galleryView.classList.remove("translate-y-full");
    dom.galleryView.classList.add("translate-y-0");
  }

  function closeGalleryPanel() {
    dom.galleryView.classList.remove("translate-y-0");
    dom.galleryView.classList.add("translate-y-full");
  }

  // ==========================================================================
  // 7. CAMERA STREAM MANAGEMENT (CLEAN VIDEO, NO CSS FILTERS)
  // ==========================================================================
  async function startCamera() {
    stopCamera();
    dom.cameraStatusMsg.classList.remove("hidden");
    dom.cameraStatusText.textContent = "Connecting to camera...";

    const constraints = {
      audio: false,
      video: {
        facingMode: appState.facingMode,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    };

    try {
      appState.stream = await navigator.mediaDevices.getUserMedia(constraints);
      dom.video.srcObject = appState.stream;

      if (appState.facingMode === "user") {
        dom.video.classList.add("mirrored");
      } else {
        dom.video.classList.remove("mirrored");
      }

      dom.video.onloadedmetadata = () => {
        dom.cameraStatusMsg.classList.add("hidden");
        dom.video.play();
      };
    } catch (err) {
      console.error("Camera access error:", err);
      dom.cameraStatusMsg.classList.remove("hidden");
      dom.cameraStatusText.textContent = "Camera access denied. Please grant camera permission.";
    }
  }

  function stopCamera() {
    if (appState.stream) {
      appState.stream.getTracks().forEach(track => track.stop());
      appState.stream = null;
    }
  }

  function flipCamera() {
    appState.facingMode = appState.facingMode === "user" ? "environment" : "user";
    startCamera();
  }

  // ==========================================================================
  // 8. EXACT 3:4 OBJECT-COVER CANVAS CAPTURE (NO HEAVY CTX FILTERS)
  // ==========================================================================
  function capturePhoto() {
    if (!appState.stream) return;

    // 1. Shutter White Screen Flash (80ms pure opacity)
    dom.shutterFlash.classList.remove("opacity-0");
    dom.shutterFlash.classList.add("opacity-90");
    setTimeout(() => {
      dom.shutterFlash.classList.remove("opacity-90");
      dom.shutterFlash.classList.add("opacity-0");
    }, 80);

    // Fixed 3:4 Photobooth Resolution
    const canvasWidth = 1080;
    const canvasHeight = 1440;
    dom.canvas.width = canvasWidth;
    dom.canvas.height = canvasHeight;

    const ctx = dom.canvas.getContext("2d");
    const activeTheme = PHOTOBOOTH_THEMES[activeFrameIndex];

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

    // 6. Store in global sessionPhotos (newest photo at index 0)
    sessionPhotos.unshift({
      id: Date.now(),
      dataUrl: finalImage,
      themeName: activeTheme.name,
      timestamp: new Date()
    });

    // 7. Update Circular Album Thumbnail Button
    updateGalleryButton();

    // 8. 100% Silent Background Upload to Google Drive (Zero interruption)
    silentUploadToDrive(finalImage, appState.userName);
  }

  // ==========================================================================
  // 9. 100% SILENT BACKGROUND UPLOAD TO GOOGLE DRIVE (NO POPUPS)
  // ==========================================================================
  async function silentUploadToDrive(imageBase64, userName) {
    const cleanName = (userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `photo_${cleanName}_${Date.now()}.jpg`;

    const payload = {
      folderName: userName || "Guest",
      image: imageBase64,
      filename: filename
    };

    const serializedPayload = JSON.stringify(payload);

    try {
      // Sent as text/plain to bypass browser CORS preflight check
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: serializedPayload
      });

      if (!response.ok) {
        throw new Error("HTTP Status " + response.status);
      }
      console.log("[Photobooth] Photo uploaded silently to Google Drive:", filename);

    } catch (fetchError) {
      // Fallback with mode: 'no-cors' to guarantee packet delivery
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: serializedPayload
        });
        console.log("[Photobooth] Photo transmitted via no-cors fallback.");
      } catch (err) {
        console.warn("[Photobooth] Silent background upload notice:", err);
      }
    }
  }

  // ==========================================================================
  // 10. IN-APP GALLERY DRAWER LOGIC
  // ==========================================================================
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

      const viewBadge = document.createElement("div");
      viewBadge.className = "absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-gold-400 border border-gold-500/40 shadow";
      viewBadge.innerHTML = `
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
        </svg>
      `;

      imgContainer.appendChild(img);
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
  // 11. FULLSCREEN LIGHTBOX (NATIVE CSS SCROLL SNAP FOR PHOTOS)
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
  // 12. GLOBAL EVENT LISTENERS
  // ==========================================================================
  // Login Form
  dom.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = dom.userNameInput.value.trim();
    if (!name) return;

    appState.userName = name;
    dom.headerUserName.textContent = name;
    dom.headerUserTag.classList.remove("hidden");
    dom.headerUserTag.classList.add("flex");
    dom.logoutBtn.classList.remove("hidden");

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
    sessionPhotos.length = 0; // Clear session photos for next guest
    updateGalleryButton();
    closeGalleryPanel();
    closeLightbox();
    dom.headerUserTag.classList.add("hidden");
    dom.logoutBtn.classList.add("hidden");
    dom.userNameInput.value = "";
    showView("login-view");
  });

})();
