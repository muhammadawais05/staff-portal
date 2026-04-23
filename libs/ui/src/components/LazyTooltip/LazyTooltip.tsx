import React, { Suspense } from 'react'
import { Container, Tooltip, TooltipProps } from '@toptal/picasso'

/** Preload the lazy loaded tooltip content to prevent it from jumping from fallback to actual content on hover */
const LazyTooltip = ({ content, children, ...rest }: TooltipProps) => {
  return <>
    <Tooltip content={content} {...rest}>
      {children}
    </Tooltip>
    <Container hidden>
      <Suspense fallback={null}>{content}</Suspense>
    </Container>
  </>
}

export default LazyTooltip
