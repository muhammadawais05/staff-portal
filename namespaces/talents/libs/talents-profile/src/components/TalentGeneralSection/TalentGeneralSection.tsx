/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { memo, ReactNode } from 'react'
import {
  Section,
  TypographyOverflow,
  Container,
  Tooltip,
  Typography,
  SkeletonLoader
} from '@toptal/picasso'
import { Info16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import {
  DEFAULT_TIME_FORMAT,
  format,
  getTimeZoneFullText
} from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'
import { isOperationEnabled, isOperationHidden } from '@staff-portal/operations'
import { ApplicationInfoField, getRoleTypeText } from '@staff-portal/facilities'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import {
  EngagementsRatesField,
  ClientWillHireAgainField,
  TalentCurrentInterviews,
  TalentHeaderSkeleton,
  TalentIndustries,
  TalentJobPreferences,
  ItemFieldSkeletonLoader,
  DeltaWaitingTimeField,
  RepeatedClientsField,
  WorkingStatusField,
  SpecializationsField,
  SupplyHealthPriorityField,
  AvailabilityStatusWithSubscription,
  TALENT_UPDATED
} from '@staff-portal/talents'
import { OFACStatusField } from '@staff-portal/ofac-compliance'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import {
  AccountField,
  LastLoginField,
  OtherRolesField,
  PhoneField,
  SkypeField,
  SlackField,
  SpokenLanguagesField
} from '@staff-portal/role-profile'
import { BillingNotesField } from '@staff-portal/billing'

import { useScreenersSetting } from '../../hooks'
import { extractGithubUsernameFromUrl } from '../../utils/extract-github-username-from-url'
import useTalentHeader from '../../hooks/use-talent-header/use-talent-header'
import { TalentProfileGeneralDataFragment } from './data/get-talent-profile-general-data'
import PaymentMethodsField from '../PaymentMethodsField'
import SignOnBonusField from '../SignOnBonusField'
import ApplicantSkillsField from '../ApplicantSkillsField'
import EligibleForRestorationField from '../EligibleForRestorationField'
import NPSScoreField from '../NPSScoreField'
import PrescreeningRecordingField from '../PrescreeningRecordingField'
import RateField from '../RateField'
import ReapplicationDateField from '../ReapplicationDateField'
import ReferrerField from '../ReferrerField'
import { generateDeadlines } from '../RejectForInactivityField/hooks'
import RejectForInactivityField from '../RejectForInactivityField'
import ResumeFilesField from '../ResumeFilesField'
import SourcerField from '../SourcerField'
import SpecialHandlingField from '../SpecialHandlingField'
import StatusFieldWithRejectionReason from '../StatusField/StatusFieldWithRejectionReason'
import TalentPortfolioField from '../TalentPortfolioField'
import TalentPortfolioUrlField from '../TalentPortfolioUrlField'
import IdVerificationField from '../IdVerificationField'
import useGetTalentGeneralData from './hooks/use-get-talent-general-data'
import * as S from './styles'

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

interface Props {
  talentId: string
}

// eslint-disable-next-line max-statements
// eslint-disable-next-line complexity
const TalentGeneralSection = ({ talentId }: Props) => {
  const { data: talent, error } = useGetTalentGeneralData(talentId)
  const { renderHeader, talentName } = useTalentHeader(talentId)

  const deadlines = generateDeadlines({
    rejectForInactivityData: talent?.rejectForInactivityData,
    talentId
  })

  const userDateFormatter = useUserDateFormatter()
  const userDateTimeFormatter = useUserDateTimeFormatter()
  const { screenersSetting } = useScreenersSetting()

  if (!talent) {
    return (
      <Section
        variant='withHeaderBar'
        title={<SkeletonLoader.Header />}
        actions={<SkeletonLoader.Button size='small' />}
      >
        <TalentHeaderSkeleton />
        {[...Array(20)].map((__, itemIndex) => (
          <ItemFieldSkeletonLoader
            // eslint-disable-next-line react/no-array-index-key
            key={itemIndex}
            layout='half-row'
            labelWidth={100}
            valueWidth={100}
          />
        ))}
      </Section>
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
    talentPartnership,
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
    allocatedHoursAvailabilityIncludingEndingEngagements,
    availableHours,
    availableHoursIncludingEndingEngagements,
    allocatedHoursConfirmedAt,
    unavailableAllocatedHoursChangeRequest,
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
    jobPreferences,
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
        subscribeToTalentAvailabilityUpdatesOperation,
      addRoleFlag: addTalentRoleFlag
    }
  } = talent

  const rateRecommendationUnauthorized = hasAuthorizationError(
    error,
    'rateRecommendation'
  )

  const isRecordingBeingProcessed = Boolean(
    error?.graphQLErrors[0]?.path?.includes('prescreeningRecordingUrl')
  )

  return (
    <Section
      variant='withHeaderBar'
      title={
        <TypographyOverflow
          weight='inherit'
          data-testid='talent-general-section-title'
        >
          {talentName}
        </TypographyOverflow>
      }
      actions={
        <AddRoleFlagButton
          roleId={talentId}
          fullName={talentName as string}
          operation={addTalentRoleFlag}
        />
      }
      data-testid='talent-general-section'
    >
      {renderHeader()}
      <Section>
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DL defaultValue={NO_VALUE} labelColumnWidth={11}>
          <DL.Row>
            <DL.Item
              label='Profile type'
              value={getRoleTypeText(type, { roleTitle })}
            />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Email'>
              <Link href={`mailto:${email}`}>{email}</Link>
            </DL.Item>
          </DL.Row>
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Toptal email'>
                {toptalEmail ? (
                  <Link href={`mailto:${toptalEmail}`}>{toptalEmail}</Link>
                ) : null}
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Slack'>
                <SlackField slackContacts={slackContacts} />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Phone'>
                <PhoneField roleId={id} phoneContacts={phoneContacts} />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Skype'>
                {skypeContacts.nodes[0]?.value ? (
                  <SkypeField
                    additionalSkypeIds={additionalSkypeIds?.nodes}
                    skypeId={skypeContacts.nodes[0]?.value}
                  />
                ) : null}
              </DL.Item>
            </DL.Row>
          )}

          {supplyHealthModelData ? (
            <DL.Row>
              <DL.Item label='Supply Health Priority'>
                <SupplyHealthPriorityField
                  priority={supplyHealthModelData.priority}
                  snapshotAt={userDateFormatter(
                    supplyHealthModelData.snapshotAt
                  )}
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && otherRoles?.nodes.length ? (
            <DL.Row>
              <DL.Item label='Other roles'>
                <OtherRolesField otherRoles={otherRoles?.nodes} />
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Working status'>
                <WorkingStatusField
                  workingNumber={engagements.counters.workingNumber}
                  options={{
                    weight: 'semibold',
                    size: 'medium',
                    color: undefined
                  }}
                />
              </DL.Item>
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Allocated hours'
                value={`${allocatedHours} hours/week`}
              />
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Availability'>
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
                    preliminarySearchSetting,
                    unavailableAllocatedHoursChangeRequest
                  }}
                  talentAvailabilitySubscription={
                    viewerActiveAvailabilitySubscription
                  }
                  associatedRoles={associatedRoles?.nodes}
                  mode='detailed'
                />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Twitter'>
                {twitter ? (
                  <Link href={`https://twitter.com/${twitter}`}>
                    @{twitter}
                  </Link>
                ) : null}
              </DL.Item>
            </DL.Row>
          )}

          <DL.Row>
            <DL.Item label='ID Verification'>
              {recentIdVerification ? (
                <IdVerificationField
                  recentIdVerification={recentIdVerification}
                  cumulativeStatus={cumulativeStatus}
                  talentId={talentId}
                  operation={approveTalentIdVerificationOperation}
                />
              ) : null}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Full legal name' value={legalName} />
          </DL.Row>
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Billing name' value={billingName} />
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Use billing name'
                value={useBillingName ? 'Yes' : 'No'}
              />
            </DL.Row>
          )}

          <DL.Row>
            <DL.Item label='Current country' value={locationV2?.countryName} />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Current city' value={cityDescription} />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Time zone' value={getTimeZoneFullText(timeZone)} />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Citizenship' value={citizenship?.name} />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Status'>
              <StatusFieldWithRejectionReason
                talentId={talentId}
                talentStatus={talentStatus}
                options={{
                  weight: 'semibold',
                  size: 'medium',
                  color: undefined
                }}
                investigations={investigations}
              />
            </DL.Item>
          </DL.Row>
          {cumulativeStatus === TalentCumulativeStatus.REJECTED ||
          cumulativeStatus === TalentCumulativeStatus.REJECTED_INACTIVE ? (
            <DL.Row>
              <DL.Item label='Eligible for restoration'>
                <EligibleForRestorationField
                  talentId={talentId}
                  value={Boolean(eligibleForRestoration)}
                  operation={updateEligibleForRestorationOperation}
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          <DL.Row>
            <DL.Item label='Applied' value={userDateFormatter(joinedAt)} />
          </DL.Row>
          <DL.Row>
            <DL.Item
              label='Application form'
              value={userDateFormatter(applicationDetailsSubmittedAt)}
            />
          </DL.Row>
          {signingBonusExpiresAt ? (
            <DL.Row>
              <DL.Item label='Sign-on bonus'>
                <SignOnBonusField
                  talentId={talentId}
                  predictedTimeZone={predictedTimeZone}
                  date={signingBonusExpiresAt}
                  operation={updateTalentSigningBonusDeadlineOperation}
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          {deadlines?.map(deadline => (
            <DL.Row>
              <DL.Item label={deadline.label}>
                <RejectForInactivityField
                  deadline={deadline}
                  talentId={talentId}
                  timeZone={talent?.timeZone?.value}
                />
              </DL.Item>
            </DL.Row>
          ))}
          <DL.Row>
            <DL.Item label='Reapplication date'>
              <ReapplicationDateField
                talentId={talentId}
                date={reapplicationDate}
                operation={updateTalentReapplicationDateOperation}
              />
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item
              label='Approved'
              value={activatedAt ? userDateFormatter(activatedAt) : null}
            />
          </DL.Row>
          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Last edited'
                value={userDateFormatter(updatedAt)}
              />
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Last login'
                value={
                  ipLocation ? (
                    <LastLoginField
                      dateTime={userDateTimeFormatter(currentSignInAt)}
                      ip={currentSignInIp}
                      ipLocation={ipLocation}
                    />
                  ) : null
                }
              />
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Terms of service'
                value={
                  tosAcceptedAt
                    ? `Accepted on ${userDateFormatter(tosAcceptedAt)}`
                    : 'Not accepted'
                }
              />
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Code of conduct'
                value={
                  cocAcceptedAt
                    ? `Accepted on ${userDateFormatter(cocAcceptedAt)}`
                    : 'Not accepted'
                }
              />
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Working time'
                value={
                  workingTime &&
                  `From ${timeFormatter(workingTime.from)} to ${timeFormatter(
                    workingTime.to
                  )}`
                }
              />
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item
                label='Available shift range'
                value={
                  availableShiftRange &&
                  `From ${timeFormatter(
                    availableShiftRange.from
                  )} to ${timeFormatter(availableShiftRange.to)}`
                }
              />
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Rate'>
                <RateField
                  weeklyRate={weeklyRate}
                  hourlyRate={hourlyRate}
                  type={type}
                  rateRecommendation={rateRecommendation}
                  rateRecommendationUnauthorized={
                    rateRecommendationUnauthorized
                  }
                />
              </DL.Item>
            </DL.Row>
          )}

          <DL.Row>
            <DL.Item
              label='Website'
              value={getExternalLink({ href: profile?.website })}
            />
          </DL.Row>
          <DL.Row>
            <DL.Item
              label='LinkedIn profile'
              value={getExternalLink({ href: linkedinUrl })}
            />
          </DL.Row>
          {portfolioUrlData ? (
            <DL.Row>
              <DL.Item label='Portfolio URL'>
                <TalentPortfolioUrlField portfolioUrlData={portfolioUrlData} />
              </DL.Item>
            </DL.Row>
          ) : null}
          {portfolioData?.portfolio ? (
            <DL.Row>
              <DL.Item label='Portfolio'>
                <TalentPortfolioField
                  portfolioData={portfolioData}
                  specializationApplicationId={
                    specializationApplications?.nodes[0]?.id
                  }
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          {profile?.github !== undefined ? (
            <DL.Row>
              <DL.Item
                label='GitHub profile'
                value={getExternalLink({
                  href: profile?.github,
                  text: extractGithubUsernameFromUrl(profile?.github)
                })}
              />
            </DL.Row>
          ) : null}

          <DL.Row>
            <DL.Item
              label='Admission post'
              value={getExternalLink({ href: admissionPostUrl })}
            />
          </DL.Row>

          <DL.Row>
            <DL.Item label='Origin'>
              {applicationInfo?.webResource.url ? (
                <ApplicationInfoField
                  entityId={id}
                  tooltipContent={`The data collected can be affected by user's cookie blockers and privacy tools.`}
                  icon={<Info16 />}
                />
              ) : (
                <Tooltip
                  content={`The data collected can be affected by user's cookie blockers and privacy tools.`}
                  interactive
                >
                  <Container flex inline alignItems='center'>
                    {NO_VALUE}
                    <Container flex left='xsmall'>
                      <Info16 color='dark-grey' />
                    </Container>
                  </Container>
                </Tooltip>
              )}
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Referrer'>
              <ReferrerField
                id={talentId}
                referrer={referrer}
                canIssueSourcingCommission={canIssueSourcingCommission}
                changeRoleReferrerOperation={changeRoleReferrerOperation}
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Sourcer'>
              <SourcerField
                id={talentId}
                sourcer={sourcer}
                changeTalentSourcerOperation={changeTalentSourcerOperation}
              />
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Resume'>
              <ResumeFilesField talentId={talentId} />
            </DL.Item>
          </DL.Row>
          {prescreeningRecordingUrl || isRecordingBeingProcessed ? (
            <DL.Row>
              <DL.Item label='Prescreening recording link'>
                <PrescreeningRecordingField
                  talentId={talentId}
                  prescreeningRecordingUrl={prescreeningRecordingUrl || ''}
                  operation={discardTalentPrescreeningVideoOperation}
                  isBeingProcessed={isRecordingBeingProcessed}
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='NPS Score'>
                <NPSScoreField talentId={talentId} />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Engagement rate'>
                <EngagementsRatesField
                  engagementRates={engagementRates?.node}
                />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && currentInterviews ? (
            <DL.Row>
              <DL.Item label='Current interviews'>
                <TalentCurrentInterviews
                  talentId={talentId}
                  talentType={type}
                  data={currentInterviews}
                />
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Client will hire again'>
                <ClientWillHireAgainField
                  data={clientWillHireAgain?.node?.feedbackStatistics}
                />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Repeated Clients'>
                <RepeatedClientsField
                  clientsNumber={engagements.counters.clientsNumber}
                  repeatedClientsNumber={
                    engagements.counters.repeatedClientsNumber
                  }
                />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Delta waiting time'>
                <DeltaWaitingTimeField
                  deltaWaitingDays={deltaWaitingDays}
                  lastClosedEngagementEndDate={lastClosedEngagementEndDate}
                  lastAvailabilityIncreaseDate={lastAvailabilityIncreaseDate}
                  trialsNumber={engagements.counters.trialsNumber}
                />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && talentPartner ? (
            <DL.Row>
              <DL.Item
                label='Talent partner'
                value={getPartnerLink(talentPartner)}
              />
            </DL.Row>
          ) : null}
          {!screenersSetting && talentPartnership ? (
            <DL.Row>
              <DL.Item
                label='Employment start date with talent partner'
                value={userDateFormatter(talentPartnership.employmentStartDate)}
              />
            </DL.Row>
          ) : null}
          <DL.Row>
            <DL.Item
              label='Primary skill'
              value={primarySkill ? primarySkill.title : null}
            />
          </DL.Row>
          {(talent?.vertical?.specializations?.totalCount || 0) > 1 && (
            <DL.Row>
              <DL.Item label='Specializations'>
                {specializationApplications?.nodes?.length ? (
                  <SpecializationsField
                    specializations={specializationApplications.nodes}
                  />
                ) : null}
              </DL.Item>
            </DL.Row>
          )}
          {(!isOperationHidden(updateTalentApplicantSkillsOperation) ||
            isOperationEnabled(updateTalentApplicantSkillsOperation)) && (
            <DL.Row>
              <DL.Item label='Applicant skills'>
                <ApplicantSkillsField
                  talentId={talentId}
                  applicantSkills={applicantSkills}
                />
              </DL.Item>
            </DL.Row>
          )}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Industries'>
                {profile?.industrySets?.nodes.length ? (
                  <TalentIndustries
                    industrySets={profile?.industrySets?.nodes}
                  />
                ) : null}
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Job Preferences'>
                <TalentJobPreferences preferences={jobPreferences} />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Spoken languages'>
                <SpokenLanguagesField languages={languages?.nodes || []} />
              </DL.Item>
            </DL.Row>
          )}

          {!screenersSetting &&
            (paymentOptions ? (
              <DL.Row>
                <DL.Item label='Payment methods'>
                  <PaymentMethodsField paymentOptions={paymentOptions} />
                </DL.Item>
              </DL.Row>
            ) : null)}

          {!screenersSetting &&
          isOperationEnabled(updateBillingNotesOperation) ? (
            <DL.Row>
              <DL.Item label='Notes'>
                <BillingNotesField
                  roleOrClientId={talentId}
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
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && paymentsHoldDescription ? (
            <DL.Row>
              <DL.Item label='Payments on hold'>
                <Container
                  flex
                  data-testid='payments-on-hold-field'
                  css={S.firstLetterIsUppercased}
                >
                  <span>{paymentsHoldDescription}</span>
                </Container>
              </DL.Item>
            </DL.Row>
          ) : null}
          {!screenersSetting && (
            <DL.Row>
              <DL.Item label='Account'>
                <AccountField unallocatedMemorandum={unallocatedMemorandum} />
              </DL.Item>
            </DL.Row>
          )}

          <DL.Row>
            <DL.Item label='OFAC status'>
              <OFACStatusField
                ofacStatus={ofacStatus}
                visualComplianceStatus={visualComplianceStatus}
              />
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Special handling'>
              <SpecialHandlingField
                talentId={talentId}
                operation={updateTalentSpecialHandlingOperation}
                specialHandling={specialHandling || false}
              />
            </DL.Item>
          </DL.Row>
        </DL>
      </Section>
    </Section>
  )
}

export default memo(TalentGeneralSection)
