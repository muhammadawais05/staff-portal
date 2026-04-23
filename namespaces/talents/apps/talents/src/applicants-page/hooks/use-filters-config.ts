import { useMemo } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { FiltersConfig } from '@staff-portal/filters'
import {
  buildClaimerOptions,
  buildCountryOptions,
  buildFlagOptions,
  buildSourcerOptions,
  buildTalentTypesOptions,
  prepareFilters
} from '@staff-portal/talents-list'

import { TopscreenClientFragment } from '../data/get-topscreen-clients'
import * as filterFieldConfig from '../utils/field-config'
import { buildTopscreenClientOptions } from '../utils/build-topscreen-client-options'
import useGetFilterData from '../data/get-filter-data/get-filter-data'

const useFiltersConfig = () => {
  const {
    accessTalentInternals,
    claimers,
    loadingClaimers,
    countries,
    loadingCountries,
    sourcers,
    loadingSourcers,
    flags,
    loadingFlags,
    talentTypes,
    loadingTalentTypes,
    topscreenClients,
    loadingTopscreenClients
  } = useGetFilterData()

  const currentUser = useGetCurrentUser()

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const claimerOptions = buildClaimerOptions(claimers, currentUser?.id)
    const countryOptions = buildCountryOptions(countries)
    const sourcerOptions = buildSourcerOptions(sourcers)
    const flagOptions = buildFlagOptions(flags)
    const talentTypesOptions = buildTalentTypesOptions(talentTypes)
    const topscreenClientOptions = buildTopscreenClientOptions(
      topscreenClients as TopscreenClientFragment[]
    )

    const filtersList: FiltersConfig = [
      filterFieldConfig.appliedOn,
      filterFieldConfig.claimerIdField({
        claimerOptions,
        loadingClaimers
      }),
      filterFieldConfig.country({
        countryOptions,
        loadingCountries
      }),
      [filterFieldConfig.city, filterFieldConfig.distance],
      filterFieldConfig.timezone,
      filterFieldConfig.sourcedBy({
        sourcerOptions,
        loadingSourcers
      }),
      filterFieldConfig.notSourcedBy({
        sourcerOptions,
        loadingSourcers
      }),
      filterFieldConfig.source,
      filterFieldConfig.referred,
      filterFieldConfig.applicationForm,
      filterFieldConfig.admissionPost,
      filterFieldConfig.supplyHealthPriority,
      filterFieldConfig.sourcingRequest,
      filterFieldConfig.ofacStatus({ hidden: !accessTalentInternals }),
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
      filterFieldConfig.screening,
      filterFieldConfig.activation,
      filterFieldConfig.meetingStatus,
      filterFieldConfig.talentTypes({
        talentTypesOptions,
        loadingTalentTypes
      }),
      filterFieldConfig.topscreenClients({
        topscreenClientOptions,
        loadingTopscreenClients
      })
    ]

    return prepareFilters(filtersList)
  }, [
    claimers,
    currentUser?.id,
    countries,
    sourcers,
    flags,
    talentTypes,
    topscreenClients,
    loadingClaimers,
    loadingCountries,
    loadingSourcers,
    accessTalentInternals,
    loadingFlags,
    loadingTalentTypes,
    loadingTopscreenClients
  ])

  return { filtersConfig }
}

export default useFiltersConfig
