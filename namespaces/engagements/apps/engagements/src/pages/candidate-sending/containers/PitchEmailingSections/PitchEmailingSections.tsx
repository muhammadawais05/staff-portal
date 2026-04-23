import React from 'react'
import { Maybe, NewEngagementWizardStep } from '@staff-portal/graphql/staff'
import { Container } from '@toptal/picasso'
import { FormSpy } from '@toptal/picasso-forms'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import { OperationType } from '@staff-portal/operations'

import {
  useCandidateSendingContext,
  useNewEngagementWizardMutation
} from '../../hooks'
import { CandidateSendingStepAttributes } from '../../types'
import CandidateSendingForm from '../CandidateSendingForm'
import EmailOptionsSection from '../EmailOptionsSection'
import EmailDetailsSection from '../EmailDetailsSection'
import EmailComposerSection from '../EmailComposerSection'
import { CandidateSendingPitchStepActions } from './components'
import { getInitialValues } from './utils'
import { DoNotSendEmailSenderValue } from '../../constants'
import { PitchStepDataFragment } from '../../data/get-pitch-step-data'

export type Props = {
  pitchStepData?: Maybe<PitchStepDataFragment>
  buildTalentPitchOperation?: OperationType
  loading: boolean
}

const PitchEmailingSections = ({
  pitchStepData,
  buildTalentPitchOperation,
  loading
}: Props) => {
  const { queryParametersEngagementId, stepsAttributes, hasPendingAssignment } =
    useCandidateSendingContext()

  const newEngagementWizardMutation = useNewEngagementWizardMutation()

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Email Options'
        columns={1}
        items={5}
        labelColumnWidth={10}
        dataTestId='pitch-emailing-sections-skeleton'
      />
    )
  }

  if (!pitchStepData?.job) {
    return null
  }

  return (
    <CandidateSendingForm<NewEngagementWizardStep.PITCH>
      initialValues={getInitialValues({
        defaultPitchShowScheduleInterview:
          pitchStepData?.defaultPitchShowScheduleInterview,
        engagementId: queryParametersEngagementId,
        introductionEmail: pitchStepData.introductionEmail,
        job: pitchStepData.job,
        newEngagement: pitchStepData.newEngagement,
        pitchEmailMessaging: pitchStepData.pitchEmailMessaging,
        talent: pitchStepData.talent,
        talentPitch: pitchStepData.talentPitch
      })}
      onSubmit={newEngagementWizardMutation}
      actions={
        <CandidateSendingPitchStepActions
          draftStakeholderId={pitchStepData.draftStakeholder?.id}
          engagementId={stepsAttributes.engagementId}
          hasPendingAssignment={hasPendingAssignment}
          talentType={pitchStepData.talent?.type}
          toptalProjects={pitchStepData.job.toptalProjects}
          enterprise={pitchStepData.job.client.enterprise}
        />
      }
    >
      <Container bottom='medium'>
        <EmailOptionsSection
          claimer={pitchStepData.job.claimer}
          clientPartner={pitchStepData.job.client.clientPartner}
          hasToptalProjects={!!pitchStepData.job.toptalProjects}
        />
      </Container>

      <FormSpy<CandidateSendingStepAttributes<NewEngagementWizardStep.PITCH>>
        subscription={{ values: true }}
      >
        {({ values }) =>
          values?.senderId !== DoNotSendEmailSenderValue && (
            <>
              <Container bottom='medium'>
                <EmailDetailsSection
                  sender={pitchStepData.talent}
                  emailContext={pitchStepData.pitchEmailMessaging}
                />
              </Container>

              <Container bottom='medium'>
                <EmailComposerSection
                  job={pitchStepData?.job}
                  newEngagement={pitchStepData.newEngagement}
                  pitchEmailMessaging={pitchStepData.pitchEmailMessaging}
                  buildTalentPitchOperation={buildTalentPitchOperation}
                  senderId={values?.senderId}
                  talent={pitchStepData?.talent}
                  isPitchTextEnabled={pitchStepData.isPitchTextEnabled}
                  showTalentCardPreview={!!pitchStepData.talentPitch?.createdAt}
                />
              </Container>
            </>
          )
        }
      </FormSpy>
    </CandidateSendingForm>
  )
}

export default PitchEmailingSections
