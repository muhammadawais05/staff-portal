import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetVerticalOperationsDocument } from './get-vertical-operations.staff.gql.types'

export default gql`
  query GetVerticalOperations {
    verticals {
      nodes {
        id
        name
        operations {
          createCommonTalent {
            ...OperationWithFieldsFragment
          }
          createTopscreenTalent {
            ...OperationWithFieldsFragment
          }
        }
      }
    }
  }

  fragment OperationWithFieldsFragment on OperationWithFields {
    callable
    messages
    writableFields
  }
`

export const useGetVerticalOperations = () => {
  const { data, loading } = useQuery(GetVerticalOperationsDocument)

  return {
    verticals: data?.verticals?.nodes,
    loading
  }
}
