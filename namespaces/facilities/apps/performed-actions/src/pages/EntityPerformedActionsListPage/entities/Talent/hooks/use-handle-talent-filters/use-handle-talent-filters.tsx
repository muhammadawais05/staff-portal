import { useCallback, useMemo } from 'react'
import {
  asQueryParam,
  QueryParamsOptions,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import { FiltersConfig } from '@staff-portal/filters'

import {
  TalentPerformedActionsFilters,
  TalentPerformedActionsQueryParams
} from '../../types'
import {
  CHANGE_TYPE_FILTER,
  CHANGE_TYPE_FILTER_TO_CHRONICLES_ACTION_MAPPING
} from '../../config'
import { TalentPerformedActionsChangeTypeFilter } from '../../enums'

const FILTERS_CONFIG: FiltersConfig = [CHANGE_TYPE_FILTER]

export const ChangeTypeFilterQueryParamOptions = asQueryParam({
  encode: (values: TalentPerformedActionsChangeTypeFilter[]): string[] =>
    values as string[],
  decode: (values: unknown): TalentPerformedActionsChangeTypeFilter[] => {
    if (!Array.isArray(values)) {
      return []
    }

    return values.filter(
      (value: TalentPerformedActionsChangeTypeFilter | undefined) =>
        value && CHANGE_TYPE_FILTER_TO_CHRONICLES_ACTION_MAPPING[value]
    )
  }
})

export const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  change_type: ChangeTypeFilterQueryParamOptions
}

const useHandleTalentFilters = () => {
  const [urlValues, setUrlValues] =
    useQueryParamsState<TalentPerformedActionsQueryParams>(QUERY_PARAMS_CONFIG)

  const { change_type } = urlValues

  const filterValues: TalentPerformedActionsFilters = useMemo(
    () => ({ changeType: change_type ?? [] }),
    [change_type]
  )

  const handleFilterChange = useCallback(
    (updatedFilters: TalentPerformedActionsFilters) => {
      setUrlValues({
        ...urlValues,
        change_type: updatedFilters.changeType
      })
    },
    [urlValues, setUrlValues]
  )

  return {
    filtersConfig: FILTERS_CONFIG,
    filterValues,
    handleFilterChange
  }
}

export default useHandleTalentFilters
