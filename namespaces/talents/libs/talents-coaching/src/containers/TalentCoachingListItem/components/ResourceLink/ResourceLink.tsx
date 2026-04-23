import React from 'react'
import { TypographyOverflow } from '@toptal/picasso/TypographyOverflow/TypographyOverflow'
import { Link } from '@staff-portal/navigation'
import { Link as WebResourceLink } from '@staff-portal/graphql/staff'

const ResourceLink = (webResource?: WebResourceLink) => {
  if (!webResource) {
    return null
  }

  return (
    <TypographyOverflow color='inherit'>
      <Link href={webResource.url ?? ''}>{webResource.text}</Link>
    </TypographyOverflow>
  )
}

export default ResourceLink
