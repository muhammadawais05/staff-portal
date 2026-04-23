import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import React from 'react'

import { useGetConvertToSourcingFlowInfo } from '../../data'
import { ConvertToSourcingFlowModalForm } from '../ConvertToSourcingFlowModalForm'

export interface Props {
  talentId: string
  hideModal: () => void
}

export const ConvertToSourcingFlowModal = ({ talentId, hideModal }: Props) => {
  const { data: talentData, loading: talentDataLoading } =
    useGetConvertToSourcingFlowInfo(talentId)

  return (
    <Modal withForm onClose={hideModal} open align='top'>
      {talentDataLoading ? (
        <ModalSuspender />
      ) : (
        talentData && (
          <ConvertToSourcingFlowModalForm
            talentId={talentId}
            talentData={talentData}
            hideModal={hideModal}
          />
        )
      )}
    </Modal>
  )
}
