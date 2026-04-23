import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { JobIssues } from '@staff-portal/talents'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'

import { JobEngagementEdgeFragment } from '../../../../../../data/job-engagement-edge-fragment'

export interface Props {
  jobIssues?: JobEngagementEdgeFragment['jobIssues']
  talentName?: string
  talentProfileUrl?: string | null
}

const Talent = ({ jobIssues, talentName = '', talentProfileUrl }: Props) => {
  return (
    <Container data-testid='talent' flex alignItems='center'>
      {Boolean(jobIssues?.failedMetrics.length) && (
        <Container flex right='xsmall' as='span'>
          <JobIssues jobIssues={jobIssues} />
        </Container>
      )}

      <TypographyOverflow as='span' weight='semibold'>
        <LinkWrapper
          wrapWhen={!!talentProfileUrl}
          href={talentProfileUrl as string}
          target={getTalentProfileLinkTarget(talentProfileUrl)}
        >
          {talentName}
        </LinkWrapper>
      </TypographyOverflow>
    </Container>
  )
}

export default Talent
