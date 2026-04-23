import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetInfractionsStaffUserDocument } from './get-infraction-staff-user.staff.gql.types'
import { INFRACTION_STAFF_FRAGMENT } from '../infraction-staff-fragment'

export const GET_INFRACTION_STAFF_USER: typeof GetInfractionsStaffUserDocument = gql`
  query GetInfractionsStaffUser($staffId: ID!) {
    node(id: $staffId) {
      ...InfractionStaffFragment
    }
  }

  ${INFRACTION_STAFF_FRAGMENT}
`

export const useGetInfractionsStaffUser = ({
  staffId,
  skip
}: {
  staffId: string
  skip?: boolean
}) => {
  const { data, loading } = useQuery(GET_INFRACTION_STAFF_USER, {
    variables: { staffId },
    fetchPolicy: 'cache-first',
    skip
  })

  return {
    data: data?.node,
    loading
  }
}
