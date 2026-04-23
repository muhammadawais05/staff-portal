import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import { EngagementStatus } from '@staff-portal/engagements-interviews'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  TalentJobIssue,
  TalentJobIssueMetricStatus
} from '@staff-portal/graphql/staff'
import { getTalentProfileLinkTarget } from '@staff-portal/jobs'
import { JobIssues } from '@staff-portal/talents'
import { LinkWrapper } from '@staff-portal/ui'
import { Container, Table } from '@toptal/picasso'
import React, { useCallback } from 'react'

import { buildTalentSentOn, getTalentLink } from '../../utils'
import CandidateCard from '../CandidateCard'
import CandidatesTableItemActions from '../CandidatesTableItemActions'
import { JobEngagementCandidateFragment } from '../JobCandidatesSection/data/get-job-candidates.staff.gql.types'
import * as S from './styles'

interface Props {
  canViewEngagements: boolean
  jobIssues: {
    status: TalentJobIssue
    failedMetrics: {
      message: string
      name: string
      status: TalentJobIssueMetricStatus
    }[]
  }
  candidateEngagement: JobEngagementCandidateFragment
  stripEvent: boolean
  expanded: boolean
  setExpanded: (engagementId: string, expanded: boolean) => void
  engagementId?: string
}

const CandidatesTableItem = ({
  canViewEngagements,
  jobIssues,
  candidateEngagement,
  stripEvent,
  expanded,
  setExpanded,
  engagementId
}: Props) => {
  const talentLink = getTalentLink(candidateEngagement)
  const formatDateTime = useUserDateTimeFormatter()

  const toggleExpanded = useCallback(
    () => setExpanded(candidateEngagement.id, expanded),
    [expanded, candidateEngagement.id, setExpanded]
  )

  return (
    <Table.ExpandableRow
      stripeEven={stripEvent}
      content={
        <WidgetErrorBoundary>
          <CandidateCard engagementId={candidateEngagement.id} />
        </WidgetErrorBoundary>
      }
      expanded={expanded}
      data-testid='CandidatesTableItem-row'
    >
      <Table.Cell css={S.candidateCell}>
        <Container flex justifyContent='space-between'>
          <Container css={S.candidateContent}>
            <Container flex alignItems='center' right='xsmall'>
              {Boolean(jobIssues?.failedMetrics.length) && (
                <JobIssues jobIssues={jobIssues} />
              )}
              <LinkWrapper
                css={S.candidateName}
                wrapWhen={Boolean(talentLink)}
                href={talentLink as string}
                target={getTalentProfileLinkTarget(talentLink)}
              >
                <Container as='span' right='xsmall'>
                  {candidateEngagement.talent?.fullName}
                </Container>
              </LinkWrapper>
              -
            </Container>

            <Container>
              <EngagementStatus.Detailed
                lines={2}
                engagement={candidateEngagement}
                tooltipOptions={{ type: 'extended', ...candidateEngagement }}
              />

              {buildTalentSentOn(
                formatDateTime,
                candidateEngagement.cumulativeStatus,
                candidateEngagement.talentSentAt
              )}
            </Container>
          </Container>

          <CandidatesTableItemActions
            canViewEngagements={canViewEngagements}
            expanded={expanded}
            candidateEngagementUrl={candidateEngagement.webResource.url}
            toggleExpanded={toggleExpanded}
            engagementId={engagementId}
          />
        </Container>
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default CandidatesTableItem
