import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  client: {
    webResource: Link
  }
}

const ClientLinkField = ({
  client: {
    webResource: { url, text }
  }
}: Props) => (
  <LinkWrapper
    wrapWhen={Boolean(url)}
    href={url as string}
    noUnderline
    data-testid='client-link'
  >
    <TypographyOverflow
      as='span'
      weight='semibold'
      size='medium'
      color='inherit'
    >
      {text}
    </TypographyOverflow>
  </LinkWrapper>
)

export default ClientLinkField
