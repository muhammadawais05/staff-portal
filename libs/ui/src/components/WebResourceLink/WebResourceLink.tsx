import React from 'react'
import { Props as PicassoLinkProps } from '@toptal/picasso/Link/Link'

import LinkWrapper from '../LinkWrapper'

export interface Props extends PicassoLinkProps {
  link: {
    text: string
    url?: string | null
  }
}

const WebResourceLink = ({ link: { url, text }, ...rest }: Props) => (
  <LinkWrapper wrapWhen={Boolean(url)} href={url as string} {...rest}>
    {text}
  </LinkWrapper>
)

export default WebResourceLink
