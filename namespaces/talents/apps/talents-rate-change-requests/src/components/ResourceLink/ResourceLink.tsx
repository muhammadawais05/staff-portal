import React from 'react'
import { TypographyOverflow } from '@toptal/picasso/TypographyOverflow/TypographyOverflow'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  webResource?: { text: string; url?: string | null }
  text?: string
}

const ResourceLink = ({ webResource, text }: Props) => {
  if (!webResource) {
    return null
  }

  return (
    <LinkWrapper
      wrapWhen={Boolean(webResource.url)}
      href={webResource.url as string}
    >
      <TypographyOverflow
        as='span'
        weight='inherit'
        size='inherit'
        color='inherit'
      >
        {text ?? webResource.text}
      </TypographyOverflow>
    </LinkWrapper>
  )
}

export default ResourceLink
