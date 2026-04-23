import { useNavigate } from '@staff-portal/navigation'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { LogoutDocument } from './logout.staff.gql.types'

export const LOGOUT: typeof LogoutDocument = gql`
  mutation Logout {
    logout(input: {}) {
      returnTo
      success
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useLogout = ({
  onError,
  onRedirecting,
  onRedirectingComplete
}: {
  onError?: () => void
  onRedirecting?: () => void
  onRedirectingComplete?: () => void
}) => {
  const navigate = useNavigate()
  const [logout, { client }] = useMutation(LOGOUT, {
    onError
  })

  return {
    logout: async () => {
      onRedirecting?.()

      const { data } = await logout()

      if (!data?.logout?.success) {
        return onError?.()
      }

      try {
        // we need to clear entire apollo cache
        await client.resetStore()
        // eslint-disable-next-line no-empty
      } catch {}

      if (data?.logout?.returnTo) {
        navigate(data.logout.returnTo)
      }

      onRedirectingComplete?.()
    }
  }
}
