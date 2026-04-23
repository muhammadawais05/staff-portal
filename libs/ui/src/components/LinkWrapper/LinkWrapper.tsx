import React from 'react'
import { Props as PicassoLinkProps } from '@toptal/picasso/Link/Link'
import { Link } from '@staff-portal/navigation'

export interface Props extends PicassoLinkProps {
  wrapWhen: boolean
}

const LinkWrapper = ({ wrapWhen, children, ...props }: Props) => {
  if (!wrapWhen) {
    return <>{children}</>
  }

  return <Link {...props}>{children}</Link>
}

export default LinkWrapper
