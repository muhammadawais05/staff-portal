import React, { useMemo } from 'react'
import { Button } from '@toptal/picasso'
import {
  Modal,
  ModalForm,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { CloneJobForRehireInput } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { NodeType } from '@staff-portal/graphql'
import { COMMITMENT_FOR_REHIRE } from '@staff-portal/jobs'

import { useCloneJobForRehireMutation } from './hooks'

interface Props extends ModalComponentBaseProps {
  jobId: string
}

const commitmentOptions = Object.entries(COMMITMENT_FOR_REHIRE).map(
  ([key, text]) => ({ text: text, value: key })
)

const CloneForRehireModal = ({ jobId, hideModal }: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])
  const { handleSubmit, loading } = useCloneJobForRehireMutation({
    jobId,
    hideModal
  })

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'cloneJobForRehire'
      }}
      data-testid='CloneJobForRehireModal-modal'
    >
      <ModalForm<CloneJobForRehireInput>
        title='Rehire Request'
        onSubmit={handleSubmit}
        data-testid='CloneJobForRehireModal-form'
      >
        <Modal.Content>
          <Form.Select
            enableReset
            required
            label='Commitment'
            name='commitment'
            width='full'
            options={commitmentOptions}
            data-testid='CloneJobForRehireModal-select-commitment'
            placeholder='Please specify commitment'
          />
          <FormDatePickerWrapper
            name='startDate'
            required
            label='Start date'
            width='full'
            data-testid='CloneJobForRehireModal-start-date'
            minDate={minDate}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='CloneJobForRehireModal-submit-button'
          >
            Rehire
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default CloneForRehireModal
