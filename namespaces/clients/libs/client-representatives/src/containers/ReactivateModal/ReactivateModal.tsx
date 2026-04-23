import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { Button, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useReactivateCompanyRepresentative } from './data/reactivate-company-representative/reactivate-company-representative.staff.gql'
import { RepresentativeFragment } from '../../data'

export type Props = {
  contact: Pick<RepresentativeFragment, 'id' | 'fullName' | 'client'>
  hideModal: () => void
}

const ReactivateModal = ({
  contact: {
    id,
    fullName,
    client: {
      webResource: { text: companyName }
    }
  },
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [reactivateCompanyRepresentative, { loading }] =
    useReactivateCompanyRepresentative({
      onError: () =>
        showError('An error occurred, the contact has not been restored.')
    })

  const handleReactivate = async () => {
    const { data } = await reactivateCompanyRepresentative({
      variables: {
        companyRepresentativeId: id
      }
    })

    return handleMutationResult({
      mutationResult: data?.reactivateCompanyRepresentative,
      successNotificationMessage: `The Contact account for ${fullName} was successfully restored.`,
      onSuccessAction: () => hideModal()
    })
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <Modal.Title>Restore {fullName}?</Modal.Title>

      <Modal.Content>
        <Typography size='medium'>
          Are you sure you want to restore <b>{fullName}</b> as a Contact of{' '}
          {companyName}?
        </Typography>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Button variant='negative' loading={loading} onClick={handleReactivate}>
          Restore
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ReactivateModal
