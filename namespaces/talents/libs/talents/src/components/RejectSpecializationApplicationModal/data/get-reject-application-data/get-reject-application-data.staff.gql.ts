import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetRejectApplicationDataDocument } from './get-reject-application-data.staff.gql.types'

export const GET_REJECT_APPLICATION_DATA: typeof GetRejectApplicationDataDocument = gql`
  query GetRejectApplicationData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        status
        fullName
        specializationApplications(filter: { statuses: [PENDING] }) {
          nodes {
            ...SpecializationApplicationToRejectFragment
          }
        }
        cancelableMeetings {
          nodes {
            id
            subject
          }
        }
      }
    }
  }

  fragment SpecializationApplicationToRejectFragment on SpecializationApplication {
    id
    specialization {
      id
      title
    }
    rejectNoteTasks(filter: { statuses: PENDING }) {
      totalCount
    }
  }
`

export const useGetRejectApplicationData = (talentId: string) =>
  useQuery(GET_REJECT_APPLICATION_DATA, {
    variables: { talentId }
  })
