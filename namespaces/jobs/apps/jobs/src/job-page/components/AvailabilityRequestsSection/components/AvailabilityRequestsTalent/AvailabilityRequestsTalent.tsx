import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { JobIssues } from '@staff-portal/talents'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'

import { JobApplicationItemFragment } from '../../../JobApplicantsSection/components/JobApplicantsSection/data/get-job-applications'
import * as S from './styles'

export interface Props {
  jobIssues?: JobApplicationItemFragment['jobIssues'] | null
  talentName?: string
  talentProfileUrl?: string | null
}

const AvailabilityRequestsTalent = ({
  jobIssues,
  talentName = '',
  talentProfileUrl
}: Props) => {
  return (
    <Container flex>
      {Boolean(jobIssues?.failedMetrics.length) && (
        <JobIssues jobIssues={jobIssues} />
      )}

      <LinkWrapper
        css={S.talentName}
        wrapWhen={Boolean(talentProfileUrl)}
        href={talentProfileUrl as string}
        target={getTalentProfileLinkTarget(talentProfileUrl)}
      >
        <TypographyOverflow as='span' color='inherit'>
          {talentName}
        </TypographyOverflow>
      </LinkWrapper>
    </Container>
  )
}

export default AvailabilityRequestsTalent
