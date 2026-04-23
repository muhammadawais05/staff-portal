import React, { useMemo } from 'react'
import { SearchChroniclesVariables } from '@staff-portal/chronicles'
import { encodeGid, decodeEntityId } from '@staff-portal/data-layer-service'

import useHandleStaffAbilityFilters from '../use-handle-staff-ability-filters'
import { PerformedActionsFilters } from '../../../../../../components'
import { PerformedActionEntityUseGetFiltersData } from '../../../../types'

const useGetStaffAbilityFilters =
  (): PerformedActionEntityUseGetFiltersData => {
    const { filtersConfig, filterValues, handleFilterChange } =
      useHandleStaffAbilityFilters()
    const { ability_id, changed_by, staffId } = filterValues

    const component = (
      <PerformedActionsFilters
        filtersConfig={filtersConfig}
        filterValues={{ ability_id, changed_by }}
        handleFilterChange={handleFilterChange}
      />
    )

    const searchVariables: Pick<
      SearchChroniclesVariables,
      'payload' | 'performerGids'
    > = useMemo(() => {
      const payload: SearchChroniclesVariables['payload'] = ability_id
        ? {
            path: ['affected_abilities'],
            operation: 'CONTAINS',
            value: `{"gid": "${encodeGid(
              'Ability',
              decodeEntityId(ability_id).id
            )}"}`
          }
        : undefined

      const performerGids = staffId
        ? [encodeGid('Staff', decodeEntityId(staffId).id)]
        : undefined

      return {
        payload,
        performerGids
      }
    }, [ability_id, staffId])

    return {
      component,
      searchVariables
    }
  }

export default useGetStaffAbilityFilters
