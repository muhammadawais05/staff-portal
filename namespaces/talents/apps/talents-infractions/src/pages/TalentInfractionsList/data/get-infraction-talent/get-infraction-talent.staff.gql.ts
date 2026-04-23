import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetInfractionTalentDocument } from './get-infraction-talent.staff.gql.types'

export const GET_INFRACTION_TALENT: typeof GetInfractionTalentDocument = gql`
  query GetInfractionTalent($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...InfractionTalentFragment
      }
    }
  }

  fragment InfractionTalentFragment on Talent {
    id
    fullName
  }
`
export const useGetInfractionTalent = ({
  talentId,
  skip
}: {
  talentId: string
  skip?: boolean
}) => {
  const { data, error, ...restOptions } = useQuery(GET_INFRACTION_TALENT, {
    variables: { talentId },
    fetchPolicy: 'cache-first',
    skip
  })

  if (error && !data) {
    throw error
  }

  return {
    data: data?.node,
    error,
    ...restOptions
  }
}
