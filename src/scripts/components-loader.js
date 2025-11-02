// Простой загрузчик компонентов с дебагом
class SimpleComponentLoader {
  async init() {
    console.log('🔄 Loading components...');
    
    const components = document.querySelectorAll('[data-component]');
    console.log(`Found ${components.length} components to load`);
    
    for (const component of components) {
      const name = component.getAttribute('data-component');
      await this.loadComponent(component, name);
    }
    
    console.log('✅ All components loaded');
  }
  
  async loadComponent(placeholder, name) {
    try {
      console.log(`📥 Loading component: ${name}`);
      
      const response = await fetch(`/src/components/${name}/${name}.html`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      console.log(`📄 ${name} HTML:`, html.substring(0, 100) + '...');
      
      placeholder.innerHTML = html;
      
      // Добавляем видимую границу для дебага
      placeholder.style.border = '2px solid #00ff00';
      placeholder.style.minHeight = '50px';
      placeholder.style.padding = '10px';
      placeholder.style.margin = '10px 0';
      
      console.log(`✅ ${name} loaded and rendered`);
      
    } catch (error) {
      console.error(`❌ Failed to load ${name}:`, error);
      placeholder.innerHTML = `
        <div style="
          padding: 2rem; 
          background: #fee; 
          border: 2px dashed #e74c3c;
          color: #c0392b;
          font-family: Arial;
        ">
          <strong>Component Error:</strong> ${name}<br>
          Error: ${error.message}<br>
          Path: /src/components/${name}/${name}.html
        </div>
      `;
    }
  }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new SimpleComponentLoader().init();
});