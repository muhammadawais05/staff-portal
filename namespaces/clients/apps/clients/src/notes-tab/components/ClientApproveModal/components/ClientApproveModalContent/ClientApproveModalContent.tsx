import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import ClientApproveForm from '../ClientApproveForm'
import { ClientApproveForm as ClientApproveFormType } from '../../types'
import { GetClientApproveDocument } from '../../data/get-client-approve'

export type Props = {
  hideModal: () => void
  onSuccess?: () => void
  clientId: string
}

const ClientApproveModalContent = ({
  clientId,
  hideModal,
  onSuccess
}: Props) => {
  const { data, loading } = useQuery(GetClientApproveDocument, {
    variables: { clientId }
  })

  if (!data?.staffNode || loading) {
    return <ModalSuspender />
  }

  const { businessModels, contact, industry } = data?.staffNode || {}

  const initialValues: ClientApproveFormType = {
    businessModels:
      businessModels?.map(item => ({
        value: item,
        text: item
      })) || [],
    skype: contact?.skype,
    industry: industry || ''
  }

  return (
    <ClientApproveForm
      data={data}
      staffNode={data.staffNode}
      hideModal={hideModal}
      onSuccess={onSuccess}
      initialValues={initialValues}
    />
  )
}

export default ClientApproveModalContent
