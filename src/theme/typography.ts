import { css } from 'styled-components'
import { font, leading, media, size, tracking, weight } from './tokens'

const base = css`
  font-family: ${font.sans};
  margin: 0;
  letter-spacing: ${tracking.tight};
`

export const displayLg = css`
  ${base};
  text-transform: uppercase;
  line-height: ${leading.flat};
  font-weight: ${weight.semibold};
  font-size: ${size.displayLg};

  ${media.tablet} {
    font-size: 1.9em;
  }
`

export const displayMd = css`
  ${base};
  text-transform: uppercase;
  line-height: ${leading.flat};
  font-weight: ${weight.semibold};
  font-size: ${size.displayMd};
`

export const titleMd = css`
  ${base};
  text-transform: uppercase;
  line-height: ${leading.snug};
  font-weight: ${weight.regular};
  font-size: ${size.titleMd};
`

export const titleSm = css`
  ${base};
  text-transform: uppercase;
  line-height: ${leading.flat};
  font-weight: ${weight.regular};
  font-size: ${size.titleSm};
`

export const bodySm = css`
  ${base};
  line-height: ${leading.snug};
  font-weight: ${weight.light};
  font-size: ${size.body};
`

export const bodySmFlat = css`
  ${base};
  line-height: ${leading.flat};
  font-weight: ${weight.light};
  font-size: ${size.body};
`

export const caption = css`
  ${base};
  line-height: ${leading.snug};
  font-weight: ${weight.regular};
  font-size: ${size.caption};
`

export const navLink = css`
  ${base};
  font-weight: ${weight.regular};
  font-size: ${size.titleSm};
  text-decoration: none;
  white-space: nowrap;

  ${media.tablet} {
    font-size: 0.8em;
  }
`
