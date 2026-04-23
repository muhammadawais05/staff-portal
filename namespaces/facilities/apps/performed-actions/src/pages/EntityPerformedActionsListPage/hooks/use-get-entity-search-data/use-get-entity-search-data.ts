import { useMemo } from 'react'
import { encodeGid } from '@staff-portal/data-layer-service'

import {
  PerformedActionEntityUseGetSearchData,
  PerformedActionEntityUseGetSearchDataParameters
} from '../../types'

const useGetEntitySearchData = ({
  entityType,
  decodedEntityId
}: PerformedActionEntityUseGetSearchDataParameters): PerformedActionEntityUseGetSearchData => {
  return useMemo(() => {
    const entityGid = encodeGid(entityType, decodedEntityId)
    const searchVariables = {
      feeds: [[entityGid]]
    }

    return {
      entityGid,
      searchVariables
    }
  }, [entityType, decodedEntityId])
}

export default useGetEntitySearchData
