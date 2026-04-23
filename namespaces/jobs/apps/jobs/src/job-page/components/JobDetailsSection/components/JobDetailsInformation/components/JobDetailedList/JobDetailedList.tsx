/* eslint-disable max-lines */
/* eslint-disable complexity */
import { JobCommitment, JobStatus } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import pluralize from 'pluralize'
import {
  parseAndFormatDate,
  isAfter,
  parseISO
} from '@staff-portal/date-time-utils'
import { Link } from '@staff-portal/navigation'
import React, { useMemo } from 'react'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import {
  JobType,
  ESTIMATED_LENGTH_MAPPING,
  CommitmentFormatter,
  IndustriesField,
  JobSpecializationField,
  JobTimeZoneDetailsField,
  JobTimeZoneField,
  JobTypeField,
  JobWorkTypeField,
  getCategoryFieldValue,
  getJobSkillSetFields
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import {
  EstimatedEndDateField,
  HighPriorityField,
  MatchersQuestionField,
  NumberOfDesiredHiresField,
  PresalesEngagementField
} from '../../../../components'
import { JobDetailsInformationFragment } from '../../data/get-job-details-information/get-job-details-information.staff.gql.types'
import { LABEL_COLUMN_WIDTH } from '../../../../../../config'
import getRequiredApplicationPitch from '../../utils/get-required-application-pitch'
import PendingTalentReasonField from '../PendingTalentReasonField/PendingTalentReasonField'
import EstimatedWeeklyRevenueTalentField from '../EstimatedWeeklyRevenueTalentField/EstimatedWeeklyRevenueTalentField'
import MaximumHourlyRateField from '../../../../../MaximumHourlyRateField/MaximumHourlyRateField'

export interface Props {
  job: JobDetailsInformationFragment
  canViewOpportunities: boolean
}

const DEFAULT_DISCOUNT_APPLICABLE_DATE = '2021-06-11'

// eslint-disable-next-line max-lines-per-function
const JobDetailedList = ({ job, canViewOpportunities }: Props) => {
  const skillSetFields = useMemo(
    () => getJobSkillSetFields(job.skillSets?.nodes),
    [job.skillSets?.nodes]
  )

  const shouldShowPendingTalentReason =
    job.status === JobStatus.PENDING_ENGINEER && job.client.enterprise

  const wrapDesireCommitmentWithTooltip = Boolean(
    job.currentEngagement &&
      job.commitment !== job.currentEngagement?.commitment &&
      job.talentCount === 1
  )

  return (
    <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
      <DL.Row>
        <DL.Item label='Work type'>
          <JobWorkTypeField
            workType={job.workType}
            timeLengthOnsite={job.timeLengthOnsite}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Estimated Length'>
          {job.estimatedLength && (
            <span data-testid='estimated-length'>
              {ESTIMATED_LENGTH_MAPPING[job.estimatedLength]}
            </span>
          )}
        </DL.Item>
        <DL.Item label='Estimated End Date'>
          <EstimatedEndDateField
            jobId={job.id}
            estimatedEndDate={job.estimatedEndDate}
            operation={job.operations.updateJobEstimatedEndDate}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label={`Matcher's Question`}>
          <MatchersQuestionField
            jobId={job.id}
            operation={job.operations.updateJobMatcherQuestions}
            questions={job.positionQuestions?.nodes}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item
          label='Require an Application Pitch'
          value={getRequiredApplicationPitch(job.requiredApplicationPitch)}
        />
        <DL.Item label='High Priority'>
          <HighPriorityField
            jobId={job.id}
            highPriority={job.highPriority}
            highPriorityReason={job.highPriorityReason}
            operation={job.operations.setJobPriority}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Desired Commitment'>
          {job.commitment && (
            <CommitmentFormatter
              commitment={job.commitment.toUpperCase() as JobCommitment}
              showTooltip={wrapDesireCommitmentWithTooltip}
              tooltipText='Please note that current engagement commitment varies from the initial job posting'
            />
          )}
        </DL.Item>
        <DL.Item label='Commitment'>
          {job.currentEngagement?.commitment && (
            <CommitmentFormatter currentEngagement={job.currentEngagement} />
          )}
        </DL.Item>
      </DL.Row>

      {job.createdAt &&
        isAfter(
          parseISO(job.createdAt),
          parseISO(DEFAULT_DISCOUNT_APPLICABLE_DATE)
        ) && (
          <DL.Row>
            <DL.Item
              label='Default Discount'
              value={`${job.client.partTimeDiscount}% part time${
                job.client.fullTimeDiscount
                  ? ` and ${job.client.fullTimeDiscount}% full time`
                  : ''
              }`}
            />
          </DL.Row>
        )}

      {isNotNullish(job.commitmentMinimumHours) &&
        job.commitment === 'hourly' &&
        job.jobType === JobType.DEVELOPER && (
          <DL.Row>
            <DL.Item label='Minimum Commitment'>
              <Typography
                size='medium'
                data-testid='job-information-minimum-hours-commitment'
                color='red'
              >
                {`${pluralize(
                  'hour',
                  job.commitmentMinimumHours,
                  true
                )} per week`}
              </Typography>
            </DL.Item>
          </DL.Row>
        )}

      <DL.Row>
        <DL.Item
          label='Desired Start Date'
          value={job.startDate && parseAndFormatDate(job.startDate)}
        />
        <DL.Item
          label='Hide in talent portal?'
          value={job.hiddenForTalents ? 'Yes' : 'No'}
        />
      </DL.Row>

      <DL.Row>
        <DL.Item label='Original Job'>
          {job.originalJob && (
            <LinkWrapper
              wrapWhen={Boolean(job.originalJob.webResource.url)}
              href={job.originalJob.webResource.url as string}
              data-testid='job-information-original-job-link'
            >
              <TypographyOverflow
                as='span'
                weight='inherit'
                size='inherit'
                color='inherit'
              >
                {job.originalJob.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          )}
        </DL.Item>
      </DL.Row>

      {shouldShowPendingTalentReason && (
        <DL.Row>
          <DL.Item label='Pending Talent Reason'>
            <PendingTalentReasonField
              jobId={job.id}
              pendingTalentReason={job.pendingTalentReason}
              operation={job.operations.updateJobPendingTalentReason}
            />
          </DL.Item>
          {
            // we need an empty column in order for the row to not take the full space
            // and keep the edit button in the middle (as in platform)
          }
          <DL.Item label='' value={''} disableLabel />
        </DL.Row>
      )}

      {shouldShowPendingTalentReason && (
        <DL.Row>
          <DL.Item label='Pending Talent Reason Notes'>
            {job.pendingTalentReasonNotes && (
              <TypographyOverflow>
                {job.pendingTalentReasonNotes}
              </TypographyOverflow>
            )}
          </DL.Item>
        </DL.Row>
      )}

      {job.status !== JobStatus.PENDING_CLAIM && (
        <DL.Row>
          <DL.Item
            label='Skill Long Shot'
            value={job.skillLongShot ? 'Yes' : 'No'}
          />
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item
          label='Spoken Languages'
          value={
            !!job.languages?.nodes.length &&
            job.languages.nodes.map(lang => lang.name).join(', ')
          }
        />
        <DL.Item label='Desired Hires'>
          <NumberOfDesiredHiresField
            jobId={job.id}
            talentCount={job.talentCount}
            operation={job.operations.updateJobTalentCount}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Job Type'>
          <JobTypeField jobType={job.jobType} />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item
          label='Country Requirement'
          value={
            !!job.countryRequirements?.nodes.length &&
            job.countryRequirements.nodes
              .map(country => country.name)
              .join(', ')
          }
        />
      </DL.Row>

      {job.location && (
        <DL.Row>
          <DL.Item
            label='Onsite Location'
            value={[
              job.location?.cityName,
              job.location?.stateName,
              job.location?.country?.name
            ]
              .filter(Boolean)
              .join(', ')}
          />
        </DL.Row>
      )}

      <DL.Row>
        {job.isSpecializable && (
          <DL.Item label='Job Specialization'>
            <JobSpecializationField specialization={job.specialization} />
          </DL.Item>
        )}
        <DL.Item
          label='Categories'
          value={getCategoryFieldValue(job.categories?.nodes)}
        />
      </DL.Row>

      {job.client.enterprise && (
        <DL.Row>
          <DL.Item label='Estimated Weekly Revenue Talent'>
            <EstimatedWeeklyRevenueTalentField
              jobId={job.id}
              estimatedWeeklyRevenueTalent={job.estimatedWeeklyRevenueTalent}
              operation={job.operations.updateJobEstimatedWeeklyRevenueTalent}
            />
          </DL.Item>
        </DL.Row>
      )}

      {job.expectedWeeklyHours && (
        <DL.Row>
          <DL.Item label='Expected Weekly Hours'>
            <span data-testid='job-information-expected-weekly-hours'>
              {job.expectedWeeklyHours}
            </span>
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label='Maximum Hourly Rate'>
          <MaximumHourlyRateField
            job={job}
            budgetDetails={job.budgetDetails}
            maxHourlyRate={job.maxHourlyRate}
            uncertainOfBudgetReason={job.uncertainOfBudgetReason}
            uncertainOfBudgetReasonComment={job.uncertainOfBudgetReasonComment}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Job Time Zone'>
          {job.timeZonePreference && (
            <JobTimeZoneField
              hasPreferredHours={job.hasPreferredHours}
              timeZonePreference={job.timeZonePreference}
            />
          )}
        </DL.Item>

        {job.timeZonePreference && job.hasPreferredHours && (
          <DL.Item label={null} disableLabel>
            <JobTimeZoneDetailsField
              workingTimeFrom={job.workingTimeFrom}
              workingTimeTo={job.workingTimeTo}
              hasPreferredHours={job.hasPreferredHours}
              hoursOverlapEnum={job.hoursOverlapEnum}
            />
          </DL.Item>
        )}
      </DL.Row>

      <DL.Row>
        <DL.Item
          label='Toptal Projects'
          value={job.toptalProjects ? 'Yes' : 'No'}
        />
      </DL.Row>

      {skillSetFields.map(field => (
        <DL.Row key={field.label}>
          <DL.Item label={field.label} value={field.value} />
        </DL.Row>
      ))}

      <DL.Row>
        <DL.Item label='Industries'>
          {!!job.industries?.nodes?.length && (
            <IndustriesField industries={job.industries.nodes} />
          )}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        {canViewOpportunities && (
          <DL.Item label='Opportunity'>
            {job.opportunity && (
              <LinkWrapper
                wrapWhen={Boolean(job.opportunity.webResource.url)}
                href={job.opportunity.webResource.url as string}
                data-testid='job-information-opportunity-link'
              >
                <TypographyOverflow
                  as='span'
                  weight='inherit'
                  size='inherit'
                  color='inherit'
                >
                  {job.opportunity.name}
                </TypographyOverflow>
              </LinkWrapper>
            )}
          </DL.Item>
        )}
        <DL.Item label='Pre-sales Engagement'>
          <PresalesEngagementField
            jobId={job.id}
            presalesEngagement={job.presalesEngagement}
            presalesEngagementComment={job.presalesEngagementComment}
            operation={job.operations.updateJobPresalesEngagement}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Salesforce link'>
          {job.salesforceLink?.url && (
            <Link href={job.salesforceLink.url} target='_blank'>
              {job.salesforceLink.text}
            </Link>
          )}
        </DL.Item>
      </DL.Row>

      {job.status !== JobStatus.PENDING_CLAIM && job.nicheLongShot && (
        <DL.Row>
          <DL.Item label='Niche Long Shot' value='Yes' />
        </DL.Row>
      )}
    </DL>
  )
}

export default JobDetailedList
