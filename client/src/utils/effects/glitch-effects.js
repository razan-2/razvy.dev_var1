/**
 * Apply a random glitch effect to an HTML element
 * @param {HTMLElement|null} element - The element to apply the glitch effect to
 * @param {number} duration - Duration of the glitch effect in milliseconds
 */
export function randomGlitch(element, duration = 300) {
  if (!element) return;
  
  // Store original styles
  const originalTransform = element.style.transform;
  const originalFilter = element.style.filter;
  
  // Apply glitch effect
  element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
  element.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${1 + Math.random()})`; 
  
  // Reset after duration
  setTimeout(() => {
    element.style.transform = originalTransform;
    element.style.filter = originalFilter;
  }, duration);
}

/**
 * Create a noise overlay inside a container element
 * @param {HTMLElement|null} container - The container to add the noise overlay to
 */
export function createNoiseOverlay(container) {
  if (!container) return;
  
  // Wait for next frame to ensure container has dimensions
  requestAnimationFrame(() => {
    // Get container dimensions
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Check if dimensions are valid
    if (!width || !height || width <= 0 || height <= 0) {
      console.warn('Container has invalid dimensions for noise overlay');
      return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Style canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.05';
    canvas.style.mixBlendMode = 'overlay';
    
    // Add to container
    container.style.position = 'relative';
    container.appendChild(canvas);
    
    // Draw noise function
    function drawNoise() {
      // Verify canvas dimensions are still valid
      if (canvas.width <= 0 || canvas.height <= 0) {
        return;
      }
      
      try {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = 255;
        }
        
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawNoise);
      } catch (error) {
        console.error('Error drawing noise:', error);
      }
    }
    
    // Add resize observer to update canvas size when container resizes
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
        }
      }
    });
    
    resizeObserver.observe(container);
    
    // Start drawing noise
    drawNoise();
  });
}

/**
 * Apply a text glitch effect
 * @param {string} text - The text to glitch
 * @returns {string} - HTML with glitched text
 */
export function glitchText(text) {
  return `<span class="glitch-text" data-text="${text}">${text}</span>`;
}

/**
 * Create a glitch image effect with RGB splitting
 * @param {string} imageUrl - URL of the image
 * @param {HTMLElement} container - Container to append the glitch image to
 */
export function createGlitchImage(imageUrl, container) {
  if (!container) return;
  
  // Create container
  const glitchContainer = document.createElement('div');
  glitchContainer.className = 'glitch-image-container';
  
  // Create RGB layers
  const layerR = document.createElement('div');
  layerR.className = 'glitch-image-r';
  layerR.style.backgroundImage = `url(${imageUrl})`;
  
  const layerG = document.createElement('div');
  layerG.className = 'glitch-image-g';
  layerG.style.backgroundImage = `url(${imageUrl})`;
  
  const layerB = document.createElement('div');
  layerB.className = 'glitch-image-b';
  layerB.style.backgroundImage = `url(${imageUrl})`;
  
  // Base image
  const baseImage = document.createElement('img');
  baseImage.src = imageUrl;
  baseImage.style.width = '100%';
  baseImage.style.height = '100%';
  baseImage.style.objectFit = 'cover';
  
  // Append all elements
  glitchContainer.appendChild(baseImage);
  glitchContainer.appendChild(layerR);
  glitchContainer.appendChild(layerG);
  glitchContainer.appendChild(layerB);
  
  container.appendChild(glitchContainer);
  
  // Trigger glitch effect randomly
  setInterval(() => {
    glitchContainer.classList.add('glitching');
    setTimeout(() => {
      glitchContainer.classList.remove('glitching');
    }, 500);
  }, Math.random() * 5000 + 3000);
}
