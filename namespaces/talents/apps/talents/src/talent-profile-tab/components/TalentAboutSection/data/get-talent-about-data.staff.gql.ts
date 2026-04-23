import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentAboutDataDocument } from './get-talent-about-data.staff.gql.types'

export const GET_TALENT_ABOUT_DATA: typeof GetTalentAboutDataDocument = gql`
  query GetTalentAboutData($talentId: ID!) {
    node(id: $talentId) {
      ...TalentAboutDataFragment
    }
  }

  fragment TalentAboutDataFragment on Talent {
    id
    profile {
      id
      about
    }
  }
`

export const useGetTalentAboutData = ({
  talentId,
  onError
}: {
  onError: () => void
  talentId: string
}) => {
  const { data, loading, error, refetch } = useQuery(GET_TALENT_ABOUT_DATA, {
    variables: {
      talentId
    },
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    about: data?.node?.profile?.about,
    loading,
    error,
    refetch
  }
}
