import { css } from 'styled-components'

export const logicOperatorsContainer = css`
  flex-wrap: nowrap;

  /*
  FIXME this "margin-right" style can be deleted after
  https://toptal-core.atlassian.net/browse/FX-1141 is done
  */
  > * {
    margin-right: 0.5rem;
  }
`
