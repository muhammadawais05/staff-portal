import React, { FC, ReactNode, memo } from 'react'
import { Container } from '@toptal/picasso'

import * as S from './styles'

const displayName = 'WidgetWrapper'

interface Props {
  hasBottomMargin?: boolean
  children: ReactNode
}

export const WidgetWrapper: FC<Props> = memo(
  ({ hasBottomMargin, children }) => (
    <Container css={S.wrapper(hasBottomMargin)}>{children}</Container>
  )
)

WidgetWrapper.defaultProps = {
  hasBottomMargin: false
}

WidgetWrapper.displayName = displayName

export default WidgetWrapper
