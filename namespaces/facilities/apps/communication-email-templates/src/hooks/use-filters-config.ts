import { useCallback } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import {
  FilterConfig,
  FiltersConfig,
  FilterConfigType
} from '@staff-portal/filters'
import {
  ApolloError,
  filterUnauthorizedErrors
} from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import { useGetEmailTemplateTargetRoles } from '../data'

const VISIBILITY_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Public', value: 'false' },
  { label: 'Private', value: 'true' }
]

const useFiltersConfig = () => {
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

  const { emailTemplateTargetRoles, loading: loadingEmailTemplateTargetRoles } =
    useGetEmailTemplateTargetRoles({
      onError: error =>
        showFilteredError(
          error,
          'An error occurred, unable to fetch searchable roles filter options.'
        )
    })

  const emailTemplateTargetRolesOptions = emailTemplateTargetRoles?.map(
    ({ title, value }) => ({
      id: value,
      label: titleize(title) ?? ''
    })
  )

  const rolesFilterConfig: FilterConfig = {
    type: FilterConfigType.TYPE_SELECTOR,
    name: 'target_roles',
    label: 'Roles',
    loading: loadingEmailTemplateTargetRoles,
    options: emailTemplateTargetRolesOptions || [],
    searchPlaceholder: 'Search Roles',
    placeholder: NOT_SELECTED_PLACEHOLDER
  }

  const source: FilterConfig = {
    type: FilterConfigType.RADIO,
    name: 'source',
    label: 'Visibility',
    options: VISIBILITY_OPTIONS
  }

  const filtersConfig: FiltersConfig = [rolesFilterConfig, source]

  return { filtersConfig }
}

export default useFiltersConfig
