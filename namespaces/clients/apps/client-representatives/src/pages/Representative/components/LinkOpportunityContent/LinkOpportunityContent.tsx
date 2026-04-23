import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { useGetLinkRepresentativeOpportunities } from '../../data/get-link-representative-opportunities/get-link-representative-opportunities.staff.gql'

interface Props {
  representativeId: string
  hideModal: () => void
}

const LinkOpportunityForm = lazy(() => import('../LinkOpportunityForm'))

export const LinkOpportunityContent = ({
  representativeId,
  hideModal
}: Props) => {
  const { loading, opportunities } =
    useGetLinkRepresentativeOpportunities(representativeId)

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <LinkOpportunityForm
      hideModal={hideModal}
      representativeId={representativeId}
      opportunities={opportunities}
    />
  )
}
