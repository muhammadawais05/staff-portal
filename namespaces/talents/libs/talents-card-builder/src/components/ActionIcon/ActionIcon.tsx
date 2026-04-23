import { Check16, Minus16, Plus16 } from '@toptal/picasso/Icon'
import { Container } from '@toptal/picasso'
import React from 'react'

import { InteractionVariant } from '../../utils/useHighlightedInteraction'
import * as S from './style'

interface ActionIconProps {
  state: InteractionVariant
}

const icons = {
  default: <Plus16 color='blue' />,
  'default-hovered': <Plus16 color='white' />,
  highlighted: <Check16 color='green' />,
  'highlighted-hovered': <Minus16 color='red' />
}

const ActionIcon = ({ state }: ActionIconProps) => (
  <Container css={S.actionIcon} className={state}>{icons[state]}</Container>
)

export default ActionIcon
