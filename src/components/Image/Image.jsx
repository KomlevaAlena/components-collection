import { useState, useEffect } from 'react'
import './Image.scss'

export default function Image({ 
  src, 
  alt, 
  className = '', 
  widths = [320, 640, 1024, 1600],
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  lazy = true
}) {
  const [imageData, setImageData] = useState(null)
  
  useEffect(() => {
    const loadImage = async () => {
      try {
        // Для продакшена используем собранные ассеты
        const basePath = import.meta.env.PROD ? '' : '/src/assets/images/'
        
        // Генерируем srcSet для разных разрешений
        const srcSet = widths.map(width => {
          const webpPath = `${basePath}${src}?width=${width}&format=webp`
          const fallbackPath = `${basePath}${src}?width=${width}`
          return {
            webp: webpPath,
            fallback: fallbackPath,
            width: `${width}w`
          }
        })
        
        setImageData({
          src: `${basePath}${src}`,
          srcSet,
          webpSrcSet: srcSet.map(item => `${item.webp} ${item.width}`).join(', '),
          fallbackSrcSet: srcSet.map(item => `${item.fallback} ${item.width}`).join(', ')
        })
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }
    
    loadImage()
  }, [src, widths])

  if (!imageData) {
    return <div className={`image-loading ${className}`}>Loading...</div>
  }

  return (
    <picture className={`image ${className}`}>
      {/* WebP sources для ретины */}
      <source 
        type="image/webp" 
        srcSet={imageData.webpSrcSet}
        sizes={sizes}
      />
      
      {/* Fallback sources */}
      <source 
        srcSet={imageData.fallbackSrcSet}
        sizes={sizes}
      />
      
      {/* Fallback img */}
      <img 
        src={imageData.src}
        srcSet={imageData.fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className="image__img"
      />
    </picture>
  )
}