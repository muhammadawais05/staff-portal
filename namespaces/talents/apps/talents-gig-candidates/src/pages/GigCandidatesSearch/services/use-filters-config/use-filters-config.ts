import { useMemo } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { FiltersConfig } from '@staff-portal/filters'
import {
  filterFieldConfig,
  buildFlagOptions,
  buildTalentTypesOptions,
  prepareFilters
} from '@staff-portal/talents-list'

import useGetFilterData from '../../data/get-filter-data/get-filter-data'

const useFiltersConfig = () => {
  const {
    accessTalentInternals,
    loadingTalentTypes,
    talentTypes,
    loadingFlags,
    flags
  } = useGetFilterData()

  const currentUser = useGetCurrentUser()

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const flagOptions = buildFlagOptions(flags)

    const filtersList: FiltersConfig = [
      filterFieldConfig.timezone,
      filterFieldConfig.cumulativeStatuses,
      filterFieldConfig.ofacStatus({ hidden: !accessTalentInternals }),
      filterFieldConfig.suspendedByTalentAgreement({
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.healthStatus({
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.excludeHealthStatus({
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.flagIds({
        flagOptions,
        loadingFlags,
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.excludedFlagIds({
        flagOptions,
        loadingFlags,
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.managementExperience,
      filterFieldConfig.enterpriseExperience,
      filterFieldConfig.workingStatus,
      filterFieldConfig.availableHours,
      filterFieldConfig.hadEngagements,
      filterFieldConfig.inInvestigation,
      filterFieldConfig.roles({
        talentTypesOptions: buildTalentTypesOptions(talentTypes),
        loadingTalentTypes
      }),
      filterFieldConfig.hideLockedTalent
    ]

    return prepareFilters(filtersList)
  }, [
    currentUser?.id,
    flags,
    talentTypes,
    loadingFlags,
    loadingTalentTypes,
    accessTalentInternals
  ])

  return { filtersConfig }
}

export default useFiltersConfig
