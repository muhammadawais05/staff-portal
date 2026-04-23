/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { memo, ReactNode } from 'react'
import { Container, Typography, EmptyState } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import {
  DEFAULT_TIME_FORMAT,
  getTimeZoneFullText,
  format
} from '@staff-portal/date-time-utils'
import { DetailedList } from '@staff-portal/ui'
import { isOperationHidden, isOperationEnabled } from '@staff-portal/operations'
import { ApplicationInfoField, getRoleTypeText } from '@staff-portal/facilities'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import {
  AccountField,
  LastLoginField,
  OtherRolesField,
  PhoneField,
  SkypeField,
  SlackField,
  SpokenLanguagesField
} from '@staff-portal/role-profile'
import {
  ClientWillHireAgainField,
  DeltaWaitingTimeField,
  EngagementsRatesField,
  TalentCurrentInterviews,
  WorkingStatusField,
  RepeatedClientsField,
  SupplyHealthPriorityField,
  SpecializationsField,
  AvailabilityStatusWithSubscription,
  TALENT_UPDATED
} from '@staff-portal/talents'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import {
  useGetTalentGeneralData,
  ApplicantSkillsField,
  EligibleForRestorationField,
  IdVerificationField,
  NPSScoreField,
  PaymentMethodsField,
  PrescreeningRecordingField,
  RateField,
  ReapplicationDateField,
  ReferrerField,
  ResumeFilesField,
  SignOnBonusField,
  SourcerField,
  SpecialHandlingField,
  StatusFieldWithRejectionReason,
  TalentProfileGeneralDataFragment,
  TalentPortfolioField,
  TalentPortfolioUrlField,
  useRejectForInactivityFields,
  extractGithubUsernameFromUrl
} from '@staff-portal/talents-profile'
import { BillingNotesField } from '@staff-portal/billing'

import { TalentCommunityLeaderField } from '../TalentCommunityLeaderField'
import { CommunityLeaderData, CommunityLeaderBasicInfo } from '../../types'
import CommunityLeaderProfileSkeletonLoader from './CommunityLeaderProfileSkeletonLoader'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import CommunityLeaderUpdateField from '../CommunityLeaderUpdateField'
import * as S from './styles'

interface Props {
  talentId: string
  communityLeader: CommunityLeaderData
  communityLeaderBasicInfo: CommunityLeaderBasicInfo
}

