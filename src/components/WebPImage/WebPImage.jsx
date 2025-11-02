import './WebPImage.scss'

export default function WebPImage({ 
  src, 
  alt, 
  className = '',
  width,
  height,
  lazy = true 
}) {
  // Извлекаем имя файла без расширения
  const baseName = src.replace(/\.[^/.]+$/, '')
  
  return (
    <picture className={`webp-image ${className}`}>
      {/* WebP версия */}
      <source 
        srcSet={`/assets/images/${baseName}.webp`}
        type="image/webp"
      />
      
      {/* Оригинальная версия */}
      <img 
        src={`/assets/images/${src}`}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className="webp-image__img"
      />
    </picture>
  )
}