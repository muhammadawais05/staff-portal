import React from 'react'
import { lazy } from '@staff-portal/utils'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { DefaultContactFragment } from '../../data/default-contact-fragment'
import { useGetClientSignerDetails } from './utils/use-get-client-signer-details'

interface Props {
  hideModal: () => void
  clientId: string
  defaultContact: DefaultContactFragment
  isSubsidiarySelected: boolean
}

const SendSTAForm = lazy(() => import('./components/SendStaForm/SendStaForm'))

const SendSTAModal = ({
  hideModal,
  clientId,
  defaultContact,
  isSubsidiarySelected
}: Props) => {
  const { data, loading } = useGetClientSignerDetails(clientId)

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: clientId,
        operationName: 'sendSTA',
        nodeType: NodeType.CLIENT
      }}
      defaultTitle='Send Sourced Talent Agreement'
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <SendSTAForm
          hideModal={hideModal}
          defaultContact={defaultContact}
          clientId={clientId}
          isSubsidiarySelected={isSubsidiarySelected}
          signerEmail={data?.signerEmail}
          signerFullName={data?.signerFullName}
        />
      )}
    </Modal>
  )
}

export default SendSTAModal
