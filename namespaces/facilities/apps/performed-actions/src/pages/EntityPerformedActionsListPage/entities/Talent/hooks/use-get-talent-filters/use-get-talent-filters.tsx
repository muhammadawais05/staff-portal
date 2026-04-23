import React, { useMemo } from 'react'
import { SearchChroniclesVariables } from '@staff-portal/chronicles'

import useHandleTalentFilters from '../use-handle-talent-filters'
import { PerformedActionsFilters } from '../../../../../../components'
import { PerformedActionEntityUseGetFiltersData } from '../../../../types'
import { CHANGE_TYPE_FILTER_TO_CHRONICLES_ACTION_MAPPING } from '../../config'

const useGetTalentFilters = (): PerformedActionEntityUseGetFiltersData => {
  const { filtersConfig, filterValues, handleFilterChange } =
    useHandleTalentFilters()

  const component = (
    <PerformedActionsFilters
      filtersConfig={filtersConfig}
      filterValues={filterValues}
      handleFilterChange={handleFilterChange}
    />
  )

  const searchVariables: Pick<SearchChroniclesVariables, 'feeds'> =
    useMemo(() => {
      const filteredChangeTypes = filterValues.changeType
        .map(
          changeType =>
            CHANGE_TYPE_FILTER_TO_CHRONICLES_ACTION_MAPPING[changeType]
        )
        .filter(Boolean)

      return {
        feeds: filteredChangeTypes?.length ? [filteredChangeTypes] : []
      }
    }, [filterValues])

  return {
    component,
    searchVariables
  }
}

export default useGetTalentFilters
