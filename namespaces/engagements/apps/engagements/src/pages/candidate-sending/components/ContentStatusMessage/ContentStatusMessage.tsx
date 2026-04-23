import React from 'react'
import { Alert, Container } from '@toptal/picasso'
import { useQuery } from '@staff-portal/data-layer-service'

import { getDisplayStatusMessage } from '../../utils'
import { useCandidateSendingContext } from '../../hooks'
import { GetContentStatusMessageDataDocument } from '../../data/get-content-status-message-data'

const ContentStatusMessage = () => {
  const { clientId } = useCandidateSendingContext()

  const { data: tempData, loading } = useQuery(
    GetContentStatusMessageDataDocument,
    {
      variables: { clientId: clientId as string },
      skip: !clientId,
      fetchPolicy: 'cache-first'
    }
  )
  const data = clientId && !loading ? tempData : null
  const { minimumClientCreditRequired, node } = data || {}
  const { hasUnpaidDepositInvoices, availablePrepaymentBalanceNullable } =
    node || {}
  const displayStatusMessage = getDisplayStatusMessage({
    hasUnpaidDepositInvoices,
    availablePrepaymentBalanceNullable,
    minimumClientCreditRequired
  })

  if (!displayStatusMessage || loading) {
    return null
  }

  return (
    <Container bottom='medium'>
      <Alert>Company has an unpaid deposit.</Alert>
    </Container>
  )
}

export default ContentStatusMessage
