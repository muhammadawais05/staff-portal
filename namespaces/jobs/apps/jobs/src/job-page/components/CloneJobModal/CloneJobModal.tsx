import React, { useMemo } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { JobWorkType } from '@staff-portal/graphql/staff'
import { useQuery } from '@staff-portal/data-layer-service'
import { ContainerLoader, ModalSkeleton } from '@staff-portal/ui'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { NodeType } from '@staff-portal/graphql'

import { CloneJobLocationField } from './components'
import useCloneJobMutation, {
  CloneJobFormValues
} from './hooks/use-clone-job-mutation'
import { GetCloneJobInfoDocument } from './data/get-clone-job-info.staff.gql.types'

const TITLE = 'Clone Job'

type Props = {
  jobId: string
  hideModal: () => void
}

const CloneJobModal = ({ jobId, hideModal }: Props) => {
  const { data: job, loading: initialLoading } = useQuery(
    GetCloneJobInfoDocument,
    {
      variables: { jobId }
    }
  )
  const { handleSubmit, mutationLoading } = useCloneJobMutation({
    jobId,
    onCompleted: hideModal
  })

  const isJobOnsiteOrMixed =
    job?.node?.workType &&
    [JobWorkType.ONSITE, JobWorkType.MIXED].includes(job.node.workType)

  const availableSpecializations = job?.node?.availableSpecializations?.nodes
  const shouldShowSpecializations =
    availableSpecializations && availableSpecializations.length > 1

  const initialValues = useMemo<Omit<CloneJobFormValues, 'startDate'>>(
    () => ({
      toptalProjects: job?.node?.toptalProjects ? 'true' : 'false',
      location: {
        countryId: job?.node?.location?.country?.id,
        cityName: job?.node?.location?.cityName
      },
      longshotReasons: job?.node?.longshotReasons,
      specializationId: job?.node?.specialization?.id
    }),
    [job]
  )

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'cloneJob'
      }}
      data-testid='clone-job-modal'
    >
      <ContainerLoader
        loading={mutationLoading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={TITLE} />}
        data-testid='CloneJobModal-loader'
      >
        <Form<CloneJobFormValues>
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Modal.Title>{TITLE}</Modal.Title>
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium'>
                Are you sure that you want to clone this job? This will create
                new job with the same details. This is useful if company needs
                several developers for similar positions.
              </Typography>
            </Container>
            <FormDatePickerWrapper
              label='Desired Start Date'
              name='startDate'
              defaultValue={job?.node?.startDate}
              required
              autoFocus
              width='full'
              data-testid='clone-job-modal-start-date'
            />

            <Form.RadioGroup
              required
              horizontal
              name='toptalProjects'
              label='Toptal projects'
              titleCase={false}
            >
              <Form.Radio label='Yes' value='true' />
              <Form.Radio label='No' value='false' />
            </Form.RadioGroup>

            {isJobOnsiteOrMixed && <CloneJobLocationField />}

            {job?.node?.skillLongShot && (
              <>
                <Container top='small' bottom='small'>
                  <Container right='small' inline>
                    <Typography size='medium' inline>
                      Skill Long Shot
                    </Typography>
                  </Container>
                  <Typography size='medium' weight='semibold' inline>
                    Yes
                  </Typography>
                </Container>
                <Form.CheckboxGroup
                  name='longshotReasons'
                  label='Longshot Reasons'
                >
                  {job.jobLongshotReasons?.map(jobLongshotReason => (
                    <Form.Checkbox
                      key={jobLongshotReason}
                      label={jobLongshotReason}
                      value={jobLongshotReason}
                    />
                  ))}
                </Form.CheckboxGroup>
              </>
            )}

            {shouldShowSpecializations && (
              <Form.Select
                label='Specialization'
                name='specializationId'
                options={
                  availableSpecializations
                    ? availableSpecializations.map(specialization => ({
                        text: specialization.title,
                        value: specialization.id
                      }))
                    : []
                }
                required
              />
            )}
          </Modal.Content>

          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              variant='positive'
              data-testid='CloneJobModal-submit-button'
            >
              Clone Job
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      </ContainerLoader>
    </Modal>
  )
}

export default CloneJobModal
