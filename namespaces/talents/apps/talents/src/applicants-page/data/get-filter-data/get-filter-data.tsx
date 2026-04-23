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
import { useGetTalentsListFilterOptions } from '@staff-portal/talents-list'

import { useGetTopscreenClients } from '../get-topscreen-clients'

const useGetFilterData = () => {
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

  const { topscreenClients, loading: loadingTopscreenClients } =
    useGetTopscreenClients({
      onError: error =>
        showFilteredError(
          error,
          'An error occurred, unable to fetch TopScreen clients.'
        )
    })

  return {
    accessTalentInternals:
      talentsListFilterOptions?.viewer.permits.accessTalentInternals,
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
    topscreenClients,
    loadingTopscreenClients
  }
}

export default useGetFilterData
