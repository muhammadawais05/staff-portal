import { useMemo } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { FiltersConfig } from '@staff-portal/filters'

import { filterFieldConfig } from '../../services'
import {
  buildClaimerOptions,
  buildCountryOptions,
  buildFlagOptions,
  buildSourcerOptions,
  buildTalentTypesOptions,
  prepareFilters
} from '../filters-utils/filters-utils'
import useGetFilterData from '../../data/get-filter-data/get-filter-data'

export const useFiltersConfig = (jobId?: string) => {
  const isJobContext = !!jobId
  const {
    accessTalentInternals,
    claimers,
    loadingClaimers,
    countries,
    loadingCountries,
    loadingTalentTypes,
    talentTypes,
    loadingFlags,
    flags,
    loadingSourcers,
    sourcers,
    talentMaxHourlyRateLimit,
    isSmallBusiness,
    preferHoursOverlapping
  } = useGetFilterData(jobId)

  const currentUser = useGetCurrentUser()

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const sourcerOptions = buildSourcerOptions(sourcers)
    const flagOptions = buildFlagOptions(flags)

    const filtersList: FiltersConfig = [
      filterFieldConfig.jobIDField,
      filterFieldConfig.claimerIdField({
        claimerOptions: buildClaimerOptions(claimers, currentUser?.id),
        loadingClaimers
      }),
      filterFieldConfig.appliedOn,
      filterFieldConfig.availabilityConfirmed,
      filterFieldConfig.reapplicationDate,
      filterFieldConfig.sourcedBy({
        sourcerOptions,
        loadingSourcers
      }),
      filterFieldConfig.notSourcedBy({
        sourcerOptions,
        loadingSourcers
      }),
      filterFieldConfig.allowedCountries({
        countryOptions: buildCountryOptions(countries),
        loadingCountries
      }),
      [filterFieldConfig.location, filterFieldConfig.distance],
      filterFieldConfig.timezone,
      filterFieldConfig.hourlyRate({
        isSmallBusiness,
        talentMaxHourlyRateLimit,
        hidden: !accessTalentInternals
      }),
      filterFieldConfig.source,
      filterFieldConfig.referred,
      filterFieldConfig.cumulativeStatuses,
      filterFieldConfig.meetingStatus,
      filterFieldConfig.customRequirements,
      filterFieldConfig.hasAdmissionPost,
      filterFieldConfig.supplyHealthPriority,
      filterFieldConfig.reservedStatus,
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
      filterFieldConfig.communityLeaderStatuses,
      filterFieldConfig.communityLeaderType,
      filterFieldConfig.availableHours,
      filterFieldConfig.hadEngagements,
      filterFieldConfig.inInvestigation,
      filterFieldConfig.overlappingHours({ hidden: !preferHoursOverlapping }),
      filterFieldConfig.jobInterest({ hidden: !isJobContext }),
      filterFieldConfig.roles({
        talentTypesOptions: buildTalentTypesOptions(talentTypes),
        loadingTalentTypes
      }),
      filterFieldConfig.hideTalentsWith({ hidden: !isJobContext }),
      filterFieldConfig.hideLockedTalent,
      filterFieldConfig.talentJobPreferencesOverlapStatuses({
        hidden: !isJobContext
      })
    ]

    return prepareFilters(filtersList)
  }, [
    currentUser?.id,
    claimers,
    countries,
    flags,
    sourcers,
    talentTypes,
    loadingClaimers,
    loadingFlags,
    loadingCountries,
    loadingSourcers,
    loadingTalentTypes,
    accessTalentInternals,
    isJobContext,
    talentMaxHourlyRateLimit,
    isSmallBusiness,
    preferHoursOverlapping
  ])

  return { filtersConfig }
}