const TalentTab = ({
  talentId,
  communityLeader,
  communityLeaderBasicInfo
}: Props) => {
  const { data: talent, loading, error } = useGetTalentGeneralData(talentId)

  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()

  const rejectForInactivityFields = useRejectForInactivityFields({
    rejectForInactivityData: talent?.rejectForInactivityData,
    talentId,
    timeZone: talent?.timeZone?.value
  })

  if (loading) {
    return <CommunityLeaderProfileSkeletonLoader />
  }

  if (!talent) {
    return (
      <Container top='large'>
        <EmptyState.Collection>
          Could not get community leader profile
        </EmptyState.Collection>
      </Container>
    )
  }

  const {
    id,
    type,
    roleTitle,
    email,
    primarySkill,
    admissionPostUrl,
    linkedinUrl,
    currentInterviews,
    sourcer,
    referrer,
    talentPartner,
    canIssueSourcingCommission,
    profile,
    toptalEmail,
    slackContacts,
    phoneContacts,
    skypeContacts,
    additionalSkypeIds,
    supplyHealthModelData,
    deltaWaitingDays,
    lastClosedEngagementEndDate,
    lastAvailabilityIncreaseDate,
    engagements,
    allocatedHours,
    twitter,
    legalName,
    billingName,
    useBillingName,
    locationV2,
    cityDescription,
    timeZone,
    citizenship,
    cumulativeStatus,
    eligibleForRestoration,
    joinedAt,
    applicationDetailsSubmittedAt,
    activatedAt,
    updatedAt,
    reapplicationDate,
    currentSignInAt,
    currentSignInIp,
    ipLocation,
    tosAcceptedAt,
    cocAcceptedAt,
    workingTime,
    availableShiftRange,
    hourlyRate,
    weeklyRate,
    rateRecommendation,
    ofacStatus,
    visualComplianceStatus,
    specialHandling,
    allocatedHoursAvailability,
    availableHours,
    availableHoursIncludingEndingEngagements,
    allocatedHoursAvailabilityIncludingEndingEngagements,
    allocatedHoursConfirmedAt,
    otherRoles,
    associatedRoles,
    endingEngagements,
    signingBonusExpiresAt,
    predictedTimeZone,
    preliminarySearchSetting,
    prescreeningRecordingUrl,
    languages,
    billingNotes,
    paymentsHoldDescription,
    unallocatedMemorandum,
    applicantSkills,
    engagementRates,
    talentStatus,
    paymentOptions,
    clientWillHireAgain,
    specializationApplications,
    portfolioUrlData,
    portfolioData,
    applicationInfo,
    investigations,
    recentIdVerification,
    viewerActiveAvailabilitySubscription,
    operations: {
      changeRoleReferrer: changeRoleReferrerOperation,
      changeTalentSourcer: changeTalentSourcerOperation,
      updateTalentReapplicationDate: updateTalentReapplicationDateOperation,
      updateTalentSpecialHandling: updateTalentSpecialHandlingOperation,
      updateTalentSigningBonusDeadline:
        updateTalentSigningBonusDeadlineOperation,
      updateEligibleForRestoration: updateEligibleForRestorationOperation,
      discardTalentPrescreeningVideo: discardTalentPrescreeningVideoOperation,
      updateBillingNotes: updateBillingNotesOperation,
      updateTalentApplicantSkills: updateTalentApplicantSkillsOperation,
      approveTalentIdVerification: approveTalentIdVerificationOperation,
      subscribeToTalentAvailabilityUpdates:
        subscribeToTalentAvailabilityUpdatesOperation
    }
  } = talent

  const rateRecommendationUnauthorized = hasAuthorizationError(
    error,
    'rateRecommendation'
  )

  const isRecordingBeingProcessed = Boolean(
    error?.graphQLErrors[0]?.path?.includes('prescreeningRecordingUrl')
  )

  const role = getCommunityLeaderRole(communityLeader)

  return (
    <Container top='small'>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        defaultValue={NO_VALUE}
        labelColumnWidth={11}
        // eslint-disable-next-line complexity, max-lines-per-function
        items={applyListStyle => [
          {
            label: 'Profile type',
            value: applyListStyle(
              <Link href={`${role?.webResource.url}#community_leader`}>
                {getRoleTypeText(type)}
              </Link>
            )
          },
          {
            label: 'Email',
            value: applyListStyle(<Link href={`mailto:${email}`}>{email}</Link>)
          },
          {
            label: 'Toptal email',
            value:
              toptalEmail &&
              applyListStyle(
                <Link href={`mailto:${toptalEmail}`}>{toptalEmail}</Link>
              )
          },
          {
            label: 'Slack',
            value: applyListStyle(<SlackField slackContacts={slackContacts} />)
          },
          {
            label: 'Phone',
            value: applyListStyle(
              <PhoneField roleId={id} phoneContacts={phoneContacts} />
            )
          },
          {
            label: 'Skype',
            value:
              skypeContacts.nodes[0]?.value &&
              applyListStyle(
                <SkypeField
                  additionalSkypeIds={additionalSkypeIds?.nodes}
                  skypeId={skypeContacts.nodes[0]?.value}
                />
              )
          },
          {
            label: 'Supply Health Priority',
            value:
              supplyHealthModelData &&
              applyListStyle(
                <SupplyHealthPriorityField
                  priority={supplyHealthModelData.priority}
                  snapshotAt={userDateFormatter(
                    supplyHealthModelData.snapshotAt
                  )}
                />
              ),
            hidden: !supplyHealthModelData
          },
          {
            label: 'Other roles',
            value: <OtherRolesField otherRoles={otherRoles?.nodes} />,
            hidden: otherRoles?.nodes.length === 0
          },
          {
            label: 'Community Leader',
            value: (
              <TalentCommunityLeaderField
                communityLeaderData={communityLeader}
                communityLeaderBasicInfo={communityLeaderBasicInfo}
                id={talentId}
                name={role?.fullName ?? ''}
              />
            ),
            hidden: !communityLeader
          },
          {
            label: 'Community Leader Type',
            value: (
              <CommunityLeaderUpdateField
                communityLeaderData={communityLeader}
              />
            ),
            hidden: !communityLeader?.node
          },
          {
            label: 'Community Leader Requested At',
            value: userDateFormatter(
              communityLeader?.application?.createdAt ??
                communityLeader?.node?.requestedAt
            ),
            hidden: !communityLeader
          },
          {
            label: 'About me',
            value: communityLeader?.node?.about,
            hidden: !communityLeader
          },
          {
            label: 'Initial Ideas',
            value: communityLeader?.application?.initialIdeas,
            hidden: !communityLeader
          },
          {
            label: 'Comments About Application',
            value: communityLeader?.application?.performerComment,
            hidden: !communityLeader?.application?.performerComment
          },
          {
            label: 'Working status',
            value: options => (
              <WorkingStatusField
                workingNumber={engagements.counters.workingNumber}
                options={options}
              />
            )
          },
          {
            label: 'Allocated hours',
            value: `${allocatedHours} hours/week`
          },
          {
            label: 'Availability',
            value: (
              <AvailabilityStatusWithSubscription
                talentId={id}
                operation={subscribeToTalentAvailabilityUpdatesOperation}
                talentAvailability={{
                  id,
                  type,
                  roleTitle,
                  allocatedHoursAvailability,
                  availableHours,
                  availableHoursIncludingEndingEngagements,
                  allocatedHours,
                  allocatedHoursAvailabilityIncludingEndingEngagements,
                  allocatedHoursConfirmedAt,
                  endingEngagements,
                  preliminarySearchSetting
                }}
                talentAvailabilitySubscription={
                  viewerActiveAvailabilitySubscription
                }
                associatedRoles={associatedRoles?.nodes}
                mode='detailed'
              />
            )
          },
          {
            label: 'Twitter',
            value:
              twitter &&
              applyListStyle(
                <Link href={`https://twitter.com/${twitter}`}>@{twitter}</Link>
              )
          },
          {
            label: 'ID Verification',
            value:
              recentIdVerification &&
              applyListStyle(
                <IdVerificationField
                  recentIdVerification={recentIdVerification}
                  cumulativeStatus={cumulativeStatus}
                  talentId={talent.id}
                  operation={approveTalentIdVerificationOperation}
                />
              )
          },
          { label: 'Full legal name', value: legalName },
          { label: 'Billing name', value: billingName },
          {
            label: 'Use billing name',
            value: useBillingName ? 'Yes' : 'No'
          },
          { label: 'Current country', value: locationV2?.countryName },
          { label: 'Current city', value: cityDescription },
          { label: 'Time zone', value: getTimeZoneFullText(timeZone) },
          { label: 'Citizenship', value: citizenship?.name },
          {
            label: 'Status',
            value: options => (
              <StatusFieldWithRejectionReason
                talentId={talent.id}
                talentStatus={talentStatus}
                options={options}
                investigations={investigations}
              />
            )
          },
          {
            label: 'Eligible for restoration',
            value: (
              <EligibleForRestorationField
                talentId={talent.id}
                value={Boolean(eligibleForRestoration)}
                operation={updateEligibleForRestorationOperation}
              />
            ),
            hidden:
              cumulativeStatus !== TalentCumulativeStatus.REJECTED &&
              cumulativeStatus !== TalentCumulativeStatus.REJECTED_INACTIVE
          },
          { label: 'Applied', value: userDateFormatter(joinedAt) },
          {
            label: 'Application form',
            value: userDateFormatter(applicationDetailsSubmittedAt)
          },
          {
            label: 'Sign-on bonus',
            value: (
              <SignOnBonusField
                talentId={talent.id}
                predictedTimeZone={predictedTimeZone}
                date={signingBonusExpiresAt}
                operation={updateTalentSigningBonusDeadlineOperation}
              />
            ),
            hidden: !signingBonusExpiresAt
          },
          ...rejectForInactivityFields,
          {
            label: 'Reapplication date',
            value: (
              <ReapplicationDateField
                talentId={talent.id}
                date={reapplicationDate}
                operation={updateTalentReapplicationDateOperation}
              />
            )
          },
          {
            label: 'Approved',
            value: activatedAt ? userDateFormatter(activatedAt) : null
          },
          { label: 'Last edited', value: userDateFormatter(updatedAt) },
          {
            label: 'Last login',
            value:
              ipLocation &&
              applyListStyle(
                <LastLoginField
                  dateTime={userDateTimeFormatter(currentSignInAt)}
                  ip={currentSignInIp}
                  ipLocation={ipLocation}
                />
              )
          },
          {
            label: 'Terms of service',
            value: tosAcceptedAt
              ? `Accepted on ${userDateFormatter(tosAcceptedAt)}`
              : 'Not accepted'
          },
          {
            label: 'Code of conduct',
            value: cocAcceptedAt
              ? `Accepted on ${userDateFormatter(cocAcceptedAt)}`
              : 'Not accepted'
          },
          {
            label: 'Working time',
            value:
              workingTime &&
              `From ${timeFormatter(workingTime.from)} to ${timeFormatter(
                workingTime.to
              )}`
          },
          {
            label: 'Available shift range',
            value:
              availableShiftRange &&
              `From ${timeFormatter(
                availableShiftRange.from
              )} to ${timeFormatter(availableShiftRange.to)}`
          },
          {
            label: 'Rate',
            value: applyListStyle(
              <RateField
                weeklyRate={weeklyRate}
                hourlyRate={hourlyRate}
                type={type}
                rateRecommendation={rateRecommendation}
                rateRecommendationUnauthorized={rateRecommendationUnauthorized}
              />
            )
          },
          {
            label: 'Website',
            value: applyListStyle(getExternalLink({ href: profile?.website }))
          },
          {
            label: 'LinkedIn profile',
            value: applyListStyle(getExternalLink({ href: linkedinUrl }))
          },
          {
            label: 'Portfolio URL',
            value: applyListStyle(
              <TalentPortfolioUrlField portfolioUrlData={portfolioUrlData} />
            ),
            hidden: !portfolioUrlData
          },
          {
            label: 'Portfolio',
            value: (
              <TalentPortfolioField
                portfolioData={portfolioData}
                specializationApplicationId={
                  specializationApplications?.nodes[0]?.id
                }
              />
            ),
            hidden: !portfolioData?.portfolio
          },
          {
            label: 'GitHub profile',
            value: applyListStyle(
              getExternalLink({
                href: profile?.github,
                text: extractGithubUsernameFromUrl(profile?.github)
              })
            ),
            hidden: !profile?.github
          },
          {
            label: 'Admission post',
            value: applyListStyle(getExternalLink({ href: admissionPostUrl }))
          },
          {
            label: 'Origin',
            value: applicationInfo?.webResource.url
              ? applyListStyle(<ApplicationInfoField entityId={id} />)
              : null
          },
          {
            label: 'Referrer',
            value: (
              <ReferrerField
                id={talent.id}
                referrer={referrer}
                canIssueSourcingCommission={canIssueSourcingCommission}
                changeRoleReferrerOperation={changeRoleReferrerOperation}
              />
            )
          },
          {
            label: 'Sourcer',
            value: (
              <SourcerField
                id={talent.id}
                sourcer={sourcer}
                changeTalentSourcerOperation={changeTalentSourcerOperation}
              />
            )
          },
          {
            label: 'Resume',
            value: applyListStyle(<ResumeFilesField talentId={talent.id} />)
          },
          {
            label: 'Prescreening recording link',
            value: applyListStyle(
              <PrescreeningRecordingField
                talentId={talent.id}
                prescreeningRecordingUrl={prescreeningRecordingUrl || ''}
                operation={discardTalentPrescreeningVideoOperation}
                isBeingProcessed={isRecordingBeingProcessed}
              />
            ),
            hidden: !prescreeningRecordingUrl && !isRecordingBeingProcessed
          },
          {
            label: 'NPS Score',
            value: applyListStyle(<NPSScoreField talentId={talent.id} />)
          },
          {
            label: 'Engagement rate',
            value: applyListStyle(
              <EngagementsRatesField engagementRates={engagementRates?.node} />
            )
          },
          {
            label: 'Current interviews',
            value: currentInterviews && (
              <TalentCurrentInterviews
                talentId={talent.id}
                talentType={talent.type}
                data={currentInterviews}
              />
            ),
            hidden: !currentInterviews
          },
          {
            label: 'Client will hire again',
            value: applyListStyle(
              <ClientWillHireAgainField
                data={clientWillHireAgain?.node?.feedbackStatistics}
              />
            )
          },
          {
            label: 'Repeated Clients',
            value: applyListStyle(
              <RepeatedClientsField
                clientsNumber={engagements.counters.clientsNumber}
                repeatedClientsNumber={
                  engagements.counters.repeatedClientsNumber
                }
              />
            )
          },
          {
            label: 'Delta waiting time',
            value: applyListStyle(
              <DeltaWaitingTimeField
                deltaWaitingDays={deltaWaitingDays}
                lastClosedEngagementEndDate={lastClosedEngagementEndDate}
                lastAvailabilityIncreaseDate={lastAvailabilityIncreaseDate}
                trialsNumber={engagements.counters.trialsNumber}
              />
            )
          },
          {
            label: 'Talent partner',
            value: getPartnerLink(talentPartner),
            hidden: !talentPartner
          },
          {
            label: 'Primary skill',
            value: primarySkill ? primarySkill.title : NO_VALUE
          },
          {
            label: 'Specializations',
            value: specializationApplications?.nodes.length ? (
              <SpecializationsField
                specializations={specializationApplications.nodes}
              />
            ) : null,
            hidden: (talent.vertical?.specializations?.totalCount ?? 0) <= 1
          },
          {
            label: 'Applicant skills',
            value: (
              <ApplicantSkillsField
                talentId={talent.id}
                applicantSkills={applicantSkills}
              />
            ),
            hidden:
              isOperationHidden(updateTalentApplicantSkillsOperation) ||
              !isOperationEnabled(updateTalentApplicantSkillsOperation)
          },
          {
            label: 'Spoken languages',
            value: applyListStyle(
              <SpokenLanguagesField languages={languages?.nodes || []} />
            )
          },
          {
            label: 'Payment methods',
            value: applyListStyle(
              <PaymentMethodsField paymentOptions={paymentOptions} />
            ),
            hidden: !paymentOptions
          },
          {
            label: 'Notes',
            hidden: !isOperationEnabled(updateBillingNotesOperation),
            value: (
              <BillingNotesField
                roleOrClientId={talent.id}
                billingNotes={billingNotes || undefined}
                operation={updateBillingNotesOperation}
                mutationResultOptions={{
                  successNotificationMessage: 'Contact information updated.',
                  successMessageEmitOptions: {
                    type: TALENT_UPDATED,
                    payload: { talentId }
                  }
                }}
              />
            )
          },
          {
            label: 'Payments on hold',
            value: applyListStyle(
              <Container
                flex
                data-testid='payments-on-hold-field'
                css={S.firstLetterIsUppercased}
              >
                <span>{paymentsHoldDescription}</span>
              </Container>
            ),
            hidden: !paymentsHoldDescription
          },
          {
            label: 'Account',
            value: applyListStyle(
              <AccountField unallocatedMemorandum={unallocatedMemorandum} />
            )
          },
          {
            label: 'OFAC status',
            value: (
              <OFACStatusField
                ofacStatus={ofacStatus}
                visualComplianceStatus={visualComplianceStatus}
              />
            )
          },
          {
            label: 'Special handling',
            value: (
              <SpecialHandlingField
                talentId={talent.id}
                operation={updateTalentSpecialHandlingOperation}
                specialHandling={specialHandling || false}
              />
            )
          }
        ]}
      />
    </Container>
  )
}

const getExternalLink = ({
  href,
  text
}: {
  href?: string | null
  text?: ReactNode
}) =>
  href ? (
    <Link href={href} target='_blank'>
      {text ?? href}
    </Link>
  ) : null

const getPartnerLink = (
  partner: TalentProfileGeneralDataFragment['talentPartner']
) =>
  partner?.webResource.url ? (
    <Typography size='medium' weight='semibold'>
      <Link href={partner.webResource.url}>{partner.webResource.text}</Link>
    </Typography>
  ) : null

const timeFormatter = (time: string) => {
  const [hour, minutes] = time.split(':').map(val => +val)
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const date = new Date()

  date.setHours(hour, minutes)

  return format(date, DEFAULT_TIME_FORMAT)
}

export default memo(TalentTab)
