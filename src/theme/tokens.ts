export const color = {
  ink: '#1e1e1e',
  black: '#000000',
  white: '#ffffff',
  cream: '#fffdfa',
  sage: '#8fa9a0',
  accent: '#ed6636',
  danger: '#d64545',
} as const

export const font = {
  sans: "'Inter', sans-serif",
  script: "'Loved by the King', cursive",
} as const

export const weight = {
  semibold: 600,
  medium: 500,
  regular: 400,
  light: 300,
} as const

export const size = {
  displayLg: '2.1em',
  displayMd: '1.5em',
  titleMd: '1.2em',
  titleSm: '1em',
  body: '0.8em',
  caption: '0.5em',
} as const

export const leading = {
  flat: 1,
  snug: 1.3,
  relaxed: 1.5,
} as const

export const tracking = {
  tight: '-0.04em',
} as const

export const breakpoint = {
  tablet: '1024px',
  mobile: '767px',
} as const

export const media = {
  tablet: `@media (max-width: ${breakpoint.tablet})`,
  mobile: `@media (max-width: ${breakpoint.mobile})`,
} as const
