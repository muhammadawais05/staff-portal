import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentSpecializationApplicationsDocument } from './get-talent-specialization-applications.staff.gql.types'
import TALENT_SPECIALIZATION_APPLICATION_FRAGMENT from '../talent-specialization-application-fragment'

// TODO: cancelableMeetings should know the context of the specialization application
export const GET_TALENT_SPECIALIZATION_APPLICATIONS: typeof GetTalentSpecializationApplicationsDocument = gql`
  query GetTalentSpecializationApplications($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        fullName
        eligibleForRestoration
        specializationApplications {
          nodes {
            ...TalentSpecializationApplicationFragment
          }
        }
        operations {
          sendTalentToSpecialization {
            callable
            messages
          }
          addTalentToRemoteConsulting {
            callable
            messages
          }
        }
      }
    }
  }

  ${TALENT_SPECIALIZATION_APPLICATION_FRAGMENT}
`

export const useGetTalentSpecializationApplications = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, refetch } = useQuery(
    GET_TALENT_SPECIALIZATION_APPLICATIONS,
    {
      variables: {
        talentId
      },
      onError,
      fetchPolicy: 'cache-first'
    }
  )

  return {
    data: data?.node,
    loading,
    refetch
  }
}
