import { ApolloError, gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentTypesDocument } from './get-talent-types.staff.gql.types'

export default gql`
  query GetTalentTypes {
    verticals {
      nodes {
        id
        talentType
        specializations {
          nodes {
            id
            title
          }
        }
      }
    }
  }
`

interface Props {
  onError?: (error: ApolloError) => void
}

export const useGetTalentTypes = ({ onError }: Props = {}) => {
  const { data, ...restOptions } = useQuery(GetTalentTypesDocument, {
    fetchPolicy: 'cache-first',
    onError
  })

  return {
    ...restOptions,
    talentTypesWithSpecializations: data?.verticals.nodes
  }
}
