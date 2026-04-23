import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DisableBetaDocument,
  DisableBetaMutation
} from './disable-beta.staff.gql.types'

export const DISABLE_BETA: typeof DisableBetaDocument = gql`
  mutation DisableBeta {
    disableBeta(input: {}) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDisableBeta = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: DisableBetaMutation) => void
}) => {
  const [disableBeta, { data, loading }] = useMutation(DISABLE_BETA, {
    onError,
    onCompleted
  })

  return {
    disableBeta,
    data,
    loading
  }
}
