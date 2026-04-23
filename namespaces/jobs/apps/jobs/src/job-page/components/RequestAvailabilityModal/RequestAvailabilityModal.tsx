import React, { useState } from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Container, Typography, Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { CreateAvailabilityRequestForJobInput } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { NodeType } from '@staff-portal/graphql'

import { TalentsInput, FavoritesTalentsOption } from './components'
import { useRequestAvailabilitySubmit, useGetFavoriteTalents } from './hooks'

interface Props {
  jobId: string
  jobTitle: string
  clientFullName: string
  jobType: string
  hideModal: () => void
}

export type CreateAvailabilityRequestForJobForm = {
  jobId: CreateAvailabilityRequestForJobInput['jobId']
  comment: CreateAvailabilityRequestForJobInput['comment']
  talentIds: FavoritesTalentsOption[]
}

const RequestAvailabilityModal = ({
  jobId,
  hideModal,
  jobTitle,
  clientFullName,
  jobType
}: Props) => {
  const [talentsInputValue, setTalentsInputValue] = useState(0)

  const { loading: favoriteTalentsLoading, favoriteTalentsOptions } =
    useGetFavoriteTalents(jobId)

  const { loading, handleSubmit } = useRequestAvailabilitySubmit({
    hideModal,
    jobId
  })

  const handleTalentsInputValueChange = (inputValueLength: number) => {
    setTalentsInputValue(inputValueLength)
  }

  const TITLE = titleize(jobType)

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='RequestAvailabilityModal'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'createAvailabilityRequestForJob'
      }}
    >
      {favoriteTalentsLoading ? (
        <ModalSuspender />
      ) : (
        <ModalForm onSubmit={handleSubmit} title={TITLE}>
          <Modal.Content>
            <Container bottom={2}>
              <Typography size='medium'>
                {`Select ${titleize(jobType, {
                  capitalizeAllWords: false
                }).toLowerCase()}s to request their availability for `}
                <Typography weight='semibold' inline>
                  {clientFullName} - {jobTitle}
                </Typography>
              </Typography>
            </Container>

            <TalentsInput
              favoriteTalentsOptions={favoriteTalentsOptions}
              onInputChange={handleTalentsInputValueChange}
              jobType={jobType}
              jobId={jobId}
            />

            <Form.Input
              label='Comment'
              name='comment'
              width='full'
              multiline
              rows={4}
              data-testid='RequestAvailabilityModal-comment'
            />
          </Modal.Content>

          <Modal.Actions>
            <Button variant='secondary' disabled={loading} onClick={hideModal}>
              Cancel
            </Button>
            <Form.SubmitButton
              variant='positive'
              data-testid='RequestAvailabilityModal-submit'
            >
              {talentsInputValue > 1
                ? `Send ${talentsInputValue} Availability Requests`
                : 'Send Availability Request'}
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default RequestAvailabilityModal
