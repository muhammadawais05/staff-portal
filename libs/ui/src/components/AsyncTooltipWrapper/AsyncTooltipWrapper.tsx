import { Container } from '@toptal/picasso'
import React from 'react'

import { TooltipWrapper, TooltipWrapperProps } from './components'

type Props<TData> = {
  enableTooltip?: boolean
} & TooltipWrapperProps<TData>

const AsyncTooltipWrapper = <TData,>({
  enableTooltip,
  children,
  ...restProps
}: Props<TData>) => {
  if (!enableTooltip) {
    return <Container as='span'>{children}</Container>
  }

  return <TooltipWrapper {...restProps}>{children}</TooltipWrapper>
}

export default AsyncTooltipWrapper
