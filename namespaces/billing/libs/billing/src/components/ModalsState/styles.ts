import { css } from 'styled-components'

const confirmationContainer = (hasConfirmation: boolean) => css`
  display: ${hasConfirmation ? 'none' : 'flex'};
`

export { confirmationContainer }
