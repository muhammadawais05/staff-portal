import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetStaffUserDocument } from './get-staff-user.staff.gql.types'

export const GET_STAFF_USER: typeof GetStaffUserDocument = gql`
  query GetStaffUser($staffId: ID!) {
    node(id: $staffId) {
      ... on Staff {
        id
        fullName
      }
    }
  }
`

export const useGetStaffUser = ({
  staffId,
  skip
}: {
  staffId: string
  skip?: boolean
}) => {
  const { data, ...restOptions } = useQuery(GET_STAFF_USER, {
    variables: { staffId },
    fetchPolicy: 'cache-first',
    skip
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
