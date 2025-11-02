// Этот компонент вставляет SVG спрайт на страницу
// Его нужно добавить в корневой компонент приложения

export default function Sprite() {
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        {/* Спрайт будет автоматически сгенерирован плагином */}
      </svg>
    </div>
  )
}