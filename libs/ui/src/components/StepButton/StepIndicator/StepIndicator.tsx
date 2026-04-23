import React from 'react'
import { Container, Indicator } from '@toptal/picasso'

import * as S from './styles'
import { StepIndicatorColor } from '../enums'

interface Props {
  color: StepIndicatorColor
  withArrow?: boolean
}

const StepIndicator = ({ color, withArrow = false }: Props) => (
  <Container right={0.875} data-testid='step-indicator'>
    <Indicator css={S.container({ withArrow, color })} color={color} />
  </Container>
)

export default StepIndicator
