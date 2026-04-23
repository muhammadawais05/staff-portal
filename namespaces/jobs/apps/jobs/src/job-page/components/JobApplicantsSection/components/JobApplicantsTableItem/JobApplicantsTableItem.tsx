import { Checkbox, Table } from '@toptal/picasso'
import React, { memo } from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  AvailabilityStatus,
  BestMatchField,
  TalentRateField
} from '@staff-portal/talents'

import * as S from './styles'
import * as TableStyles from '../JobApplicantsTable/styles'
import { JobApplicationItemFragment } from '../JobApplicantsSection/data/get-job-applications'
import JobApplicantsTalent from '../JobApplicantsTalent'
import JobApplicantsActions from '../JobApplicantsActions'
import JobApplicantsApplied from '../JobApplicantsApplied'
import JobApplicantItemContent from '../JobApplicantItemContent'

export interface Props {
  jobApplication?: JobApplicationItemFragment | null
  index: number
  isExpanded: boolean
  isSelected: boolean
  jobId: string
  onSelect: (jobApplicationId: string) => void
  onDeselect: (jobApplicationId: string) => void
  expandItem: (jobApplicationId: string | null) => void
}

const JobApplicantsTableItem = ({
  jobApplication,
  index,
  isExpanded,
  isSelected,
  onSelect,
  onDeselect,
  expandItem,
  jobId
}: Props) => {
  if (!jobApplication) {
    return null
  }

  const {
    talent,
    talentJobScoring,
    talentPitch,
    jobIssues,
    resumeUrl: jobSpecificResumeUrl
  } = jobApplication

  const talentCol = (
    <JobApplicantsTalent
      jobIssues={jobIssues}
      talentPitch={talentPitch}
      talentName={talent.fullName}
      talentProfileUrl={talent.webResource?.url}
    />
  )

  const appliedCol = (
    <JobApplicantsApplied applicationDate={jobApplication.createdAt} />
  )

  const bestMatchCol = talentJobScoring ? (
    <BestMatchField
      bestMatchScoreRank={talentJobScoring.bestMatchScoreRank as number}
      totalRanked={talentJobScoring.totalTalentRanked as number}
      bestMatchScore={talentJobScoring.bestMatchScore as number}
    />
  ) : (
    NO_VALUE
  )

  const ratesCol = (
    <TalentRateField
      clientRates={jobApplication.defaultClientRates}
      talentHourlyRate={jobApplication.talent?.hourlyRate}
      requestedHourlyRate={jobApplication.requestedHourlyRate}
    />
  )

  const availabilityCol = (
    <AvailabilityStatus
      talentAvailability={talent}
      associatedRoles={talent.associatedRoles?.nodes}
      mode='compact'
    />
  )

  const actionsCol = (
    <JobApplicantsActions
      jobApplicationId={jobApplication.id}
      talentResumeUrl={talent.resumeUrl}
      jobSpecificResumeUrl={jobSpecificResumeUrl}
      isExpanded={isExpanded}
      expandItem={expandItem}
    />
  )

  return (
    <Table.ExpandableRow
      data-testid='job-applicant-row'
      content={
        <WidgetErrorBoundary>
          <JobApplicantItemContent
            jobApplicationId={jobApplication.id}
            jobId={jobId}
            emailMessagingJobApplicantId={jobApplication.emailMessaging?.id}
          />
        </WidgetErrorBoundary>
      }
      css={S.row}
      expanded={isExpanded}
      stripeEven={Boolean(index % 2)}
      key={index}
    >
      <Table.Cell css={TableStyles.checkboxCol}>
        <Checkbox
          checked={isSelected}
          onChange={e =>
            e.target.checked
              ? onSelect(jobApplication.id)
              : onDeselect(jobApplication.id)
          }
        />
      </Table.Cell>
      <Table.Cell css={TableStyles.talentCol}>{talentCol}</Table.Cell>
      <Table.Cell css={TableStyles.appliedCol}>{appliedCol}</Table.Cell>
      <Table.Cell css={TableStyles.bestMatchCol}>{bestMatchCol}</Table.Cell>
      <Table.Cell css={TableStyles.ratesCol}>{ratesCol}</Table.Cell>
      <Table.Cell css={TableStyles.availabilityCol}>
        {availabilityCol}
      </Table.Cell>
      <Table.Cell css={TableStyles.actionsCol}>{actionsCol}</Table.Cell>
    </Table.ExpandableRow>
  )
}

export default memo(JobApplicantsTableItem)
