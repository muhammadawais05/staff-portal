import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { GetOpportunityTeamDocument } from './data'
import { OPPORTUNITY_CONTRACT_DELETED } from '../../../messages'
import { OpportunityTypes } from '../../utils/constants'
import OpportunityTeamSection from './components/OpportunityTeamSection'

interface Props {
  opportunityId: string
}

const OpportunityTeamContainer = ({ opportunityId }: Props) => {
  const {
    data: opportunity,
    loading,
    initialLoading,
    refetch
  } = useGetNode(GetOpportunityTeamDocument)({ opportunityId })

  useMessageListener(OPPORTUNITY_CONTRACT_DELETED, () => refetch())

  if (opportunity?.type === OpportunityTypes.SMB) {
    return null
  }

  return (
    <OpportunityTeamSection
      loading={loading}
      initialLoading={initialLoading}
      opportunity={opportunity}
    />
  )
}

export default OpportunityTeamContainer
