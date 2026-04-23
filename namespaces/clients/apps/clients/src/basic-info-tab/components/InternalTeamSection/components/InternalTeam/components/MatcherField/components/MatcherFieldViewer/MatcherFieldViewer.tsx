import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { TypographyOverflowLink, LinkWrapper } from '@staff-portal/ui'
import { StaffUserFragment } from '@staff-portal/staff'

type Props = {
  value: Partial<StaffUserFragment> | undefined
}

const MatcherFieldViewer = ({ value }: Props) => {
  const { webResource } = value || {}

  if (!webResource?.text) {
    return (
      <Typography
        size='medium'
        weight='semibold'
        data-testid='MatcherFieldViewer'
      >
        Automatic
      </Typography>
    )
  }

  return (
    <Container flex alignItems='center'>
      <TypographyOverflowLink size='medium' weight='semibold'>
        <LinkWrapper
          data-testid='MatcherFieldViewer-link'
          wrapWhen={Boolean(webResource.url)}
          href={webResource.url as string}
        >
          {webResource.text}
        </LinkWrapper>
      </TypographyOverflowLink>
    </Container>
  )
}

export default MatcherFieldViewer
