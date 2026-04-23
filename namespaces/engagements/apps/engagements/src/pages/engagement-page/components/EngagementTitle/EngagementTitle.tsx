import { TypographyOverflow } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

export interface Props {
  clientWebResource: Link
  jobWebResource: Link
}

const EngagementTitle = ({ clientWebResource, jobWebResource }: Props) => {
  return (
    <TypographyOverflow
      color='inherit'
      size='inherit'
      weight='inherit'
      as='span'
    >
      Position{' '}
      <LinkWrapper
        wrapWhen={Boolean(jobWebResource.url)}
        href={jobWebResource.url as string}
      >
        {jobWebResource.text}
      </LinkWrapper>{' '}
      at{' '}
      <LinkWrapper
        wrapWhen={Boolean(clientWebResource.url)}
        href={clientWebResource.url as string}
      >
        {clientWebResource.text}
      </LinkWrapper>
    </TypographyOverflow>
  )
}

export default EngagementTitle
