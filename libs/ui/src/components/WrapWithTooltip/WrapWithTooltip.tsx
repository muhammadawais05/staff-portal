import React, { MouseEventHandler } from 'react'
import { Container, Tooltip, TooltipProps } from '@toptal/picasso'

export interface Props extends TooltipProps {
  enableTooltip: boolean
  interactive?: boolean
  inline?: boolean
  withWrapper?: boolean
  onMouseEnter?: MouseEventHandler<HTMLElement>
}

const WrapWithTooltip = ({
  enableTooltip,
  children,
  interactive = true,
  inline = true,
  withWrapper = true,
  onMouseEnter,
  ...rest
}: Props) => {
  if (!enableTooltip) {
    return <>{children}</>
  }

  return (
    <Tooltip interactive={interactive} {...rest}>
      {withWrapper ? (
        <Container inline={inline} onMouseEnter={onMouseEnter}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Tooltip>
  )
}

export default WrapWithTooltip
