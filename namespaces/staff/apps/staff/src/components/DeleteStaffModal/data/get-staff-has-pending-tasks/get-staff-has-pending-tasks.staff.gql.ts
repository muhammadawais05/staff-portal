import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetStaffHasPendingTasksDocument } from './get-staff-has-pending-tasks.staff.gql.types'

export default gql`
  query GetStaffHasPendingTasks($staffId: ID!) {
    node(id: $staffId) {
      ... on Staff {
        id
        hasPendingTasks
      }
    }
  }
`

export const useGetStaffHasPendingTasks = (staffId: string) =>
  useQuery(GetStaffHasPendingTasksDocument, {
    variables: {
      staffId
    }
  })
