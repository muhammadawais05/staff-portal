import React, { useMemo } from 'react'
import {
  Button,
  Container,
  Grid,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { Link, useNavigate } from '@staff-portal/navigation'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { getJobPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { JobEditFragment, JobIndustriesField } from '@staff-portal/jobs'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { JobEditFormValues } from '../../types'
import { getInitialValues } from './utils/get-initial-values'
import { transformJobEditInput } from './utils/transform-edit-job-input'
import JobBasicInfoFormContent from '../JobBasicInfoFormContent'
import JobDetailsFormContent from '../JobDetailsFormContent'
import JobSkillsFields from '../JobSkillsFields'
import { useUpdateJob } from './data'

const ERROR_MESSAGE = 'An error occurred, the job was not updated.'
const SUCCESS_MESSAGE = 'The job was successfully updated.'

interface Props {
  job: JobEditFragment
}

const JobEditForm = ({ job }: Props) => {
  const jobId = job.id
  const initialValues = useMemo(() => getInitialValues(job), [job])

  const { handleMutationResult } = useHandleMutationResult()
  const navigate = useNavigate()
  const { showError } = useNotifications()
  const [updateJob] = useUpdateJob({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit = async (formValues: JobEditFormValues) => {
    const { data: result } = await updateJob({
      variables: {
        input: transformJobEditInput(jobId, formValues)
      }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.updateJob,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        navigate(getJobPath(decodeEntityId(jobId).id))
      }
    })
  }

  return (
    <Form<JobEditFormValues>
      autoComplete='off'
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      onSubmit={handleSubmit}
    >
      <FormBaseErrorContainer bottom='medium' />

      <JobBasicInfoFormContent job={job} />
      <JobDetailsFormContent job={job} />
      <JobSkillsFields
        defaultSkillCategoryId={job?.defaultSkillCategory?.id ?? ''}
        defaultSkillCategoryTitle={job?.defaultSkillCategory?.title ?? ''}
        initialCoreSkills={job?.coreSkills?.nodes}
      />

      <JobIndustriesField />

      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container gap='xsmall'>
              <Form.SubmitButton
                variant='positive'
                data-testid='job-edit-form-save-button'
              >
                Save Changes
              </Form.SubmitButton>

              {job.webResource.url && (
                <Button
                  as={Link as typeof PicassoLink}
                  variant='secondary'
                  noUnderline
                  href={job.webResource.url}
                >
                  Cancel
                </Button>
              )}
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Form>
  )
}

export default JobEditForm
