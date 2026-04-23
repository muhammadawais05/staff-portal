import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import {
  GetTalentRejectForInactivityDocument,
  GetTalentRejectForInactivityQuery
} from './get-talent-reject-for-inactivity.staff.gql.types'
import { TALENT_REJECT_FOR_INACTIVITY_FRAGMENT } from '../talent-reject-for-inactivity-fragment/talent-reject-for-inactivity-fragment.staff.gql'

export const GET_TALENT_REJECT_FOR_INACTIVITY: typeof GetTalentRejectForInactivityDocument = gql`
  query GetTalentRejectForInactivity($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TalentRejectForInactivityFragment
      }
    }
  }

  ${TALENT_REJECT_FOR_INACTIVITY_FRAGMENT}
`

export const useGetTalentRejectForInactivity = ({
  talentId,
  batchKey,
  onCompleted,
  onError
}: {
  talentId: string
  batchKey?: string
  onCompleted?: (data: GetTalentRejectForInactivityQuery) => void
  onError?: (error: Error) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_REJECT_FOR_INACTIVITY, {
    variables: { talentId },
    onCompleted,
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, data: data?.node }
}
