import { gql, useMutation } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  MarkCompanyRepresentativeAsPrimaryDocument,
  MarkCompanyRepresentativeAsPrimaryMutation
} from './mark-as-primary-representative.staff.gql.types'

export default gql`
  mutation MarkCompanyRepresentativeAsPrimary(
    $input: MarkCompanyRepresentativeAsPrimaryInput!
  ) {
    markCompanyRepresentativeAsPrimary(input: $input) {
      companyRepresentative {
        id

        client {
          id
          representatives {
            nodes {
              id
              main

              operations {
                markCompanyRepresentativeAsPrimary {
                  ...OperationFragment
                }
              }
            }
          }
        }
      }

      ...MutationResultFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useMarkCompanyRepresentativeAsPrimary = ({
  companyRepresentativeId,
  onError,
  onCompleted
}: {
  companyRepresentativeId: string
  onError: () => void
  onCompleted: (data: MarkCompanyRepresentativeAsPrimaryMutation) => void
}) =>
  useMutation(MarkCompanyRepresentativeAsPrimaryDocument, {
    variables: {
      input: {
        companyRepresentativeId
      }
    },
    onError,
    onCompleted
  })
