import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import ImportTopForm from '../ImportTopForm'
import { GetImportTopDataDocument } from '../../data/get-import-top-data/get-import-top-data.staff.gql.types'

export type Props = {
  engagementId: string
  hideModal: () => void
}

const ImportTopModal = ({ engagementId, hideModal }: Props) => {
  const { data, loading } = useQuery(GetImportTopDataDocument, {
    variables: { engagementId }
  })

  if (!data?.node || loading) {
    return <ModalSuspender />
  }

  return (
    <ImportTopForm
      engagementId={engagementId}
      hideModal={hideModal}
      nextTopNumber={data.node.nextTopNumber}
    />
  )
}

export default ImportTopModal
