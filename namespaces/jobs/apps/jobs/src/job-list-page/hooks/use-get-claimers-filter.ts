import { useMemo } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { RoleScope } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  useGetClaimers,
  getClaimerOptions,
  ClaimerOption
} from '@staff-portal/facilities'

const useGetClaimersFilter = (roleScope: RoleScope) => {
  const { showError } = useNotifications()

  const currentUser = useGetCurrentUser()

  const { claimers, loading } = useGetClaimers({
    scope: roleScope,
    onError: () => showError('An error occurred, unable to fetch claimers.')
  })

  const options: ClaimerOption[] = useMemo(
    () => (claimers ? getClaimerOptions(claimers, currentUser?.id) : []),
    [claimers, currentUser]
  )

  return { options, loading } as const
}

export default useGetClaimersFilter
