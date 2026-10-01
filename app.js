/**
 * ============================================================================
 * GRADUATE 2026 - PHOTOBOOTH APPLICATION (app.js)
 * Architecture: ES6+ Modular Vanilla JS, Silent Google Apps Script Upload,
 * Continuous Shutter Capture, In-App Album & Touch-Swipe Native Lightbox
 * ============================================================================
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. CONSTANTS & HARDCODED BACKEND CONFIGURATION
  // ==========================================================================
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJqgbbH2UBN-KzefwQspwHAU-iIx-W0gbcBGafuoFNNdzqT5lTlV3-C1lp8KCjuIhH/exec";

  // Transparent Luxury Graduation 2026 SVG Frame Overlay
  const GRADUATION_FRAME_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1440" width="1080" height="1440">
    <defs>
      <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff4b8"/>
        <stop offset="20%" stop-color="#f5d365"/>
        <stop offset="45%" stop-color="#d4af37"/>
        <stop offset="70%" stop-color="#9a7610"/>
        <stop offset="90%" stop-color="#ffd976"/>
        <stop offset="100%" stop-color="#fff8d6"/>
      </linearGradient>

      <linearGradient id="goldShimmer" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c99718"/>
        <stop offset="50%" stop-color="#fff1aa"/>
        <stop offset="100%" stop-color="#b88a14"/>
      </linearGradient>

      <filter id="cinematicGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
      </filter>
    </defs>

    <!-- 1. Contemporary Geometric Outer Framing -->
    <rect x="32" y="32" width="1016" height="1376" rx="20" fill="none" stroke="url(#goldMetallic)" stroke-width="4" />
    <rect x="46" y="46" width="988" height="1348" rx="14" fill="none" stroke="url(#goldMetallic)" stroke-width="1.2" stroke-dasharray="12 8" opacity="0.75" />

    <!-- 2. Studio Crosshair / Viewfinder Markings -->
    <line x1="540" y1="20" x2="540" y2="40" stroke="url(#goldMetallic)" stroke-width="2"/>
    <line x1="540" y1="1400" x2="540" y2="1420" stroke="url(#goldMetallic)" stroke-width="2"/>
    <line x1="20" y1="720" x2="40" y2="720" stroke="url(#goldMetallic)" stroke-width="2"/>
    <line x1="1040" y1="720" x2="1060" y2="720" stroke="url(#goldMetallic)" stroke-width="2"/>

    <!-- 3. Chic Architectural Corner Notches -->
    <g transform="translate(36, 36)">
      <path d="M 0 50 L 0 0 L 50 0" fill="none" stroke="url(#goldMetallic)" stroke-width="3"/>
      <circle cx="16" cy="16" r="4.5" fill="url(#goldMetallic)"/>
      <polygon points="34,16 37,23 44,26 37,29 34,36 31,29 24,26 31,23" fill="url(#goldShimmer)"/>
    </g>
    <g transform="translate(1044, 36)">
      <path d="M 0 50 L 0 0 L -50 0" fill="none" stroke="url(#goldMetallic)" stroke-width="3"/>
      <circle cx="-16" cy="16" r="4.5" fill="url(#goldMetallic)"/>
      <polygon points="-34,16 -31,23 -24,26 -31,29 -34,36 -37,29 -44,26 -37,23" fill="url(#goldShimmer)"/>
    </g>
    <g transform="translate(36, 1404)">
      <path d="M 0 -50 L 0 0 L 50 0" fill="none" stroke="url(#goldMetallic)" stroke-width="3"/>
      <circle cx="16" cy="-16" r="4.5" fill="url(#goldMetallic)"/>
      <polygon points="34,-16 37,-23 44,-26 37,-29 34,-36 31,-29 24,-26 31,-23" fill="url(#goldShimmer)"/>
    </g>
    <g transform="translate(1044, 1404)">
      <path d="M 0 -50 L 0 0 L -50 0" fill="none" stroke="url(#goldMetallic)" stroke-width="3"/>
      <circle cx="-16" cy="-16" r="4.5" fill="url(#goldMetallic)"/>
      <polygon points="-34,-16 -31,-23 -24,-26 -31,-29 -34,-36 -37,-29 -44,-26 -37,-23" fill="url(#goldShimmer)"/>
    </g>

    <!-- 4. Top Contemporary Header -->
    <g transform="translate(540, 95)" text-anchor="middle">
      <path d="M 0 -28 L 44 -12 L 0 4 L -44 -12 Z" fill="url(#goldMetallic)" filter="url(#cinematicGlow)"/>
      <path d="M -22 -2 L -22 13 C -22 20 22 20 22 13 L 22 -2" fill="url(#goldMetallic)" opacity="0.95"/>
      <path d="M 32 -6 C 36 2, 40 12, 42 22" fill="none" stroke="url(#goldMetallic)" stroke-width="2.5"/>
      <circle cx="42" cy="24" r="3.5" fill="url(#goldMetallic)"/>

      <text y="36" font-family="'Cinzel', 'Times New Roman', serif" font-size="20" font-weight="700" letter-spacing="8" fill="url(#goldMetallic)" filter="url(#cinematicGlow)">
        &#9733; CONGRATULATIONS &#9733;
      </text>
      <text y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#ffffff" filter="url(#cinematicGlow)">
        CLASS OF 2026
      </text>
    </g>

    <!-- 5. Bottom High-Fashion Badge -->
    <rect x="52" y="1215" width="976" height="175" rx="22" fill="#090a0e" fill-opacity="0.84" stroke="url(#goldMetallic)" stroke-width="2" />
    <rect x="62" y="1225" width="956" height="155" rx="16" fill="none" stroke="url(#goldMetallic)" stroke-width="1" stroke-dasharray="6 4" opacity="0.6"/>

    <g transform="translate(540, 1262)" text-anchor="middle">
      <g stroke="url(#goldMetallic)" fill="none" stroke-width="2.5">
        <path d="M -235 32 C -210 14, -185 6, -155 0"/>
        <path d="M 235 32 C 210 14, 185 6, 155 0"/>
      </g>
      <g fill="url(#goldMetallic)">
        <circle cx="-200" cy="16" r="5"/>
        <circle cx="-175" cy="7" r="4.5"/>
        <circle cx="-150" cy="0" r="4"/>
        <circle cx="200" cy="16" r="5"/>
        <circle cx="175" cy="7" r="4.5"/>
        <circle cx="150" cy="0" r="4"/>
      </g>

      <text y="24" font-family="'Cinzel', 'Times New Roman', serif" font-size="88" font-weight="900" letter-spacing="12" fill="url(#goldMetallic)" filter="url(#cinematicGlow)">
        2026
      </text>

      <text y="74" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5" fill="#ffffff" filter="url(#cinematicGlow)">
        Church Of The Virgin Mary and St. Mina
      </text>
      
      <text y="98" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="url(#goldShimmer)">
        GRADUATION CELEBRATION
      </text>
    </g>
  </svg>`;

  const GRADUATION_FRAME_DATA_URL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(GRADUATION_FRAME_SVG.trim());

  // Pre-load frame image for instant canvas compositing
  const frameImage = new Image();
  frameImage.crossOrigin = "anonymous";
  frameImage.src = GRADUATION_FRAME_DATA_URL;

  // ==========================================================================
  // 2. APPLICATION STATE & SESSION STORAGE
  // ==========================================================================
  const sessionPhotos = []; // Stores Base64 images for current guest session
  let currentLightboxIndex = 0;

  const appState = {
    userName: "",
    stream: null,
    facingMode: "user"
  };

  // ==========================================================================
  // 3. DOM ELEMENT REFERENCES
  // ==========================================================================
  const dom = {
    // Screens
    loginView: document.getElementById("login-view"),
    cameraView: document.getElementById("camera-view"),
    galleryView: document.getElementById("gallery-view"),
    lightboxView: document.getElementById("view-lightbox"),

    // Login Form
    loginForm: document.getElementById("login-form"),
    userNameInput: document.getElementById("user-name-input"),
    headerUserTag: document.getElementById("header-user-tag"),
    headerUserName: document.getElementById("header-user-name"),
    logoutBtn: document.getElementById("logout-btn"),

    // Camera Stream & Overlay
    video: document.getElementById("camera-stream"),
    cameraFrameOverlay: document.getElementById("camera-frame-overlay"),
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
    lightboxPhotoContainer: document.getElementById("lightbox-photo-container"),
    lightboxPhotoImg: document.getElementById("lightbox-photo-img"),
    lightboxCloseBtn: document.getElementById("lightbox-close-btn"),
    lightboxDownloadBtn: document.getElementById("lightbox-download-btn"),
  };

  // Mount SVG frame to viewfinder
  dom.cameraFrameOverlay.src = GRADUATION_FRAME_DATA_URL;

  // ==========================================================================
  // 4. SCREEN NAVIGATION
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
  // 5. CAMERA STREAM MANAGEMENT
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
  // 6. CONTINUOUS BACK-TO-BACK CAPTURE & COMPOSITING
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

    const width = dom.video.videoWidth || 1080;
    const height = dom.video.videoHeight || 1440;
    dom.canvas.width = width;
    dom.canvas.height = height;

    const ctx = dom.canvas.getContext("2d");

    // 2. Draw live video feed FIRST (mirrored horizontally if selfie camera)
    if (appState.facingMode === "user") {
      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(dom.video, 0, 0, width, height);
      ctx.restore();
    } else {
      ctx.drawImage(dom.video, 0, 0, width, height);
    }

    // 3. Draw Graduation 2026 Frame ON TOP of the photo
    ctx.drawImage(frameImage, 0, 0, width, height);

    // 4. Export high quality JPEG Base64
    const finalImage = dom.canvas.toDataURL("image/jpeg", 0.90);

    // 5. Store in global sessionPhotos (newest photo at index 0)
    sessionPhotos.unshift({
      id: Date.now(),
      dataUrl: finalImage,
      timestamp: new Date()
    });

    // 6. Update Circular Album Thumbnail Button
    updateGalleryButton();

    // 7. Silent Background Upload to Google Drive (Zero interruption)
    silentUploadToDrive(finalImage, appState.userName);
  }

  // ==========================================================================
  // 7. 100% SILENT BACKGROUND UPLOAD TO GOOGLE DRIVE
  // ==========================================================================
  async function silentUploadToDrive(imageBase64, userName) {
    const cleanName = (userName || "Guest").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `photo_${cleanName}_${Date.now()}.jpg`;

    // Google Apps Script doPost() expected fields: folderName, image, filename
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
  // 8. IN-APP GALLERY DRAWER LOGIC
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
  // 9. FULLSCREEN LIGHTBOX & TOUCH SWIPE MECHANICS
  // ==========================================================================
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentDiffX = 0;
  let startTime = 0;
  let isAnimatingTransition = false;

  function setLightboxImage(index, animateDirection = null) {
    if (!sessionPhotos[index]) return;
    currentLightboxIndex = index;
    const photo = sessionPhotos[index];

    const img = dom.lightboxPhotoImg;

    if (!animateDirection) {
      img.src = photo.dataUrl;
      img.classList.remove("is-swiping");
      img.classList.add("snap-transition");
      img.style.transform = "translateX(0) rotate(0deg)";
      img.style.opacity = "1";
      return;
    }

    // Swiping transition animation
    isAnimatingTransition = true;
    img.classList.add("snap-transition");

    if (animateDirection === "left") {
      // Current photo slides out left
      img.style.transform = "translateX(-120%) rotate(-8deg)";
      img.style.opacity = "0";

      setTimeout(() => {
        img.src = photo.dataUrl;
        img.classList.remove("snap-transition");
        // Place new photo offscreen to the right
        img.style.transform = "translateX(120%) rotate(8deg)";
        img.offsetHeight; // Force reflow

        img.classList.add("snap-transition");
        img.style.transform = "translateX(0) rotate(0deg)";
        img.style.opacity = "1";
        setTimeout(() => { isAnimatingTransition = false; }, 280);
      }, 160);

    } else if (animateDirection === "right") {
      // Current photo slides out right
      img.style.transform = "translateX(120%) rotate(8deg)";
      img.style.opacity = "0";

      setTimeout(() => {
        img.src = photo.dataUrl;
        img.classList.remove("snap-transition");
        // Place new photo offscreen to the left
        img.style.transform = "translateX(-120%) rotate(-8deg)";
        img.offsetHeight; // Force reflow

        img.classList.add("snap-transition");
        img.style.transform = "translateX(0) rotate(0deg)";
        img.style.opacity = "1";
        setTimeout(() => { isAnimatingTransition = false; }, 280);
      }, 160);
    }
  }

  function openLightbox(index) {
    if (!sessionPhotos[index]) return;
    dom.lightboxView.classList.add("lightbox-active");
    setLightboxImage(index, null);
  }

  function closeLightbox() {
    dom.lightboxView.classList.remove("lightbox-active");
    const img = dom.lightboxPhotoImg;
    img.classList.remove("is-swiping");
    img.style.transform = "translateX(0) rotate(0deg)";
    img.style.opacity = "1";
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

  // --- TOUCH SWIPE EVENT LISTENERS ---
  const touchArea = dom.lightboxPhotoContainer;

  function onTouchStart(e) {
    if (isAnimatingTransition) return;
    const touch = e.touches ? e.touches[0] : e;
    isDragging = true;
    startX = touch.clientX;
    startY = touch.clientY;
    currentDiffX = 0;
    startTime = Date.now();

    const img = dom.lightboxPhotoImg;
    img.classList.remove("snap-transition");
    img.classList.add("is-swiping");
  }

  function onTouchMove(e) {
    if (!isDragging || isAnimatingTransition) return;
    const touch = e.touches ? e.touches[0] : e;
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    // Prevent vertical scrolling interference
    if (Math.abs(diffX) > Math.abs(diffY) && e.cancelable) {
      e.preventDefault();
    }

    currentDiffX = diffX;

    // Elastic boundary resistance if at edges
    const isAtStart = currentLightboxIndex === 0;
    const isAtEnd = currentLightboxIndex === sessionPhotos.length - 1;
    let visualX = diffX;

    if ((isAtStart && diffX > 0) || (isAtEnd && diffX < 0)) {
      visualX = diffX * 0.25; // 75% resistance damping at boundary
    }

    const img = dom.lightboxPhotoImg;
    const rotation = visualX * 0.035;
    const opacity = Math.max(0.65, 1 - (Math.abs(visualX) / 800));

    img.style.transform = `translateX(${visualX}px) rotate(${rotation}deg)`;
    img.style.opacity = opacity.toString();
  }

  function onTouchEnd() {
    if (!isDragging || isAnimatingTransition) return;
    isDragging = false;

    const img = dom.lightboxPhotoImg;
    img.classList.remove("is-swiping");
    img.classList.add("snap-transition");

    const timeElapsed = Date.now() - startTime;
    const isQuickFlick = timeElapsed < 250 && Math.abs(currentDiffX) > 35;
    const isPastThreshold = Math.abs(currentDiffX) > 65;

    // SWIPE LEFT -> NEXT PHOTO (higher index in sessionPhotos array)
    if ((isPastThreshold || isQuickFlick) && currentDiffX < 0) {
      if (currentLightboxIndex < sessionPhotos.length - 1) {
        setLightboxImage(currentLightboxIndex + 1, "left");
      } else {
        // Snap back to center
        img.style.transform = "translateX(0) rotate(0deg)";
        img.style.opacity = "1";
      }
    }
    // SWIPE RIGHT -> PREVIOUS PHOTO (lower index in sessionPhotos array)
    else if ((isPastThreshold || isQuickFlick) && currentDiffX > 0) {
      if (currentLightboxIndex > 0) {
        setLightboxImage(currentLightboxIndex - 1, "right");
      } else {
        // Snap back to center
        img.style.transform = "translateX(0) rotate(0deg)";
        img.style.opacity = "1";
      }
    }
    // Snap back to center
    else {
      img.style.transform = "translateX(0) rotate(0deg)";
      img.style.opacity = "1";
    }

    currentDiffX = 0;
  }

  // Attach touch events for mobile
  touchArea.addEventListener("touchstart", onTouchStart, { passive: false });
  touchArea.addEventListener("touchmove", onTouchMove, { passive: false });
  touchArea.addEventListener("touchend", onTouchEnd);
  touchArea.addEventListener("touchcancel", onTouchEnd);

  // Attach pointer / mouse events for desktop drag compatibility
  touchArea.addEventListener("mousedown", onTouchStart);
  window.addEventListener("mousemove", (e) => {
    if (isDragging) onTouchMove(e);
  });
  window.addEventListener("mouseup", () => {
    if (isDragging) onTouchEnd();
  });

  // Keyboard navigation support
  window.addEventListener("keydown", (e) => {
    if (!dom.lightboxView.classList.contains("lightbox-active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && currentLightboxIndex > 0) {
      setLightboxImage(currentLightboxIndex - 1, "right");
    }
    if (e.key === "ArrowRight" && currentLightboxIndex < sessionPhotos.length - 1) {
      setLightboxImage(currentLightboxIndex + 1, "left");
    }
  });

  // Close when clicking outside image
  dom.lightboxView.addEventListener("click", (e) => {
    if (e.target === dom.lightboxView || e.target === dom.lightboxPhotoContainer) {
      closeLightbox();
    }
  });

  // ==========================================================================
  // 10. GLOBAL EVENT LISTENERS
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

  // Lightbox Buttons
  dom.lightboxCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  dom.lightboxDownloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    downloadCurrentLightboxPhoto();
  });

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
