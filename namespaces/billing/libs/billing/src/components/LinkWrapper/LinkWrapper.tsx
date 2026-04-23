import { Link } from '@topkit/react-router'
import { omit } from 'lodash-es'
import React, { ReactNode, ComponentProps } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

const displayName = 'LinkWrapper'

interface Props
  extends Pick<
    ComponentProps<typeof Link>,
    'target' | 'noUnderline' | 'style'
  > {
  href?: Maybe<string>
  'data-testid'?: string
  children?: ReactNode
}

const LinkWrapper = ({ children, href, ...rest }: Props) => {
  const testId = rest['data-testid'] || `${displayName}-link`

  if (!href) {
    return <>{children}</>
  }

  return (
    <Link
      data-testid={testId}
      href={href}
      {...omit(rest, ['data-testid', 'href'])}
    >
      {children}
    </Link>
  )
}

LinkWrapper.displayName = displayName

export default LinkWrapper
