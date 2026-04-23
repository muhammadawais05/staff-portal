import { useMemo } from 'react'
import { encodeGid, useGetNode } from '@staff-portal/data-layer-service'

import { GetPerformedActionOpportunitySearchDataDocument } from '../../data/get-performed-action-opportunity-search-data'
import {
  PerformedActionEntityUseGetSearchData,
  PerformedActionEntityUseGetSearchDataParameters
} from '../../../../types'

const useGetOpportunitySearchData = ({
  entityId,
  decodedEntityId
}: PerformedActionEntityUseGetSearchDataParameters): PerformedActionEntityUseGetSearchData | null => {
  const { data } = useGetNode(GetPerformedActionOpportunitySearchDataDocument)({
    entityId
  })

  const opportunityType = data?.type

  return useMemo(() => {
    if (!opportunityType) {
      return null
    }

    const entityGid = encodeGid(opportunityType, decodedEntityId)
    const searchVariables = {
      feeds: [[entityGid]]
    }

    return {
      entityGid,
      searchVariables
    }
  }, [opportunityType, decodedEntityId])
}

export default useGetOpportunitySearchData
