import React, { useCallback, useMemo } from 'react'
import { useForm, useFormState } from '@toptal/picasso-forms'

import ApproveJobStep1 from '../ApproveJobStep1'
import ApproveJobStep2 from '../ApproveJobStep2'
import ApproveJobStepRequiredSkillConfirmation from '../ApproveJobStepRequiredSkillConfirmation'
import ApproveJobStep3 from '../ApproveJobStep3'
import { ApproveJobForm, JobDetails } from '../../types'
import { getAvailabilityRequestAlert } from './utils'

export interface Props {
  job: JobDetails
  inTalentMatchers: boolean
  canManageJobMaxHourlyRate: boolean
  jobLongshotReasons: string[]
  jobUncertainOfBudgetReasons: string[]
  onClose: () => void
}

const ApproveJobSteps = ({
  job,
  inTalentMatchers,
  jobLongshotReasons,
  jobUncertainOfBudgetReasons,
  canManageJobMaxHourlyRate,
  onClose
}: Props) => {
  const {
    values: {
      skipSkillsChecks,
      skipQualityChecks,
      skills,
      showNoRequiredSkillsConfirmation
    }
  } = useFormState<ApproveJobForm>()
  const { change } = useForm<ApproveJobForm>()

  const navigateToStep1 = useCallback(() => {
    change('skipSkillsChecks', true)
    change('showNoRequiredSkillsConfirmation', true)
    change('skipQualityChecks', true)
  }, [change])
  const navigateToStep2 = useCallback(() => {
    change('showNoRequiredSkillsConfirmation', true)
    change('skipQualityChecks', true)
  }, [change])

  const hasRequiredSkills = useMemo(
    () => skills?.some(skill => skill.niceToHave === false),
    [skills]
  )

  const availabilityRequestAlert =
    job.limitedAvailabilityRequestsExperiment &&
    getAvailabilityRequestAlert(
      job.limitedAvailabilityRequestsExperiment.numberLimit,
      job.limitedAvailabilityRequestsExperiment.hoursLimit
    )

  if (skipSkillsChecks && skipQualityChecks) {
    return (
      <ApproveJobStep1
        job={job}
        inTalentMatchers={inTalentMatchers}
        canManageJobMaxHourlyRate={canManageJobMaxHourlyRate}
        jobLongshotReasons={jobLongshotReasons}
        jobUncertainOfBudgetReasons={jobUncertainOfBudgetReasons}
        onClose={onClose}
      >
        {availabilityRequestAlert}
      </ApproveJobStep1>
    )
  }

  if (skipQualityChecks) {
    return (
      <ApproveJobStep2
        job={job}
        onClose={onClose}
        navigateToStep1={navigateToStep1}
      >
        {availabilityRequestAlert}
      </ApproveJobStep2>
    )
  }

  if (!hasRequiredSkills && showNoRequiredSkillsConfirmation) {
    return <ApproveJobStepRequiredSkillConfirmation />
  }

  return (
    <ApproveJobStep3
      title={job.title}
      jobDescription={job.description ?? undefined}
      onClose={onClose}
      navigateToStep1={navigateToStep1}
      navigateToStep2={navigateToStep2}
    >
      {availabilityRequestAlert}
    </ApproveJobStep3>
  )
}

export default ApproveJobSteps
