import React, { ReactNode } from 'react'
import {
  ColorType,
  Container,
  Info16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'

type Props = {
  children: ReactNode
  tooltip?: ReactNode
  color?: ColorType
}

const TooltipWithIcon = ({ tooltip, children, color }: Props) => (
  <Container flex alignItems='center'>
    <TypographyOverflow color={color} weight='semibold'>
      {children}
    </TypographyOverflow>
    {tooltip && (
      <Tooltip content={tooltip}>
        <Container flex alignItems='center' left='xsmall'>
          <Info16 color='dark-grey' />
        </Container>
      </Tooltip>
    )}
  </Container>
)

export default TooltipWithIcon
