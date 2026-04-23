import React from 'react'
import { Container, Tag, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { EngagementJobDetailsFragment } from '../EngagementJobDetails/data/get-engagement-job-details.staff.gql.types'

export interface Props {
  job: EngagementJobDetailsFragment
}

export const JobNameValue = ({
  job: {
    title,
    client: { enterprise },
    webResource: { url }
  }
}: Props) => {
  return (
    <TypographyOverflow as='div' weight='inherit' tooltipContent={title}>
      {enterprise && (
        <Container as='span' right='xsmall'>
          <Tag.Rectangular indicator='blue' data-testid='enterprise-tag'>
            Enterprise
          </Tag.Rectangular>
        </Container>
      )}
      <LinkWrapper
        wrapWhen={Boolean(url)}
        noUnderline
        href={url as string}
        data-testid='job-link'
      >
        {title}
      </LinkWrapper>
    </TypographyOverflow>
  )
}
