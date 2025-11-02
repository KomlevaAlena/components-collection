import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const imagesDir = './src/assets/images'
const outputDir = './dist/assets/images'

// Размеры для генерации
const WIDTHS = [400, 800, 1200, 1600]

// Создаем выходную директорию
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Функция для обработки одного изображения
async function processImage(filePath) {
  const fileName = path.basename(filePath)
  const baseName = fileName.replace(/\.[^/.]+$/, '')
  
  console.log(`Processing: ${fileName}`)
  
  try {
    const imageBuffer = fs.readFileSync(filePath)
    
    // Генерируем версии для каждого размера
    for (const width of WIDTHS) {
      // WebP версия
      const webpBuffer = await sharp(imageBuffer)
        .resize(width)
        .webp({ quality: 80 })
        .toBuffer()
      
      fs.writeFileSync(
        path.join(outputDir, `${baseName}-${width}w.webp`),
        webpBuffer
      )
      
      // JPG/PNG версия (оригинальный формат)
      const extension = path.extname(fileName).toLowerCase()
      const format = extension === '.png' ? 'png' : 'jpeg'
      
      const originalBuffer = await sharp(imageBuffer)
        .resize(width)
        [format]({ quality: 85 })
        .toBuffer()
      
      fs.writeFileSync(
        path.join(outputDir, `${baseName}-${width}w${extension}`),
        originalBuffer
      )
    }
    
    console.log(`✅ Completed: ${fileName}`)
    
  } catch (error) {
    console.error(`❌ Error processing ${fileName}:`, error)
  }
}

// Основная функция
async function processAllImages() {
  try {
    const files = fs.readdirSync(imagesDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    )
    
    console.log(`Found ${imageFiles.length} images to process`)
    
    for (const file of imageFiles) {
      await processImage(path.join(imagesDir, file))
    }
    
    console.log('🎉 All images processed!')
    
  } catch (error) {
    console.error('Error reading images directory:', error)
  }
}

// Запускаем обработку
processAllImages()