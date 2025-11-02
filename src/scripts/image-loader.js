// Утилита для responsive images в обычном HTML
class ResponsiveImage {
  constructor(container) {
    this.container = container
    this.imgElement = container.querySelector('img')
    this.init()
  }
  
  init() {
    if (!this.imgElement) return
    
    const src = this.imgElement.getAttribute('data-src')
    const alt = this.imgElement.getAttribute('alt')
    const widths = this.container.getAttribute('data-widths') || '320,640,1024,1600'
    const sizes = this.container.getAttribute('data-sizes') || '(max-width: 768px) 100vw, 1200px'
    
    if (src) {
      this.createResponsiveImage(src, alt, widths.split(','), sizes)
    }
  }
  
  createResponsiveImage(src, alt, widths, sizes) {
    const picture = document.createElement('picture')
    picture.className = 'responsive-image'
    
    // WebP source
    const webpSource = document.createElement('source')
    webpSource.type = 'image/webp'
    webpSource.srcset = widths.map(w => `${src}?width=${w}&format=webp ${w}w`).join(', ')
    webpSource.sizes = sizes
    
    // Fallback source
    const fallbackSource = document.createElement('source')
    fallbackSource.srcset = widths.map(w => `${src}?width=${w} ${w}w`).join(', ')
    fallbackSource.sizes = sizes
    
    // Fallback img
    const img = document.createElement('img')
    img.src = src
    img.srcset = fallbackSource.srcset
    img.sizes = sizes
    img.alt = alt
    img.loading = 'lazy'
    img.className = 'responsive-image__img'
    
    picture.appendChild(webpSource)
    picture.appendChild(fallbackSource)
    picture.appendChild(img)
    
    this.container.innerHTML = ''
    this.container.appendChild(picture)
  }
}

// Инициализация всех responsive images на странице
document.addEventListener('DOMContentLoaded', () => {
  const imageContainers = document.querySelectorAll('[data-responsive-image]')
  imageContainers.forEach(container => {
    new ResponsiveImage(container)
  })
})