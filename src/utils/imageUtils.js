// Утилита для генерации srcSet
export function generateSrcSet(basePath, widths = [320, 640, 1024, 1600]) {
  return widths.map(width => `${basePath}?width=${width} ${width}w`).join(', ')
}

// Утилита для генерации sizes атрибута
export function generateSizes(breakpoints = {
  mobile: '100vw',
  tablet: '80vw', 
  desktop: '1200px'
}) {
  return `
    (max-width: 768px) ${breakpoints.mobile},
    (max-width: 1200px) ${breakpoints.tablep},
    ${breakpoints.desktop}
  `.trim()
}

// Хук для ленивой загрузки изображений
export function useImageLoader(src, options = {}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const img = new Image()
    
    img.onload = () => setLoaded(true)
    img.onerror = () => setError(true)
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])
  
  return { loaded, error }
}