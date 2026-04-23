import { lazy } from '@staff-portal/utils'
import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import { useGetUnlinkOpportunityOperation } from '../../data/get-unlink-opportunity-operation'

interface Props {
  opportunityId: string
  representativeId: string
  hideModal: () => void
}

const UnlinkOpportunityForm = lazy(() => import('../UnlinkOpportunityForm'))

export const UnlinkOpportunityContent = ({
  opportunityId,
  representativeId,
  hideModal
}: Props) => {
  const { loading, enabled } = useGetUnlinkOpportunityOperation(
    representativeId,
    opportunityId
  )

  if (!loading && !enabled) {
    return null
  }

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <UnlinkOpportunityForm
      opportunityId={opportunityId}
      hideModal={hideModal}
      representativeId={representativeId}
    />
  )
}
