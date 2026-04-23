import { css } from 'styled-components'
import { screens } from '@toptal/picasso/utils'

import { ORIGINAL_IMAGE_WIDTH } from '../../constants/portfolioImage'

const grid = css`
  display: grid;
  /* stylelint-disable */
  grid-template-columns: fit-content(${ORIGINAL_IMAGE_WIDTH}px) fit-content(
      ${ORIGINAL_IMAGE_WIDTH}px
    );
  /* stylelint-enable */
  column-gap: 1rem;
  row-gap: 1rem;

  ${screens('small')} {
    grid-template-columns: 1fr;
  }
`

export { grid }
