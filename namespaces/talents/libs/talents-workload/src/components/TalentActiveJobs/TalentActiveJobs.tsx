import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '@staff-portal/engagements'

import { TalentWorkingEngagementFragment } from '../../data'

interface Props {
  engagements: TalentWorkingEngagementFragment[]
}

const TalentActiveJobs = ({ engagements }: Props) => {
  if (!engagements.length) {
    return null
  }

  return (
    <>
      {engagements.map(
        ({ id, commitment, job }, index) =>
          job?.webResource && (
            <Container key={id} top={index > 0 ? 'xsmall' : undefined}>
              <Typography weight='semibold' size='medium'>
                <LinkWrapper
                  wrapWhen={Boolean(job.webResource.url)}
                  href={job.webResource.url as string}
                >
                  {job.webResource.text} -{' '}
                  {ENGAGEMENT_COMMITMENT_MAPPING[commitment]}
                </LinkWrapper>
              </Typography>
            </Container>
          )
      )}
    </>
  )
}

export default TalentActiveJobs
