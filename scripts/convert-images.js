import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = './src/assets/images';
const outputDir = './public/assets/images';

console.log('🚀 Starting image conversion...');

// Проверяем существует ли исходная папка
if (!fs.existsSync(sourceDir)) {
  console.log('📁 Source directory not found, creating...');
  fs.mkdirSync(sourceDir, { recursive: true });
  console.log('💡 Please add images to src/assets/images/ folder');
  process.exit(0);
}

// Создаем выходную папку
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  console.log(`📁 Found ${imageFiles.length} images in src/assets/images/`);

  if (imageFiles.length === 0) {
    console.log('💡 No images to convert. Add images to src/assets/images/');
    process.exit(0);
  }

  let convertedCount = 0;
  let errorCount = 0;

  // Обрабатываем каждое изображение
  for (const file of imageFiles) {
    try {
      const sourcePath = path.join(sourceDir, file);
      const baseName = file.replace(/\.[^/.]+$/, '');
      
      console.log(`🔄 Processing: ${file}`);
      
      const imageBuffer = fs.readFileSync(sourcePath);
      
      // 1. Создаем WebP версию
      const webpBuffer = await sharp(imageBuffer)
        .webp({ 
          quality: 80,
          effort: 6 // лучшее сжатие
        })
        .toBuffer();
      
      fs.writeFileSync(path.join(outputDir, `${baseName}.webp`), webpBuffer);
      
      // 2. Создаем оптимизированную оригинальную версию
      const extension = path.extname(file).toLowerCase();
      let optimizedBuffer;
      
      if (extension === '.png') {
        optimizedBuffer = await sharp(imageBuffer)
          .png({ compressionLevel: 9, quality: 80 })
          .toBuffer();
      } else {
        // jpg/jpeg
        optimizedBuffer = await sharp(imageBuffer)
          .jpeg({ 
            quality: 85,
            mozjpeg: true 
          })
          .toBuffer();
      }
      
      fs.writeFileSync(path.join(outputDir, file), optimizedBuffer);
      
      console.log(`✅ Converted: ${file} → ${baseName}.webp + ${file} (optimized)`);
      convertedCount++;
      
    } catch (error) {
      console.error(`❌ Failed to convert ${file}:`, error.message);
      errorCount++;
      
      // Пробуем просто скопировать оригинал как fallback
      try {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(outputDir, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📋 Copied original: ${file} (as fallback)`);
      } catch (copyError) {
        console.error(`💥 Failed to copy ${file}:`, copyError.message);
      }
    }
  }

  console.log('\n📊 Conversion Summary:');
  console.log(`✅ Successfully converted: ${convertedCount} images`);
  console.log(`❌ Errors: ${errorCount} images`);
  
  if (errorCount > 0) {
    console.log('💡 Some images failed, but build continues...');
  }
  
  // Показываем итоговый список файлов
  console.log('\n📁 Files in public/assets/images/:');
  const outputFiles = fs.readdirSync(outputDir);
  outputFiles.forEach(file => console.log(`   - ${file}`));
  
} catch (error) {
  console.error('💥 Critical error in conversion script:', error);
  console.log('💡 Build continues with existing public files...');
}