// Простой загрузчик изображений для HTML
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]')
  
  images.forEach(img => {
    const src = img.getAttribute('data-src')
    const alt = img.getAttribute('alt') || ''
    const widths = img.getAttribute('data-widths') || '400,800,1200'
    const sizes = img.getAttribute('data-sizes') || '100vw'
    
    if (src) {
      createResponsiveImage(img, src, alt, widths, sizes)
    }
  })
  
  function createResponsiveImage(imgElement, src, alt, widths, sizes) {
    const baseName = src.split('/').pop().replace(/\.[^/.]+$/, '')
    const widthArray = widths.split(',').map(w => w.trim())
    
    const picture = document.createElement('picture')
    picture.className = 'responsive-image'
    
    // WebP source
    const webpSource = document.createElement('source')
    webpSource.type = 'image/webp'
    webpSource.srcset = widthArray.map(w => 
      `/assets/images/${baseName}-${w}w.webp ${w}w`
    ).join(', ')
    webpSource.sizes = sizes
    
    // Original format source
    const originalSource = document.createElement('source')
    const extension = src.split('.').pop()
    originalSource.srcset = widthArray.map(w => 
      `/assets/images/${baseName}-${w}w.${extension} ${w}w`
    ).join(', ')
    originalSource.sizes = sizes
    
    // Fallback image
    const img = document.createElement('img')
    img.src = `/assets/images/${src}`
    img.srcset = originalSource.srcset
    img.sizes = sizes
    img.alt = alt
    img.loading = 'lazy'
    img.className = 'responsive-image__img'
    
    picture.appendChild(webpSource)
    picture.appendChild(originalSource)
    picture.appendChild(img)
    
    // Заменяем оригинальный img
    imgElement.parentNode.replaceChild(picture, imgElement)
  }
})