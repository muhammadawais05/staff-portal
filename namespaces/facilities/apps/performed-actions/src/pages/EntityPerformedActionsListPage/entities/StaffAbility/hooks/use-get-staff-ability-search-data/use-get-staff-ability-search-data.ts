import { useMemo } from 'react'
import { encodeGid } from '@staff-portal/data-layer-service'

import {
  PerformedActionEntityUseGetSearchData,
  PerformedActionEntityUseGetSearchDataParameters
} from '../../../../types'

const useGetStaffAbilitySearchData = ({
  decodedEntityId
}: PerformedActionEntityUseGetSearchDataParameters): PerformedActionEntityUseGetSearchData | null =>
  useMemo(() => {
    const entityGid = encodeGid('Ability', decodedEntityId)
    const searchVariables = { feeds: [[entityGid]] }

    return {
      entityGid,
      searchVariables
    }
  }, [decodedEntityId])

export default useGetStaffAbilitySearchData
