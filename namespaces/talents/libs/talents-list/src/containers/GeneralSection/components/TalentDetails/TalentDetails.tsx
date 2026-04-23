/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { NO_VALUE } from '@staff-portal/config'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'
import React from 'react'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { isNumber } from '@toptal/picasso/utils'
import {
  AvailabilityStatus,
  TalentEngagementsRates,
  hasCustomRequirements,
  BestMatchField,
  ClientWillHireAgainField,
  DeltaWaitingTimeField,
  InterviewedBeforeField,
  JobApplicationStatusField,
  LastVisitedField,
  RepeatedClientsField,
  StatusField,
  TalentAvailabilityRequests,
  TalentCurrentInterviews,
  TalentCustomRequirements,
  TalentIndustries,
  TalentJobPreferences,
  TalentLeadership,
  TalentRateField,
  WorkEligibility,
  WorkingStatusField,
  TalentEnterpriseExperience,
  SpecializationsField
} from '@staff-portal/talents'
import { getRoleTypeText } from '@staff-portal/facilities'

import { TalentListItemType } from '../../../../types'
import {
  JobCandidateTalentListItemFragment,
  TalentListJobDataFragment
} from '../../../../data'

interface Props {
  talent: TalentListItemType
  jobCandidate?: JobCandidateTalentListItemFragment
  isBestMatchQueryEnabled: boolean
  jobData?: TalentListJobDataFragment | null
}

const getLocationValue = (
  cityDescription: string | null | undefined,
  countryName: string | null | undefined
) =>
  cityDescription && countryName
    ? `${cityDescription}, ${countryName}`
    : cityDescription || countryName

