import React, { useMemo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import {
  CommitmentFormatter,
  JOB_PROJECT_TYPE_MAPPING
} from '@staff-portal/jobs'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { DraftJobFragment } from '../DraftJobSection/data/draft-job-fragment'
import Industries from './Industries'
import Skills from './Skills'
import { NO_FIELD, NO_DESCRIPTION } from '../../config'
import { formatEstimatedLength, getMaxHourlyRateText } from '../../utils'
import DraftJobHeader from '../DraftJobHeader'
import { formatWorkingHours } from '../../utils/format-working-hours'
import { getProjectSpecCompleteness, getProjectTeamInvolved } from './utils'
import { useGetPreferredHours } from '../../hooks'

export interface Props {
  draftJob: DraftJobFragment
  onEditClick?: (draftJob: DraftJobFragment) => void
}

const DraftJobContent = ({ draftJob, onEditClick }: Props) => {
  const {
    id,
    title,
    description,
    commitment,
    createdAt,
    estimatedLength,
    startDate,
    talentCount,
    talentCountSurvey,
    operations: {
      updateSalesDraftJob: updateSalesDraftJobOperation,
      removeSalesDraftJob: removeSalesDraftJobOperation
    },
    vertical: { talentType },
    projectType,
    projectSpecCompletenessSurvey,
    projectTeamInvolvedSurvey,
    budgetDetails,
    maxHourlyRate,
    hasPreferredHours,
    workingTimeFrom,
    workingTimeTo,
    projectSpecCompleteness,
    projectTeamInvolved,
    hoursOverlap,
    timeZoneName
  } = draftJob

  const preferredHours = useGetPreferredHours({ hoursOverlap, timeZoneName })

  const projectSpecCompletenessValue = useMemo(
    () =>
      getProjectSpecCompleteness({
        projectSpecCompleteness,
        projectSpecCompletenessSurvey
      }),
    [projectSpecCompleteness, projectSpecCompletenessSurvey]
  )

  const projectTeamInvolvedValue = useMemo(
    () =>
      getProjectTeamInvolved({
        projectTeamInvolvedSurvey,
        projectTeamInvolved
      }),
    [projectTeamInvolved, projectTeamInvolvedSurvey]
  )

  const projectTypeValue = projectType
    ? JOB_PROJECT_TYPE_MAPPING[projectType]
    : NO_FIELD

  const handleEditClick = () => {
    onEditClick?.(draftJob)
  }

  return (
    <>
      <DraftJobHeader
        draftJobId={id}
        createdAt={createdAt}
        updateSalesDraftJobOperation={updateSalesDraftJobOperation}
        removeSalesDraftJobOperation={removeSalesDraftJobOperation}
        onEditClick={handleEditClick}
      />

      <DetailedList labelColumnWidth={12} defaultValue={NO_VALUE}>
        <DetailedList.Row>
          <DetailedList.Item label='Talent type'>
            {titleize(talentType)}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Title'>{title}</DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Skills'>
            <Skills draftJob={draftJob} />
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item isFullWidthLabel multilines hideLabel>
            <Typography as='div' size='medium' weight='regular'>
              <Container bottom='xsmall'>Job Description</Container>
              {description || NO_DESCRIPTION}
            </Typography>
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Desired Commitment'>
            {(commitment && <CommitmentFormatter commitment={commitment} />) ||
              NO_FIELD}
          </DetailedList.Item>

          <DetailedList.Item label='Estimated Length'>
            {formatEstimatedLength(estimatedLength) || NO_FIELD}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label={talentCountSurvey.question}>
            {talentCount}
          </DetailedList.Item>

          <DetailedList.Item label='Desired Start Date'>
            {parseAndFormatDate(startDate, {
              dateFormat: 'MMMM do, yyyy'
            }) || NO_FIELD}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Project type'>
            {projectTypeValue}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label={projectSpecCompletenessSurvey.question}>
            {projectSpecCompletenessValue}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Industries'>
            <Industries draftJob={draftJob} />
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Maximum Hourly Rate'>
            {getMaxHourlyRateText({ budgetDetails, maxHourlyRate }) || NO_FIELD}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label={projectTeamInvolvedSurvey.question}>
            {projectTeamInvolvedValue}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Job Time Zone'>
            {preferredHours}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Time Zone Preference'>
            {hasPreferredHours ? 'Yes' : 'No'}
          </DetailedList.Item>

          {hasPreferredHours && (
            <DetailedList.Item label='Working Hours'>
              {formatWorkingHours(workingTimeFrom, workingTimeTo)}
            </DetailedList.Item>
          )}
        </DetailedList.Row>
      </DetailedList>
    </>
  )
}

export default DraftJobContent
