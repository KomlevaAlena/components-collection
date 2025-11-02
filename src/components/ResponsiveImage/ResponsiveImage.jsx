import './ResponsiveImage.scss'

export default function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  widths = [400, 800, 1200],
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  ratio = null 
}) {
  // Базовое имя файла без расширения
  const baseName = src.split('/').pop().replace(/\.[^/.]+$/, '')
  
  // Генерируем srcSet для оригинального формата и WebP
  const jpgSrcSet = generateSrcSet(baseName, widths, 'jpg')
  const webpSrcSet = generateSrcSet(baseName, widths, 'webp')
  
  const pictureClass = `responsive-image ${className} ${
    ratio ? `responsive-image--${ratio}` : ''
  }`

  return (
    <picture className={pictureClass}>
      {/* WebP версия */}
      <source 
        type="image/webp" 
        srcSet={webpSrcSet}
        sizes={sizes}
      />
      
      {/* Оригинальная версия */}
      <source 
        srcSet={jpgSrcSet}
        sizes={sizes}
      />
      
      {/* Fallback */}
      <img 
        src={`/assets/images/${src}`}
        srcSet={jpgSrcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="responsive-image__img"
      />
    </picture>
  )
}

// Вспомогательная функция для генерации srcSet
function generateSrcSet(baseName, widths, format) {
  return widths.map(width => 
    `/assets/images/${baseName}-${width}w.${format} ${width}w`
  ).join(', ')
}