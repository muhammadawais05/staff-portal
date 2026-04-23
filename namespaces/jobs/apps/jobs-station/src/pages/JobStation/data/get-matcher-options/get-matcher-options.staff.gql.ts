import { gql, useQuery, decodeEntityId } from '@staff-portal/data-layer-service'

import { GetMatchersOptionsDocument } from './get-matcher-options.staff.gql.types'
import {
  STAFF_SELECT_OPTION_FRAGMENT,
  StaffSelectOptionFragment
} from '../staff-select-option-fragment'

export const GET_JOB_STATION_MATCHER_OPTIONS: typeof GetMatchersOptionsDocument = gql`
  query GetMatchersOptions {
    roles(
      filter: { scope: MATCHERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        ...StaffSelectOptionFragment
      }
    }
  }

  ${STAFF_SELECT_OPTION_FRAGMENT}
`

const mapOption = ({ id, fullName }: StaffSelectOptionFragment) => ({
  id: decodeEntityId(id).id,
  fullName
})

export const useGetMatchersOptions = (onError: () => void) => {
  const { data, ...queryResult } = useQuery(GET_JOB_STATION_MATCHER_OPTIONS, {
    onError
  })

  return {
    ...queryResult,
    matchers: data?.roles.nodes.map(mapOption)
  }
}
