import { useCallback } from 'react'
import { RoleScope, RoleType } from '@staff-portal/graphql/staff'
import {
  ApolloError,
  filterUnauthorizedErrors
} from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import {
  useGetClaimers,
  useGetCountries,
  useGetFlags
} from '@staff-portal/facilities'
import { useGetTalentTypes } from '@staff-portal/verticals'
import { useGetSourcers } from '@staff-portal/talents'

import { useGetTalentsListFilterOptions } from '../get-talents-list-filter-options'
import { useGetTalentsListJobFilterOptions } from '../get-talents-list-job-filter-options'

const useGetFilterData = (jobId?: string) => {
  const { showError } = useNotifications()
  const showFilteredError = useCallback(
    (error: ApolloError, message: string) => {
      const filteredError = filterUnauthorizedErrors(error)

      if (!filteredError) {
        return
      }

      showError(message)
    },
    [showError]
  )

  const { data: talentsListFilterOptions } = useGetTalentsListFilterOptions({
    onError: error =>
      showFilteredError(
        error,
        'An error occurred, unable to fetch talent list filter options.'
      )
  })
  const { data: talentsListJobFilterOptions } =
    useGetTalentsListJobFilterOptions({
      jobId,
      onError: error =>
        showFilteredError(
          error,
          'An error occurred, unable to fetch talent list filter options.'
        )
    })

  const isSmallBusiness =
    talentsListJobFilterOptions?.client &&
    !talentsListJobFilterOptions.client.enterprise

  const { claimers, loading: loadingClaimers } = useGetClaimers({
    scope: RoleScope.TALENT_CLAIMERS,
    onError: error =>
      showFilteredError(error, 'An error occurred, unable to fetch claimers.')
  })

  const { countries, loading: loadingCountries } = useGetCountries({
    onError: error =>
      showFilteredError(error, 'An error occurred, unable to fetch countries.')
  })
  const {
    talentTypesWithSpecializations: talentTypes,
    loading: loadingTalentTypes
  } = useGetTalentTypes({
    onError: error =>
      showFilteredError(
        error,
        'An error occurred, unable to fetch talent types.'
      )
  })

  const { flags, loading: loadingFlags } = useGetFlags({
    roleType: RoleType.TALENT,
    onError: error =>
      showFilteredError(error, 'An error occurred, unable to fetch flags.')
  })

  const { sourcers, loading: loadingSourcers } = useGetSourcers({
    scope: RoleScope.TALENT_SOURCERS,
    onError: error =>
      showFilteredError(error, 'An error occurred, unable to fetch sourcers.')
  })

  return {
    loadingClaimers,
    claimers,
    countries,
    loadingCountries,
    talentTypes,
    loadingTalentTypes,
    flags,
    loadingFlags,
    sourcers,
    loadingSourcers,
    accessTalentInternals:
      talentsListFilterOptions?.viewer.permits.accessTalentInternals,
    preferHoursOverlapping: talentsListJobFilterOptions?.preferHoursOverlapping,
    talentMaxHourlyRateLimit: isSmallBusiness
      ? talentsListJobFilterOptions?.talentMaxHourlyRateLimit
      : talentsListFilterOptions?.talentMaxHourlyRateLimit,
    isSmallBusiness
  }
}

export default useGetFilterData
