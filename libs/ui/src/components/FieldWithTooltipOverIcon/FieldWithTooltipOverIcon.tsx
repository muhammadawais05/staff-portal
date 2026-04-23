import React, { ReactNode } from 'react'
import { Container, Tooltip, QuestionMark16 } from '@toptal/picasso'

type Props = {
  tooltip?: ReactNode
  inline?: boolean
  icon?: ReactNode
  'data-testid'?: string
  children?: ReactNode
}

const FieldWithTooltipOverIcon = ({
  children,
  tooltip,
  inline = true,
  icon,
  'data-testid': dataTestId
}: Props) => {
  return <Container
    inline={inline}
    as='span'
    flex
    alignItems='center'
    data-testid={dataTestId}
  >
    {children}

    {tooltip && (
      <Tooltip content={tooltip}>
        <Container inline as='span' flex alignItems='center' left='xsmall'>
          {icon ?? <QuestionMark16 />}
        </Container>
      </Tooltip>
    )}
  </Container>
}

export default FieldWithTooltipOverIcon
