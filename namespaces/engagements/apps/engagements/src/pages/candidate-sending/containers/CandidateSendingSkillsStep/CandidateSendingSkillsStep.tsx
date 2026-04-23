import React from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import CandidateSendingForm from '../CandidateSendingForm'
import CandidateSendingSkillsStepForm from '../CandidateSendingSkillsStepForm'
import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForSkillsStep
} from '../../hooks'
import { CandidateSendingSkillsStepFormSkeleton } from '../../components'

const CandidateSendingSkillsStep = () => {
  const { stepsAttributes } = useCandidateSendingContext()
  const { data, loading } =
    useGetCandidateSendingDataForSkillsStep(stepsAttributes)

  if (loading) {
    return <CandidateSendingSkillsStepFormSkeleton />
  }
  if (!data) {
    return null
  }

  return (
    <CandidateSendingForm<NewEngagementWizardStep.SKILLS>
      initialValues={{
        skillVettingResult: null,
        skillVettingComment: null
      }}
    >
      <CandidateSendingSkillsStepForm
        skillName={data.skillSetToVet?.skill.name}
        webResource={data.talent?.webResource}
      />
    </CandidateSendingForm>
  )
}

export default CandidateSendingSkillsStep
