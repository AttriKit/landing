/**
 * Image Lightbox
 * Click on markdown images to view them in fullscreen
 */

(function() {
  'use strict';

  // Create lightbox elements
  const overlay = document.createElement('div');
  overlay.id = 'image-lightbox-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  const img = document.createElement('img');
  img.id = 'image-lightbox-img';
  img.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    cursor: zoom-out;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.id = 'image-lightbox-close';
  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  `;
  closeBtn.onmouseover = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
  };

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  let isOpen = false;

  // Open lightbox
  function openLightbox(src) {
    if (isOpen) return;
    isOpen = true;

    img.src = src;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Trigger reflow for transition
    overlay.offsetHeight;

    overlay.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }

  // Close lightbox
  function closeLightbox() {
    if (!isOpen) return;
    isOpen = false;

    overlay.style.opacity = '0';
    img.style.transform = 'scale(0.9)';

    setTimeout(() => {
      overlay.style.display = 'none';
      img.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  // Event listeners
  overlay.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Keyboard: ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeLightbox();
    }
  });

  // Add click handler to all markdown images
  function attachImageHandlers() {
    const images = document.querySelectorAll('.markdown-content img, .blog-content img');
    images.forEach(image => {
      if (!image.hasAttribute('data-lightbox-loaded')) {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(image.src);
        });
        image.setAttribute('data-lightbox-loaded', 'true');
      }
    });
  }

  // Initial attach
  attachImageHandlers();

  // Re-attach on content changes (for SPA navigation)
  const observer = new MutationObserver(() => {
    attachImageHandlers();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