const TalentDetails = ({
  talent,
  jobCandidate,
  isBestMatchQueryEnabled,
  jobData
}: Props) => {
  const userDateFormatter = useUserDateFormatter()

  const talentAvailability = {
    id: talent.id,
    type: talent.type,
    roleTitle: talent.roleTitle,
    allocatedHoursAvailability: talent.allocatedHoursAvailability,
    availableHours: talent.availableHours,
    availableHoursIncludingEndingEngagements:
      talent.availableHoursIncludingEndingEngagements,
    allocatedHours: talent.allocatedHours,
    allocatedHoursAvailabilityIncludingEndingEngagements:
      talent.allocatedHoursAvailabilityIncludingEndingEngagements,
    allocatedHoursConfirmedAt: talent.allocatedHoursConfirmedAt,
    endingEngagements: talent.endingEngagements,
    preliminarySearchSetting: talent.preliminarySearchSetting,
    unavailableAllocatedHoursChangeRequest:
      talent.unavailableAllocatedHoursChangeRequest
  }
  const isActive = talent.cumulativeStatus === TalentCumulativeStatus.ACTIVE
  const clientWillHireAgainFragment = {
    id: talent.id,
    feedbackStatistics: talent.feedbackStatistics
  }

  return (
    <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
      <DL.Row>
        <DL.Item label='Status'>
          <StatusField
            cumulativeStatus={talent.cumulativeStatus}
            investigations={talent.investigations}
            newcomer={!!talent.newcomer}
            topShield={talent.topShield}
            jobIssues={jobCandidate?.jobIssues}
          />
        </DL.Item>
        <DL.Item label='Working Status'>
          <WorkingStatusField
            workingNumber={talent.engagements.counters.workingNumber}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Availability'>
          <AvailabilityStatus
            talentAvailability={talentAvailability}
            associatedRoles={talent.associatedRoles?.nodes}
            mode='detailed'
          />
        </DL.Item>
      </DL.Row>
      {talent.talentPartner && (
        <DL.Row>
          <DL.Item label='Talent Partner'>
            <LinkWrapper
              wrapWhen={Boolean(talent.talentPartner?.webResource.url)}
              href={talent.talentPartner?.webResource.url as string}
            >
              {talent.talentPartner?.webResource.text ||
                talent.talentPartner?.webResource.url}
            </LinkWrapper>
          </DL.Item>
        </DL.Row>
      )}
      <DL.Row>
        <DL.Item
          label='Location'
          value={getLocationValue(
            talent.cityDescription,
            talent.locationV2?.countryName
          )}
        />
        <DL.Item label='Time Zone' value={talent.timeZone?.name} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Applied' value={userDateFormatter(talent.joinedAt)} />
        <DL.Item
          label='Last Edited'
          value={userDateFormatter(talent.updatedAt)}
        />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Last Visit Date'>
          {talent.ipLocation && (
            <LastVisitedField
              lastVisitedDate={talent.lastVisitedDate}
              currentSignInAt={talent.currentSignInAt}
              currentSignInIp={talent.currentSignInIp}
              ipLocation={talent.ipLocation}
            />
          )}
        </DL.Item>
        {isActive ? (
          <DL.Item
            label='Approved'
            value={talent.activatedAt && userDateFormatter(talent.activatedAt)}
          />
        ) : (
          <DL.Item
            label='Last Edited'
            value={userDateFormatter(talent.updatedAt)}
          />
        )}
      </DL.Row>
      <DL.Row>
        {isActive && (
          <DL.Item label='Talent Rate'>
            <TalentRateField
              talentHourlyRate={talent.hourlyRate}
              clientRates={
                jobCandidate?.defaultClientRates ?? talent.defaultClientRates
              }
            />
          </DL.Item>
        )}
        <DL.Item label='Role' value={getRoleTypeText(talent.type)} />
      </DL.Row>
      {isActive && (
        <DL.Row>
          <DL.Item label='Engagement Rate'>
            <TalentEngagementsRates
              acceptedInterviewsNumber={
                talent.engagements.counters.acceptedInterviewsNumber
              }
              approvedTrialsNumber={
                talent.engagements.counters.approvedTrialsNumber
              }
              interviewsNumber={talent.engagements.counters.interviewsNumber}
              successRate={talent.engagements.counters.successRate}
              trialsNumber={talent.engagements.counters.trialsNumber}
            />
          </DL.Item>
          <DL.Item label='Client Will Hire Again'>
            <ClientWillHireAgainField
              data={clientWillHireAgainFragment.feedbackStatistics}
            />
          </DL.Item>
        </DL.Row>
      )}
      {isActive && (
        <DL.Row>
          <DL.Item label='Repeated Clients'>
            <RepeatedClientsField
              clientsNumber={talent.engagements.counters.clientsNumber}
              repeatedClientsNumber={
                talent.engagements.counters.repeatedClientsNumber
              }
            />
          </DL.Item>
          <DL.Item label='Delta Waiting Time'>
            <DeltaWaitingTimeField
              deltaWaitingDays={talent.deltaWaitingDays}
              lastClosedEngagementEndDate={talent.lastClosedEngagementEndDate}
              lastAvailabilityIncreaseDate={talent.lastAvailabilityIncreaseDate}
              trialsNumber={talent.engagements.counters.trialsNumber}
            />
          </DL.Item>
        </DL.Row>
      )}
      {isBestMatchQueryEnabled && (
        <DL.Row>
          <DL.Item label='Best Match'>
            {jobCandidate?.jobScore && (
              <BestMatchField
                bestMatchScore={jobCandidate.jobScore.bestMatchScore}
                bestMatchScoreRank={jobCandidate.jobScore.bestMatchScoreRank}
                totalRanked={jobCandidate.jobScore.totalRanked}
              />
            )}
          </DL.Item>
          <DL.Item label='Interviewed Before'>
            {jobCandidate?.previousInterviewsResult && jobData?.client && (
              <InterviewedBeforeField
                previousInterviewsResult={jobCandidate.previousInterviewsResult}
                clientName={jobData.client.fullName}
              />
            )}
          </DL.Item>
        </DL.Row>
      )}
      <DL.Row>
        <DL.Item label='Current Interviews'>
          {talent.currentInterviews && (
            <TalentCurrentInterviews
              talentId={talent.id}
              talentType={talent.type}
              data={talent.currentInterviews}
            />
          )}
        </DL.Item>
        <DL.Item label='Active Jobs'>
          {isActive && isNumber(talent.engagements.counters.workingNumber) && (
            <Link
              href={`${getTalentProfilePath(
                decodeEntityId(talent.id).id
              )}?jobs_filter=working#talent_jobs`}
            >
              {talent.engagements.counters.workingNumber}
            </Link>
          )}
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Availability Requests'>
          {talent.availabilityRequestMetadata && (
            <TalentAvailabilityRequests
              lowActivity={talent.availabilityRequestMetadata.lowActivity}
              pending={talent.availabilityRequestMetadata.pending}
              prediction={talent.availabilityRequestMetadata.prediction}
              recentConfirmed={
                talent.availabilityRequestMetadata.recentConfirmed
              }
              recentRejected={talent.availabilityRequestMetadata.recentRejected}
            />
          )}
        </DL.Item>
        <DL.Item label='Specializations'>
          {!!talent.specializationApplications?.nodes.length &&
            talent.vertical?.specializations.totalCount && (
              <SpecializationsField
                specializations={talent.specializationApplications.nodes}
              />
            )}
        </DL.Item>
      </DL.Row>
      <DL.Row>
        {jobCandidate?.jobApplicationStatus && (
          <DL.Item label='Job Application'>
            <JobApplicationStatusField
              jobApplicationStatus={jobCandidate?.jobApplicationStatus}
            />
          </DL.Item>
        )}
        <DL.Item label='Job Preferences'>
          <TalentJobPreferences preferences={talent.jobPreferences} />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Leadership'>
          <TalentLeadership
            yearsOfManagementExperience={
              talent.profile?.yearsOfManagementExperience
            }
            cumulativeReportRange={
              talent.profile?.employments.cumulativeReportRange
            }
          />
        </DL.Item>
        <DL.Item label='Enterprise Experience'>
          <TalentEnterpriseExperience
            yearsOfEnterpriseExperience={
              talent.profile?.yearsOfEnterpriseExperience
            }
          />
        </DL.Item>
      </DL.Row>
      {hasCustomRequirements(talent.profile?.customRequirements) && (
        <DL.Row>
          <DL.Item label='Custom Requirements'>
            <TalentCustomRequirements
              customRequirements={talent.profile?.customRequirements}
            />
          </DL.Item>
        </DL.Row>
      )}
      {!!talent.profile?.travelVisas?.nodes.length && (
        <DL.Row>
          <DL.Item label='Work Eligibility'>
            <WorkEligibility travelVisas={talent.profile.travelVisas.nodes} />
          </DL.Item>
        </DL.Row>
      )}
      <DL.Row>
        <DL.Item label='Industries'>
          {(talent.profile?.industrySets.nodes.length ?? 0) > 0 && (
            <TalentIndustries
              industrySets={talent.profile?.industrySets.nodes}
            />
          )}
        </DL.Item>
      </DL.Row>
    </DL>
  )
}

export default TalentDetails
