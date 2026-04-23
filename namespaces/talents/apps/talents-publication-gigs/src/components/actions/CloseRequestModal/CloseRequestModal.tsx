import React from 'react'
import { Button, Container, Modal, Typography } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { CloseRequestInput } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'

import { useCloseGigRequest } from '../../../data/close-gig-request'

const SUCCESS_MESSAGE = 'Request closed successfully.'
const ERROR_MESSAGE = 'Unable to close request'

type Props = {
  onSubmit: () => void
  hideModal: () => void
  gigId: string
}

type CloseRequestModalFormValues = Pick<CloseRequestInput, 'closingReason'>

const CloseRequestModal = ({ hideModal, gigId }: Props) => {
  const { showError, showSuccess } = useNotifications()
  const [closeRequest, { loading }] = useCloseGigRequest({
    onCompleted: data => {
      const returnedErrors = data?.closeGig?.errors

      if (returnedErrors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          returnedErrors,
          ERROR_MESSAGE
        )

        showError(mutationErrorMessages)
      }

      if (data?.closeGig?.success) {
        showSuccess(SUCCESS_MESSAGE)
        hideModal()
      }
    },
    onError: () => {
      showError(ERROR_MESSAGE)
    }
  })

  const handleSubmit = ({ closingReason }: CloseRequestModalFormValues) => {
    closeRequest({
      variables: {
        gigId,
        closingReason
      }
    })
  }

  return (
    <Modal open onClose={hideModal} size='small'>
      <Form<CloseRequestModalFormValues> onSubmit={handleSubmit}>
        <Modal.Title data-testid='CloseRequest-title'>
          Close Request
        </Modal.Title>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              The request will be marked as closed and existing reach outs
              related to this request will be canceled.
            </Typography>
          </Container>
          <Form.Input
            name='closingReason'
            label='Reason for Closing'
            placeholder='Type reason...'
            width='full'
            required
            data-testid='CloseRequest-closingReason'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            disabled={loading}
            onClick={hideModal}
            data-testid='CloseRequest-cancel'
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='negative'
            loading={loading}
            data-testid='CloseRequest-confirm'
          >
            Confirm Close
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default CloseRequestModal
