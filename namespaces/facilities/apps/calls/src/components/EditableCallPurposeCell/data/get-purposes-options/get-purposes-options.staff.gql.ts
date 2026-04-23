import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { PURPOSES_LIST_ITEM_FRAGMENT } from './purposes-list-item-fragment.staff.gql'
import { GetPurposesOptionsQueryVariables } from './get-purposes-options.staff.gql.types'
import { GetPurposesOptionsDocument } from '../get-purposes-options/get-purposes-options.staff.gql.types'

export default gql`
  query GetPurposesOptions($counterpartyType: CallCounterpartyType) {
    viewer {
      callPurposes(counterpartyType: $counterpartyType) {
        nodes {
          ...PurposesListItemFragment
        }
      }
    }
  }
  ${PURPOSES_LIST_ITEM_FRAGMENT}
`

export const getCallPurposesOptionsHook =
  (variables: GetPurposesOptionsQueryVariables) => () => {
    const [request, { data, error, ...restOptions }] = useLazyQuery(
      GetPurposesOptionsDocument,
      {
        variables
      }
    )

    return {
      request,
      throwOnError: true,
      data: data?.viewer.callPurposes.nodes,
      error,
      ...restOptions
    }
  }
