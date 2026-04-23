import React from 'react'
import { Container, ContainerProps } from '@toptal/picasso'

import * as S from './styles'

const displayName = 'Divider'

interface Props extends Omit<ContainerProps, 'children'> {
  borderColor?: string
}

const Divider = ({ borderColor, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <div data-testid='divider' css={S.border({ borderColor })} />
    </Container>
  )
}

Divider.displayName = displayName

export default Divider
