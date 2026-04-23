import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetStaffBetaStatusDocument } from './get-staff-beta-status.staff.gql.types'

export const GET_STAFF_BETA_STATUS: typeof GetStaffBetaStatusDocument = gql`
  query GetStaffBetaStatus($staffIds: [ID!]!) {
    nodes(ids: $staffIds) {
      ... on Staff {
        id
        lastVisitedDate
        staffPortalBetaEnabled
        staffPortalEarlyAdopter
      }
    }
  }
`

export const useGetStaffBetaStatus = ({
  onError,
  staffIds
}: {
  onError: () => void
  staffIds: string[]
}) =>
  useLazyQuery(GET_STAFF_BETA_STATUS, {
    variables: { staffIds },
    onError
  })
