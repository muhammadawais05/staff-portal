import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  webResource: Link
}

const CompanyField = ({ webResource }: Props) => {
  const shouldWrap = Boolean(webResource?.url)

  return (
    <LinkWrapper
      wrapWhen={shouldWrap}
      href={webResource.url as string}
      data-testid='client-link'
    >
      <TypographyOverflow
        as='span'
        size='medium'
        weight='semibold'
        color={shouldWrap ? 'inherit' : 'dark-grey'}
      >
        {webResource.text}
      </TypographyOverflow>
    </LinkWrapper>
  )
}

export default CompanyField
