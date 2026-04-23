import { useCallback } from 'react'
import { RoleType } from '@staff-portal/graphql/staff'
import {
  ApolloError,
  filterUnauthorizedErrors
} from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetFlags } from '@staff-portal/facilities'
import { useGetTalentTypes } from '@staff-portal/verticals'
import { useGetTalentsListFilterOptions } from '@staff-portal/talents-list'

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
        'An error occurred, unable to fetch candidate list filter options.'
      )
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

  return {
    talentTypes,
    loadingTalentTypes,
    flags,
    loadingFlags,
    accessTalentInternals:
      talentsListFilterOptions?.viewer.permits.accessTalentInternals
  }
}

export default useGetFilterData
