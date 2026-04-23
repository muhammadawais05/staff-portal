import React, { useCallback, useState } from 'react'
import { Section } from '@toptal/picasso'
import {
  Maybe,
  NewEngagementWizardStep,
  TalentPitchInput
} from '@staff-portal/graphql/staff'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { OperationType } from '@staff-portal/operations'

import EmailComposerEmailPreview from '../EmailComposerEmailPreview/EmailComposerEmailPreview'
import EmailComposerFields from '../../components/EmailComposerFields/EmailComposerFields'
import EmailComposerModeButton from '../../components/EmailComposerModeButton/EmailComposerModeButton'
import { useCandidateSendingContext } from '../../hooks'
import {
  PitchStepJobFragment,
  PitchStepNewEngagementFragment,
  PitchStepPitchEmailMessagingFragment,
  PitchStepTalentFragment
} from '../../data/get-pitch-step-data'
import { JobSpecificResumeButton } from '../../components'
import { shouldShowJobSpecificResumeButton } from '../../utils'
import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import TalentCardBuilderButton from '../TalentCardBuilderButton/TalentCardBuilderButton'

export type Props = {
  job?: Maybe<PitchStepJobFragment>
  newEngagement?: Maybe<PitchStepNewEngagementFragment>
  pitchEmailMessaging?: Maybe<PitchStepPitchEmailMessagingFragment>
  senderId?: Maybe<string>
  talent?: Maybe<PitchStepTalentFragment>
  buildTalentPitchOperation?: OperationType
  isPitchTextEnabled: boolean
  showTalentCardPreview?: boolean
}

const EmailComposerSection = ({
  job,
  newEngagement,
  pitchEmailMessaging,
  senderId,
  talent,
  buildTalentPitchOperation,
  isPitchTextEnabled,
  showTalentCardPreview
}: Props) => {
  const { values: formValues } =
    useFormState<
      CandidateSendingStepAttributes<NewEngagementWizardStep.PITCH>
    >()
  const { change } = useForm()
  const { currentStep, stepsAttributes, setStepAttributes } =
    useCandidateSendingContext()
  const [isEditMode, setIsEditMode] = useState<boolean>(true)
  const [pitchData, setPitchData] = useState<TalentPitchInput | undefined>()

  const newEngagementResumeUrl = newEngagement?.resumeUrl
  const talentResumeUrl = talent?.resumeUrl
  const showJobSpecificResume = shouldShowJobSpecificResumeButton(
    newEngagementResumeUrl,
    talentResumeUrl
  )

  const handleSetEditMode = useCallback(
    (updatedIsEditMode: boolean, newPitchData?: TalentPitchInput) => {
      // Update step attributes when switching to preview mode
      if (!updatedIsEditMode) {
        setStepAttributes(
          currentStep as keyof CandidateSendingStepsAttributesByStep,
          { ...formValues, pitchData: newPitchData ?? pitchData }
        )
      }

      setIsEditMode(updatedIsEditMode)
    },
    [currentStep, formValues, pitchData, setStepAttributes]
  )

  const handleTalentCardBuilderComplete = (newPitchData: TalentPitchInput) => {
    setPitchData(newPitchData)
    change('pitchData', newPitchData)
    handleSetEditMode(false, newPitchData)
  }

  return (
    <Section
      variant='withHeaderBar'
      title='Email Composer'
      actions={
        <>
          {showJobSpecificResume && (
            <JobSpecificResumeButton resumeUrl={newEngagementResumeUrl} />
          )}

          <EmailComposerModeButton
            isEditMode={isEditMode}
            onClick={handleSetEditMode}
          />

          {talent && (
            <TalentCardBuilderButton
              attributes={stepsAttributes}
              talentId={talent.id}
              buildTalentPitchOperation={buildTalentPitchOperation}
              onComplete={handleTalentCardBuilderComplete}
            />
          )}
        </>
      }
      data-testid='email-composer-section'
    >
      {isEditMode && (
        <EmailComposerFields
          job={job}
          talent={talent}
          senderId={senderId}
          pitchEmailMessaging={pitchEmailMessaging}
          isPitchTextEnabled={isPitchTextEnabled}
          showTalentCardPreview={showTalentCardPreview}
        />
      )}

      {!isEditMode && <EmailComposerEmailPreview />}
    </Section>
  )
}

export default EmailComposerSection
