import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = './src/assets/images';
const outputDir = './dist/assets/images';

console.log('🔄 Starting image processing...');

// Создаем выходную директорию
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('📁 Created output directory:', outputDir);
}

// Проверяем существует ли директория с изображениями
if (!fs.existsSync(imagesDir)) {
    console.log('❌ Images directory not found:', imagesDir);
    process.exit(0);
}

try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} images in ${imagesDir}`);

    if (imageFiles.length === 0) {
        console.log('💡 Add some images to src/assets/images/ folder');
        process.exit(0);
    }

    // Копируем изображения
    imageFiles.forEach(file => {
        const sourcePath = path.join(imagesDir, file);
        const destPath = path.join(outputDir, file);
        
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
    });

    console.log('🎉 All images processed successfully!');
    
} catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
}