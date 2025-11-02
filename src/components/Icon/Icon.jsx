import './Icon.scss'

export default function Icon({ 
  name, 
  className = '', 
  size = 24,
  color = 'currentColor',
  ...props 
}) {
  return (
    <svg 
      className={`icon icon--${name} ${className}`}
      width={size}
      height={size}
      style={{ color }}
      {...props}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}