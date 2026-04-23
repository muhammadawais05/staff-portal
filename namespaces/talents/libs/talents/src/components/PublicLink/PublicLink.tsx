import React, { ReactNode } from 'react'
// eslint-disable-next-line no-restricted-imports
import { Button, Link as PicassoLink } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/Button'
import { Link } from '@staff-portal/navigation'
import { Maybe } from '@staff-portal/graphql/staff'

export interface Props {
  url?: Maybe<string>
  variant?: VariantType
  noUnderline?: boolean
  'data-testid'?: string
  children: ReactNode
}

const PublicLink = ({
  url,
  variant = 'secondary',
  noUnderline = false,
  'data-testid': dataTestId = 'public-profile-button',
  children
}: Props) => {
  if (!url) {
    return null
  }

  return (
    <Button
      as={Link as typeof PicassoLink}
      size='small'
      rel='noopener'
      target='_blank'
      variant={variant}
      href={url}
      noUnderline={noUnderline}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}

export default PublicLink
