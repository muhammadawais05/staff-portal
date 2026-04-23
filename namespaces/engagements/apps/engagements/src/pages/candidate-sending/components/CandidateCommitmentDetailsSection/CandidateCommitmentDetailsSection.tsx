import React, { useCallback } from 'react'
import {
  EngagementCommitmentEnum,
  Maybe,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import {
  DetailedList,
  SectionWithDetailedListSkeleton,
  LinkWrapper
} from '@staff-portal/ui'
import { Section, TypographyOverflow } from '@toptal/picasso'
import { FormSpy, useFormState } from '@toptal/picasso-forms'
import { getRoleTypeText } from '@staff-portal/facilities'
import { useDebouncedCallback } from 'use-debounce'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'

import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import {
  useCandidateSendingContext,
  useGetJobCandidateData,
  useGetTalentCandidateData
} from '../../hooks'
import useUpdateFormValues from '../../hooks/use-update-form-values'
import { LABEL_COLUMN_WIDTH } from '../../config'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'
import * as S from '../../styles'
import {
  CommitmentTooLowQuestionItem,
  ConfirmAvailabilityQuestionItem,
  ConfirmCommitmentQuestionItem,
  ConfirmEngagementEndDatesQuestionItem,
  ConfirmSendCandidateQuestionItem,
  ConfirmLockOverrideQuestionItem,
  ConfirmHighPriorityLockQuestionItem,
  EngagementCommitmentItem,
  EstimatedLengthItem,
  LockOverrideReasonItem,
  TrialPeriodItem
} from './components'
import { AvailabilityStepDataFragment } from '../../data/get-availability-step-data'
import { AVAILABILITY_STEP_FORM_UPDATE } from '../../messages'

export interface Props {
  availabilityData?: Maybe<AvailabilityStepTalentAvailabilityDataFragment>
  availabilityDataLoading?: boolean
  commitmentDetailsData?: Maybe<AvailabilityStepDataFragment>
  onCommitmentChange: (commitment?: EngagementCommitmentEnum) => void
}

const CandidateCommitmentDetailsSection = ({
  availabilityData,
  availabilityDataLoading,
  commitmentDetailsData,
  onCommitmentChange
}: Props) => {
  const { values } =
    useFormState<
      CandidateSendingStepAttributes<NewEngagementWizardStep.AVAILABILITY>
    >()
  const { updateFormValues } =
    useUpdateFormValues<NewEngagementWizardStep.AVAILABILITY>()

  const {
    currentStep,
    jobId,
    talentId,
    hasPendingAssignment,
    setStepAttributes
  } = useCandidateSendingContext()

  useMessageListener(AVAILABILITY_STEP_FORM_UPDATE, updateFormValues)

  const { jobData, jobDataLoading } = useGetJobCandidateData({
    jobId,
    skip: !jobId
  })
  const { talentData, talentDataLoading } = useGetTalentCandidateData({
    talentId,
    skip: !talentId
  })

  const handleSetStepAttributes = useCallback(
    ({
      values: formValues
    }: {
      values: CandidateSendingStepAttributes<NewEngagementWizardStep.AVAILABILITY> | null
    }) => {
      setStepAttributes(
        currentStep as keyof CandidateSendingStepsAttributesByStep,
        formValues
      )
    },
    [currentStep, setStepAttributes]
  )
  const handleSetStepAttributesDebounced = useDebouncedCallback(
    handleSetStepAttributes,
    DEBOUNCE_LIMIT
  )

  if (jobDataLoading || talentDataLoading || availabilityDataLoading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Engagement Commitment Details'
        columns={1}
        items={5}
        labelColumnWidth={10}
      />
    )
  }

  if (!talentId || !jobData || !talentData || !availabilityData?.talent) {
    return null
  }

  const talentRoleType = getRoleTypeText(talentData.type)

  const {
    acquireHighPriorityLockOperation,
    commitment,
    commitmentTooLow,
    lockOverrideRequired,
    previousTalentEngagementForClient
  } = commitmentDetailsData || {}
  const estimatedLength = commitmentDetailsData?.job?.estimatedLength

  return (
    <Section variant='withHeaderBar' title='Engagement Commitment Details'>
      <FormSpy
        subscription={{ values: true }}
        onChange={handleSetStepAttributesDebounced}
      />

      <DetailedList
        striped={false}
        divided={false}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
      >
        <DetailedList.Row css={S.centerItemAlign}>
          <DetailedList.Item label='Engagement'>
            <LinkWrapper
              wrapWhen={Boolean(jobData.webResource?.url)}
              href={jobData.webResource?.url as string}
            >
              <TypographyOverflow
                size='medium'
                weight='semibold'
                color='inherit'
                as='span'
              >
                {jobData.webResource?.text}
              </TypographyOverflow>
            </LinkWrapper>
          </DetailedList.Item>
        </DetailedList.Row>

        <EngagementCommitmentItem onCommitmentChange={onCommitmentChange} />

        <TrialPeriodItem hasPendingAssignment={hasPendingAssignment} />

        <EstimatedLengthItem estimatedLength={estimatedLength} />

        <ConfirmSendCandidateQuestionItem
          previousTalentEngagementForClient={previousTalentEngagementForClient}
          talentFullName={talentData.fullName}
          talentProfileLink={talentData.profileLink?.url}
        />

        <CommitmentTooLowQuestionItem
          availabilityData={availabilityData}
          commitment={commitment}
          commitmentTooLow={commitmentTooLow}
        />

        <ConfirmAvailabilityQuestionItem
          talentFullName={talentData.fullName}
          talentRoleType={talentRoleType}
          talentProfileLink={talentData.profileLink?.url}
        />

        <ConfirmCommitmentQuestionItem
          jobCommitment={jobData.commitment}
          jobClientWebResource={jobData.client.webResource}
          jobExpectedWeeklyHoursWithDefault={
            availabilityData.job?.expectedWeeklyHoursWithDefault
          }
          talentAvailability={availabilityData.talent}
          talentRoleType={talentRoleType}
        />

        <ConfirmEngagementEndDatesQuestionItem
          talentAvailability={availabilityData.talent}
          jobExpectedWeeklyHoursWithDefault={
            availabilityData.job?.expectedWeeklyHoursWithDefault
          }
        />

        <ConfirmLockOverrideQuestionItem
          lockOverrideRequired={lockOverrideRequired}
        />

        <LockOverrideReasonItem
          lockOverrideConfirmed={values?.lockOverrideConfirmed}
        />

        <ConfirmHighPriorityLockQuestionItem
          acquireHighPriorityLockOperation={acquireHighPriorityLockOperation}
        />
      </DetailedList>
    </Section>
  )
}

export default CandidateCommitmentDetailsSection
