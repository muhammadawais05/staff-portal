import { useCallback, useMemo } from 'react'
import {
  QueryParamsOptions,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import { useQuery } from '@staff-portal/data-layer-service'
import { gqlIdQueryParam } from '@staff-portal/filters'

import {
  GetStaffAbilitiesDocument,
  GetSearchableRolesDocument
} from '../../data'
import {
  StaffAbilityPerformedActionsFilters,
  StaffAbilityPerformedActionsQueryParams
} from '../../types'
import useFiltersConfig from '../use-filters-config'

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  ability_id: gqlIdQueryParam('StaffAbility')
}

const useHandleStaffAbilityFilters = () => {
  const [urlValues, setUrlValues] =
    useQueryParamsState<StaffAbilityPerformedActionsQueryParams>(
      QUERY_PARAMS_CONFIG
    )
  const { data: searchableRolesData, loading: loadingSearchableRoles } =
    useQuery(GetSearchableRolesDocument)
  const { data: staffAbilitiesData, loading: loadingStaffAbilities } = useQuery(
    GetStaffAbilitiesDocument
  )

  const { ability_id, changed_by } = urlValues

  const filtersConfig = useFiltersConfig({
    staffAbilitiesNodes: staffAbilitiesData?.staffAbilities?.nodes,
    searchableRolesNodes: searchableRolesData?.searchableRoles.edges,
    loadingStaffAbilities,
    loadingSearchableRoles
  })

  const filterValues: StaffAbilityPerformedActionsFilters & {
    staffId?: string
  } = useMemo(
    () => ({
      ability_id: ability_id ?? '',
      changed_by: changed_by ?? '',
      staffId: (searchableRolesData?.searchableRoles.edges || []).find(
        item => item.legacyUserId === changed_by
      )?.roleId
    }),
    [changed_by, ability_id, searchableRolesData]
  )

  const handleFilterChange = useCallback(
    (updatedFilters: StaffAbilityPerformedActionsFilters) =>
      setUrlValues(updatedFilters),
    [setUrlValues]
  )

  return {
    filtersConfig,
    filterValues,
    handleFilterChange
  }
}

export default useHandleStaffAbilityFilters
