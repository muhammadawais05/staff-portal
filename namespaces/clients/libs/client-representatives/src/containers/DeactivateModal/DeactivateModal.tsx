import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useDeactivateCompanyRepresentative } from './data/deactivate-company-representative/deactivate-company-representative.staff.gql'
import { RepresentativeFragment } from '../../data'
import { mapCommOptsToLabels } from '../../services'

export type Props = {
  contact: Pick<
    RepresentativeFragment,
    'id' | 'fullName' | 'client' | 'disabledCommunicationOptions'
  >
  hideModal: () => void
}

const DeactivateModal = ({
  contact: {
    id,
    fullName,
    client: {
      webResource: { text: companyName }
    },
    disabledCommunicationOptions
  },
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [deactivateCompanyRepresentative, { loading }] =
    useDeactivateCompanyRepresentative({
      onError: () =>
        showError('An error occurred, the contact has not been deleted.')
    })

  const handleDeactivate = async () => {
    const { data } = await deactivateCompanyRepresentative({
      variables: {
        companyRepresentativeId: id
      }
    })

    return handleMutationResult({
      mutationResult: data?.deactivateCompanyRepresentative,
      successNotificationMessage: `The Contact account for ${fullName} was successfully deleted.`,
      onSuccessAction: () => {
        hideModal()
      }
    })
  }

  const readableCommunicationOptions = disabledCommunicationOptions
    ?.map(mapCommOptsToLabels)
    .join(', ')

  return (
    <Modal onClose={hideModal} open size='small'>
      <Modal.Title>Delete {fullName}?</Modal.Title>

      <Modal.Content>
        <Typography size='medium'>
          Are you sure you want to delete <b>{fullName}</b> as a Contact of{' '}
          {companyName}?
        </Typography>

        {disabledCommunicationOptions &&
          readableCommunicationOptions &&
          disabledCommunicationOptions.length > 0 && (
            <Container top='small'>
              <Typography size='medium'>
                {disabledCommunicationOptions.length > 1 ? (
                  <>
                    You are deleting the only contact associated with the
                    following actions: {readableCommunicationOptions}. These{' '}
                    actions will automatically transfer to the primary contact.
                  </>
                ) : (
                  <>
                    You are deleting the only contact associated with the
                    following action: {readableCommunicationOptions}. This
                    action will automatically transfer to the primary contact.
                  </>
                )}
              </Typography>
            </Container>
          )}
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Button variant='negative' loading={loading} onClick={handleDeactivate}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeactivateModal
