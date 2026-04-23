import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'

import { NON_BREAKING_SPACE_SYMBOL } from '../../../constants'
import * as S from './styles'

type Props = {
  children: ReactNode
  label: string
}

/**
 * The JSX of this component is optimized to correctly work with `clipboard.js` library
 */
const PitchSnippetRow = ({ children, label }: Props) => (
  <Typography size='inherit' css={S.pitchSnippeRowText}>
    {label}:{NON_BREAKING_SPACE_SYMBOL}
    <Typography as='b' weight='semibold'>
      {children}
    </Typography>
  </Typography>
)

export default PitchSnippetRow
