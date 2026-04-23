import React, { forwardRef } from 'react'
import { LinkProps } from '@toptal/picasso'
import { Link } from '@topkit/react-router'

const displayName = 'ActionLink'

// variant & noUnderline are statically set in ActionLink
type ActionLinkProps = Omit<LinkProps, 'variant' | 'noUnderline'>

const ActionLink = forwardRef<HTMLAnchorElement, ActionLinkProps>(
  (props, ref) => (
    <Link
      data-testid={displayName}
      ref={ref}
      {...props}
      variant='action'
      noUnderline
    />
  )
)

ActionLink.displayName = displayName

export default ActionLink
