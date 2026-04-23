import { Container, TooltipProps } from '@toptal/picasso'
import { PlacementType } from '@toptal/picasso/Tooltip/Tooltip'
import React, { ElementType, PropsWithChildren, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import WrapWithTooltip from '../../../WrapWithTooltip'
import { DEBOUNCE_DELAY } from '../../constants'
import TooltipContent from '../TooltipContent'
import {
  AsyncTooltipWrapperDataHookOptions,
  TooltipContentRenderer
} from '../../types'

export type Props<TData> = PropsWithChildren<{
  placement?: PlacementType
  loadedTooltipDelay?: number
  tooltipContent: TooltipContentRenderer<TData>
  maxWidth?: TooltipProps['maxWidth']
  ErrorComponent?: ElementType
  useFetchData: (options: AsyncTooltipWrapperDataHookOptions) => {
    data: TData
    error?: unknown
    loading: boolean
  }
}>

const TooltipWrapper = <TData,>({
  placement,
  tooltipContent,
  ErrorComponent,
  useFetchData,
  maxWidth = 'none',
  loadedTooltipDelay = DEBOUNCE_DELAY,
  children
}: Props<TData>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loadContent, setLoadContent] = useState(false)
  // On some pages we want to have customizable delay duration
  const DELAY = loadContent ? loadedTooltipDelay : DEBOUNCE_DELAY

  const { data, error, loading } = useFetchData({
    skip: !loadContent,
    fetchPolicy: 'cache-first'
  })

  const getDataDebounced = useDebouncedCallback(() => {
    if (!loadContent) {
      setLoadContent(true)
    }
    setIsOpen(true)
  }, DELAY)

  const handleMouseLeave = () => {
    setIsOpen(false)
    getDataDebounced.cancel()
  }

  return (
    <Container onMouseLeave={handleMouseLeave} as='span'>
      <WrapWithTooltip
        open={isOpen && Boolean((!loading && data) || error)}
        content={
          <TooltipContent
            data={data}
            loading={loading}
            content={tooltipContent}
            error={error}
            ErrorComponent={ErrorComponent}
          />
        }
        enableTooltip
        interactive
        placement={placement}
        maxWidth={maxWidth}
        onMouseEnter={getDataDebounced}
      >
        {children}
      </WrapWithTooltip>
    </Container>
  )
}

export default TooltipWrapper
