import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { TransferRequestSectionLayout, TransferRequestList } from './components'
import { useGetTransferRequest } from './data'
import { sortByRelationship } from './utils'

type Props = {
  companyId: string
}

const TransferRequestSection = ({ companyId }: Props) => {
  const { transferRequests, loading, initialLoading, refetch } =
    useGetTransferRequest(companyId)

  useMessageListener(
    CLIENT_UPDATED,
    ({ companyId: id }) => companyId === id && refetch()
  )

  if (loading || initialLoading) {
    return (
      <TransferRequestSectionLayout
        loading={loading}
        initialLoading={initialLoading}
      />
    )
  }

  return (
    <>
      {[...transferRequests].sort(sortByRelationship).map(transferRequest => {
        const { relationship } = transferRequest

        if (!relationship) {
          return null
        }

        return (
          <TransferRequestSectionLayout
            key={relationship}
            transferRequest={transferRequest}
            companyId={companyId}
          >
            <TransferRequestList transferRequest={transferRequest} />
          </TransferRequestSectionLayout>
        )
      })}
    </>
  )
}

export default TransferRequestSection
