import { Container, TooltipProps } from '@toptal/picasso'
import React, { Suspense, useMemo, ReactNode } from 'react'
import { UrlWithMessages } from '@staff-portal/graphql/staff'
import { LazyTooltip } from '@staff-portal/ui'
import { OperationTooltipContent } from '@staff-portal/operations'

export interface Props {
  link?: UrlWithMessages
  hidden?: boolean
  inline?: boolean
  tooltipDelay?: TooltipProps['delay']
  disableTooltip?: TooltipProps['disableListeners']
  children?: ReactNode
}

const LazyLinkWrapper = ({
  link,
  children,
  hidden = false,
  inline = true,
  disableTooltip = false,
  tooltipDelay
}: Props) => {
  const tooltipContent = useMemo(() => {
    if (!link) {
      return
    }

    const { messages } = link

    if (messages.length) {
      return (
        <Suspense fallback={null}>
          <OperationTooltipContent messages={messages} />
        </Suspense>
      )
    }
  }, [link])

  if (!link || hidden) {
    return null
  }

  if (disableTooltip || !tooltipContent) {
    return <>{children}</>
  }

  const as = inline ? 'span' : 'div'

  return (
    <LazyTooltip interactive delay={tooltipDelay} content={tooltipContent}>
      <Container as={as} inline={inline} data-testid='LazyLinkWrapper-content'>
        {children}
      </Container>
    </LazyTooltip>
  )
}

export default LazyLinkWrapper
