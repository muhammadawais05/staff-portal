import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Container, Button, Typography } from '@toptal/picasso'
import { Link, useNavigate } from '@staff-portal/navigation'
import { useNotifications } from '@toptal/picasso/utils'
import { getJobPath, getJobSourcingRequestPath } from '@staff-portal/routes'
import { PageLoader } from '@staff-portal/ui'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { PageWithOperation, SourcingRequestFormFields } from '../../components'
import { SourcingRequestJobFragment } from '../../data'
import { CreateSourcingRequestFormInput } from '../../types'
import { prepareCreateSourcingRequestInput } from '../utils'
import {
  useCreateSourcingRequest,
  useGetJobDataForAddingSourcingRequest
} from './data'
import { useGetJobIdParam } from './hooks'

interface PageContentProps {
  jobId: string // Raw or non-encoded job JD
  job: SourcingRequestJobFragment
}

const PageContent = ({ jobId, job }: PageContentProps) => {
  const navigate = useNavigate()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [createSourcingRequest, { loading: mutationLoading }] =
    useCreateSourcingRequest({
      onError: () => {
        showError('Failed to create the sourcing request.')
      }
    })

  const jobTitle = job.webResource.text
  const jobUrl = job.webResource.url as string
  const browserTitle = `Add Sourcing Request for job ${jobTitle}`

  const JobTitle = () => (
    <Typography>
      Add Sourcing Request for job <Link href={jobUrl}>{jobTitle}</Link>
    </Typography>
  )

  const onSuccessAction = () => {
    navigate(getJobSourcingRequestPath(jobId))
  }

  const handleSubmit = async (input: CreateSourcingRequestFormInput) => {
    const { data: createResult } = await createSourcingRequest({
      variables: {
        input: prepareCreateSourcingRequestInput(input)
      }
    })

    return handleMutationResult({
      mutationResult: createResult?.createSourcingRequest,
      successNotificationMessage:
        'The sourcing request was successfully created.',
      onSuccessAction
    })
  }

  const handleCancel = () => {
    navigate(getJobPath(jobId))
  }

  // TODO: Prepare data to be bound to form input.
  // Most likely, we need to convert some special boolean values
  // to BooleanAsString type.
  const initialValues: Partial<CreateSourcingRequestFormInput> = {}

  return (
    <ContentWrapper browserTitle={browserTitle} title={<JobTitle />}>
      <Container bottom='large'>
        <Typography>🚧 Under Construction ... 🚧</Typography>
      </Container>

      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <SourcingRequestFormFields jobId={jobId} job={job} />

        <Container flex justifyContent='flex-end' top='medium'>
          <Button
            variant='secondary'
            onClick={handleCancel}
            disabled={mutationLoading}
          >
            Cancel
          </Button>

          <Form.SubmitButton variant='positive' loading={mutationLoading}>
            Submit Request
          </Form.SubmitButton>
        </Container>
      </Form>
    </ContentWrapper>
  )
}

const AddSourcingRequest = () => {
  const [jobId, encodedJobId] = useGetJobIdParam()
  const { data: job, loading } =
    useGetJobDataForAddingSourcingRequest(encodedJobId)

  if (!job || loading) {
    return (
      <Container data-testid='AddSourcingRequest-PageLoader'>
        <PageLoader />
      </Container>
    )
  }

  return (
    <PageWithOperation operation={job.operations?.createSourcingRequest}>
      <PageContent jobId={jobId} job={job} />
    </PageWithOperation>
  )
}

export default AddSourcingRequest
