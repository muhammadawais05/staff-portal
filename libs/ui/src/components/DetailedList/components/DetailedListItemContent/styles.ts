import { css } from 'styled-components'

// TODO: This is a force override, with inherit Picasso Typography fix, not required anymore
export const value = css`
  &,
  & p {
    font-weight: 600;
  }
`

export const listItem = (width: string) => css`
  width: ${width};
`

export const listItemContent = ({
  isLabel,
  multilines,
  defaultValue
}: {
  isLabel: boolean
  multilines: boolean
  defaultValue?: string
}) => css`
  ${!isLabel &&
  `${
    defaultValue
      ? `
      &:empty:before {
        content: '${defaultValue}'
      }
    `
      : ''
  }
    &,
    & p {
      font-weight: 600;
    }`}
  ${multilines &&
  `
    & > div {
      white-space: pre-wrap;
    }`}
`
