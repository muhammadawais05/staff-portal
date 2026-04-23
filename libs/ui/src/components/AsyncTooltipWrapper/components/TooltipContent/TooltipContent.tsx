import React, { ElementType, isValidElement } from 'react'

import { TooltipContentRenderer } from '../../types'
import Error from '../Error'

type Props<TData> = {
  content: TooltipContentRenderer<TData>
  error?: unknown
  data?: TData
  loading: boolean
  ErrorComponent?: ElementType
}

/**
  This is done through a separate component to avoid calling
  this function on every render of the `AsyncTooltipWrapper`
*/
const TooltipContent = <TData,>({
  content,
  data,
  loading,
  error,
  ErrorComponent = Error
}: Props<TData>) => {
  if (error) {
    return <ErrorComponent />
  }

  const result = content(data, loading)

  // To make types compatible with `Tooltip.content` prop
  return isValidElement(result) ? result : null
}

export default TooltipContent
