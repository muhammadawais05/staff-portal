import React, { useState, useEffect } from 'react'
import { Button, Typography } from '@toptal/picasso'
import { Modal, useModal } from '@staff-portal/modals-service'
import {
  ClientCascadeUpdateInfo,
  UpdateClientClientPartnerPayload
} from '@staff-portal/graphql/staff'
import { StaffUserFragment } from '@staff-portal/staff'

import useUpdateClientClientPartner from '../../hooks/use-update-client-client-partner'
import { getUpdateClientPartnerMessage } from '../../utils'
import ClientPartnerUpdateDetailsModal from '../ClientPartnerUpdateDetailsModal'

interface Props {
  hideModal: () => void
  onCancel: () => void
  clientId: string
  clientPartner: Partial<StaffUserFragment> | undefined
  cascadeUpdateInfo: Partial<ClientCascadeUpdateInfo> | undefined
}

const TITLE = 'Update Client Partner'

const UpdateClientPartnerModal = ({
  hideModal: hideUpdateModal,
  onCancel: handleCancel,
  clientId,
  clientPartner,
  cascadeUpdateInfo
}: Props) => {
  const [cascadeUpdate, setCascadeUpdate] = useState(false)
  const [mutationResult, setMutationResult] =
    useState<UpdateClientClientPartnerPayload>()
  const { showModal: showNotificationModal } = useModal(
    ClientPartnerUpdateDetailsModal,
    {
      data: mutationResult,
      assignee: mutationResult?.client?.clientPartner?.fullName
    }
  )
  const { loading, updateClientPartner } = useUpdateClientClientPartner(
    result => {
      setMutationResult(result)
    },
    {
      clientId,
      clientPartnerId: clientPartner?.id ?? null,
      cascade: false
    }
  )
  const message = getUpdateClientPartnerMessage({
    assignee: clientPartner?.fullName,
    companies: cascadeUpdateInfo?.clientsToUpdateCount,
    opportunities: cascadeUpdateInfo?.opportunitiesToUpdateCount
  })

  const onSubmit = (cascade = false) => {
    setCascadeUpdate(cascade)
    updateClientPartner({ cascade })
  }

  const onCancel = () => {
    handleCancel()
    hideUpdateModal()
  }

  useEffect(() => {
    if (mutationResult?.client) {
      showNotificationModal()
      hideUpdateModal()
    }
  }, [mutationResult, showNotificationModal, hideUpdateModal])

  const updateAllLoading = loading && cascadeUpdate
  const updateThisCompanyLoading = loading && !cascadeUpdate

  return (
    <Modal open onClose={onCancel} data-testid='UpdateClientClientPartnerModal'>
      <Modal.Title>{TITLE}</Modal.Title>
      <Modal.Content>
        <Typography>{message}</Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant='positive'
          disabled={updateAllLoading}
          loading={updateThisCompanyLoading}
          onClick={() => onSubmit()}
          data-testid='UpdateClientClientPartnerModal-update'
        >
          Update This Company Only
        </Button>
        <Button
          variant='positive'
          disabled={updateThisCompanyLoading}
          loading={updateAllLoading}
          onClick={() => onSubmit(true)}
          data-testid='UpdateClientClientPartnerModal-update-all'
        >
          Update All
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateClientPartnerModal
