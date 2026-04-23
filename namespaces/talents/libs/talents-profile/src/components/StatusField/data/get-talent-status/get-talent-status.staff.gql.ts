import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { SPECIALIZATION_APPLICATION_FRAGMENT } from '../../../StatusField/data/specialization-application-fragment/specialization-application-fragment.staff.gql'
import { GetTalentStatusDocument } from './get-talent-status.staff.gql.types'

// TODO: cancelableMeetings should know the context of the specialization application
export const GET_TALENT_STATUS: typeof GetTalentStatusDocument = gql`
  query GetTalentStatus($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentStatusFragment
      }
    }
  }

  fragment TalentStatusFragment on Talent {
    cumulativeStatus
    newcomer
    topShield
    specializationApplications {
      nodes {
        ...SpecializationApplicationFragment
      }
    }
  }

  ${SPECIALIZATION_APPLICATION_FRAGMENT}
`

export const useGetTalentStatus = (
  talentId: string,
  {
    batchKey,
    onError
  }: {
    batchKey?: string
    onError: () => void
  }
) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_STATUS, {
    variables: { talentId },
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, data: data?.node }
}
