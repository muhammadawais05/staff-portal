import React from 'react'
import {
  Container,
  Guests16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'
import { JobIssues } from '@staff-portal/talents'

import { JobApplicationItemFragment } from '../JobApplicantsSection/data/get-job-applications'
import * as S from './styles'

export interface Props {
  jobIssues?: JobApplicationItemFragment['jobIssues'] | null
  talentPitch?: JobApplicationItemFragment['talentPitch'] | null
  talentName?: string
  talentProfileUrl?: string | null
}

const JobApplicantsTalent = ({
  jobIssues,
  talentPitch,
  talentName = '',
  talentProfileUrl
}: Props) => {
  return (
    <Container flex alignItems='center'>
      {Boolean(jobIssues?.failedMetrics.length) && (
        <JobIssues jobIssues={jobIssues} />
      )}

      {talentPitch && (
        <Tooltip content='A talent card is available to share with the client. Expand to view details.'>
          <Container flex css={S.talentItem}>
            <Guests16 color='green' data-testid='talent-card' />
          </Container>
        </Tooltip>
      )}

      <LinkWrapper
        css={S.talentItem}
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

export default JobApplicantsTalent
