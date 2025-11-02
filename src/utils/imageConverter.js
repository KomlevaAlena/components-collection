import sharp from 'sharp'

// Функция для конвертации в WebP
export async function convertToWebP(inputBuffer, quality = 80) {
  try {
    const webpBuffer = await sharp(inputBuffer)
      .webp({ quality })
      .toBuffer()
    return webpBuffer
  } catch (error) {
    console.error('WebP conversion error:', error)
    return null
  }
}

// Функция для ресайза изображений
export async function resizeImage(inputBuffer, width, height = null) {
  try {
    const resizedBuffer = await sharp(inputBuffer)
      .resize(width, height, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .toBuffer()
    return resizedBuffer
  } catch (error) {
    console.error('Resize error:', error)
    return null
  }
}

// Генерация srcSet для разных размеров
export function generateSrcSet(baseName, widths, format = 'jpg') {
  return widths.map(width => {
    const fileName = baseName.replace(/\.[^/.]+$/, '') // убираем расширение
    return `/assets/images/${fileName}-${width}w.${format} ${width}w`
  }).join(', ')
}