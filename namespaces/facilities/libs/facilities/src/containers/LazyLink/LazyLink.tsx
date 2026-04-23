import { ReactNode } from 'react'

import { Props as RenderLazyLinkProps, useRenderLazyLink } from './hooks'
import { RenderProps } from './types'

export type Props = RenderLazyLinkProps & {
  children: (renderProps: RenderProps) => ReactNode
}

const LazyLink = ({ children, ...props }: Props) => {
  const renderLazyLink = useRenderLazyLink(props)

  return renderLazyLink(children)
}

export default LazyLink
