import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = './src/assets/icons';
const outputFile = './public/sprite.svg';

console.log('🔄 Building SVG sprite...');

// Проверяем существует ли папка с иконками
if (!fs.existsSync(iconsDir)) {
  console.log('📁 Icons directory not found, creating...');
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('💡 Please add SVG icons to src/assets/icons/ folder');
  process.exit(0);
}

try {
  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter(file => file.endsWith('.svg'));

  console.log(`📁 Found ${svgFiles.length} SVG icons`);

  if (svgFiles.length === 0) {
    console.log('💡 No SVG icons found. Add some .svg files to src/assets/icons/');
    
    // Создаем пример иконки если папка пустая
    const sampleIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="currentColor"/>
</svg>`;
    
    fs.writeFileSync(path.join(iconsDir, 'sample.svg'), sampleIcon);
    console.log('✅ Created sample.svg icon');
    process.exit(0);
  }

  // Начинаем создавать спрайт
  let spriteContent = `<!-- SVG Sprite -->\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">\n`;

  svgFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    const iconName = file.replace('.svg', '');
    
    console.log(`📦 Processing: ${file} → icon-${iconName}`);
    
    try {
      const svgContent = fs.readFileSync(filePath, 'utf8');
      
      // Извлекаем содержимое между тегами svg
      const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (contentMatch && contentMatch[1]) {
        const innerContent = contentMatch[1]
          .replace(/<title>.*?<\/title>/g, '') // удаляем title
          .replace(/<desc>.*?<\/desc>/g, '')   // удаляем desc
          .trim();
        
        spriteContent += `  <symbol id="icon-${iconName}" viewBox="0 0 24 24">\n`;
        spriteContent += `    ${innerContent}\n`;
        spriteContent += `  </symbol>\n`;
      } else {
        console.log(`⚠️  Could not parse: ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error reading ${file}:`, error.message);
    }
  });

  spriteContent += '</svg>';
  
  // Создаем папку public если нет
  const publicDir = path.dirname(outputFile);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Сохраняем спрайт
  fs.writeFileSync(outputFile, spriteContent);
  console.log(`✅ SVG sprite created: ${outputFile}`);
  console.log(`🎉 Icons available: ${svgFiles.map(f => f.replace('.svg', '')).join(', ')}`);
  
} catch (error) {
  console.error('💥 Error building sprite:', error);
}