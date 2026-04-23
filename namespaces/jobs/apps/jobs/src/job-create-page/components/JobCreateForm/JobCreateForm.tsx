import React, { useMemo } from 'react'
import {
  BackMinor16,
  Button,
  ChevronRight16,
  Container,
  Grid,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Section,
  Stepper
} from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { Link, useNavigate } from '@staff-portal/navigation'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { getJobPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { getInitialValues, transformCreateJobInput } from './utils'
import JobCreateDetailsStepForm from '../JobCreateDetailsStepForm'
import {
  JobCreateFormValues,
  JobCreateWizardSteps,
  JobStepByCurrentWizardStepMapping
} from '../../types'
import JobCreateSkillsAndIndustries from '../JobCreateSkillsAndIndustries'
import JobCreateBasicInfoForm from '../JobCreateBasicInfoForm'
import {
  JobCreateClientFragment,
  JobCreateOpportunityFragment
} from '../JobCreatePageContent/data/get-job-create-data'
import { useJobCreateWizard } from '../../hooks'
import { JOB_CREATE_WIZARD_STEPS_MAPPING } from '../../config'
import { useValidateWizardStep, useSubmitNewJobWizard } from './data'

const ERROR_MESSAGE = 'An error occurred, the job was not created.'
const SUCCESS_MESSAGE = 'The job was successfuly created.'

const renderCurrentStepForm = (
  stepIndex: number,
  client: JobCreateClientFragment
) => {
  switch (stepIndex) {
    case JobCreateWizardSteps.BASIC_INFO:
      return <JobCreateBasicInfoForm />

    case JobCreateWizardSteps.DETAILS:
      return <JobCreateDetailsStepForm client={client} />

    case JobCreateWizardSteps.SKILLS_AND_INDUSTRIES:
      return <JobCreateSkillsAndIndustries />
  }
}

export interface Props {
  client: JobCreateClientFragment
  cancelPath: string
  opportunity?: JobCreateOpportunityFragment | null
}

const JobCreateForm = ({ client, opportunity, cancelPath }: Props) => {
  const {
    activeStepIndex,
    goToNextStep,
    goToPreviousStep,
    nextStepTitle,
    isFirstStep,
    isLastStep
  } = useJobCreateWizard()

  const { validateStep } = useValidateWizardStep()

  const initialValues = useMemo(
    () => getInitialValues({ client, opportunity }),
    [client, opportunity]
  )

  const { handleMutationResult } = useHandleMutationResult()

  const { showError } = useNotifications()
  const navigate = useNavigate()

  const { submitNewJobWizard } = useSubmitNewJobWizard({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit = async (formValues: JobCreateFormValues) => {
    const createJobInput = transformCreateJobInput(formValues)

    if (!isLastStep) {
      const data = await validateStep(
        createJobInput,
        JobStepByCurrentWizardStepMapping[
          activeStepIndex as JobCreateWizardSteps
        ]
      )

      return handleMutationResult({
        isFormSubmit: true,
        mutationResult: data,
        onSuccessAction: goToNextStep
      })
    }

    const result = await submitNewJobWizard(createJobInput)

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.submitNewJobWizard,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        if (!result?.submitNewJobWizard?.job) {
          return
        }

        const { id: decodedJobId } = decodeEntityId(
          result.submitNewJobWizard.job.id
        )

        navigate(getJobPath(decodedJobId))
      }
    })
  }

  return (
    <Section
      variant='withHeaderBar'
      title={
        <Stepper
          active={activeStepIndex}
          steps={JOB_CREATE_WIZARD_STEPS_MAPPING}
        />
      }
    >
      <Form<JobCreateFormValues>
        autoComplete='off'
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mutators={{ ...arrayMutators }}
      >
        <FormBaseErrorContainer bottom='medium' />

        {renderCurrentStepForm(activeStepIndex, client)}

        <Container top='small'>
          <Grid alignItems='baseline' spacing={16}>
            <Grid.Item small={4} />
            <Grid.Item small={8}>
              <Container flex>
                {!isFirstStep && (
                  <Container right='medium'>
                    <Button
                      variant='secondary'
                      icon={<BackMinor16 />}
                      onClick={goToPreviousStep}
                    >
                      Back
                    </Button>
                  </Container>
                )}

                <Container right='xsmall'>
                  <Button
                    as={Link as typeof PicassoLink}
                    variant='secondary'
                    noUnderline
                    href={cancelPath}
                  >
                    Cancel
                  </Button>
                </Container>

                <Form.SubmitButton
                  variant='positive'
                  icon={<ChevronRight16 />}
                  iconPosition='right'
                >
                  {isLastStep ? 'Submit' : `Next - ${nextStepTitle}`}
                </Form.SubmitButton>
              </Container>
            </Grid.Item>
          </Grid>
        </Container>
      </Form>
    </Section>
  )
}

export default JobCreateForm
