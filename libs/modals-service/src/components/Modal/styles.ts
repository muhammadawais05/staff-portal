import { css } from 'styled-components'

export const modalContainer = css`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`

export const modalContentWrapper = css`
  flex: 1 1 auto;
  ${modalContainer}
  & > form,
  & > div,
  & > div > form {
    ${modalContainer}
  }
`
