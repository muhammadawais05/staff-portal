import { useNavigate } from '@staff-portal/navigation'
import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { LoginAsDocument } from './login-as.staff.gql.types'

export default gql`
  mutation LoginAs($roleId: ID!) {
    loginAs(input: { roleId: $roleId }) {
      returnTo
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useLoginAs = ({
  roleId,
  onError,
  onRedirecting,
  onRedirectingComplete
}: {
  roleId: string
  onError?: () => void
  onRedirecting?: () => void
  onRedirectingComplete?: () => void
}) => {
  const navigate = useNavigate()
  const [loginAs, { client }] = useMutation(LoginAsDocument, {
    variables: { roleId },
    onError
  })

  return {
    loginAs: async () => {
      onRedirecting?.()

      const { data } = await loginAs()

      if (!data?.loginAs?.success) {
        return onError?.()
      }

      try {
        // we need to clear entire apollo cache
        await client.resetStore()
        // eslint-disable-next-line no-empty
      } catch {}

      if (data?.loginAs?.returnTo) {
        navigate(data.loginAs.returnTo)
      }

      onRedirectingComplete?.()
    }
  }
}
