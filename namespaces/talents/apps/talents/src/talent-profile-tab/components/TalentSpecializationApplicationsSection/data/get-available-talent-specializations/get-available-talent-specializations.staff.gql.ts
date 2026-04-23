import { TalentAvailableSpecialization } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetAvailableTalentSpecializationsDocument } from './get-available-talent-specializations.staff.gql.types'

export default gql`
  query GetAvailableTalentSpecializations(
    $talentId: ID!
    $availableSpecializationType: TalentAvailableSpecialization
  ) {
    node(id: $talentId) {
      ... on Talent {
        id
        availableSpecializations(
          filter: { type: $availableSpecializationType }
        ) {
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
  talentId: string
  availableSpecializationType?: TalentAvailableSpecialization
  onError?: () => void
}

export const useGetAvailableTalentSpecializations = ({
  talentId,
  availableSpecializationType,
  onError
}: Props) => {
  const { data, ...otherProps } = useQuery(
    GetAvailableTalentSpecializationsDocument,
    {
      variables: {
        talentId,
        availableSpecializationType
      },
      onError
    }
  )

  return {
    ...otherProps,
    availableSpecializations: data?.node?.availableSpecializations?.nodes ?? []
  }
}
