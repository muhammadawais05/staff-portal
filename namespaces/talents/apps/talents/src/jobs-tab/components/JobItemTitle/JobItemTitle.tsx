import React from 'react'
import { Container, Tag, TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { LinkWrapper } from '@staff-portal/ui'
import { TalentProfileJobsEngagementFragment } from '@staff-portal/engagements'

interface Props {
  engagement: TalentProfileJobsEngagementFragment
}

const JobItemTitle = ({ engagement: { client } }: Props) => {
  if (!client) {
    return <Container bottom='small'>{NO_VALUE}</Container>
  }

  const { fullName } = client
  const companyLink = client.webResource?.url

  return (
    <Container bottom='small' flex alignItems='center'>
      <LinkWrapper
        target='_blank'
        wrapWhen={Boolean(companyLink)}
        href={companyLink as string}
      >
        <TypographyOverflow
          size='medium'
          weight='semibold'
          color='inherit'
          as='span'
        >
          {fullName}
        </TypographyOverflow>
      </LinkWrapper>

      {client.enterprise && (
        <Container as='span' left='xsmall'>
          <Tag variant='light-grey'>Enterprise</Tag>
        </Container>
      )}
    </Container>
  )
}

export default JobItemTitle
