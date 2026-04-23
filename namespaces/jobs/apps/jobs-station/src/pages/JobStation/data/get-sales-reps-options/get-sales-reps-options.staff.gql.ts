import { gql, useQuery, decodeEntityId } from '@staff-portal/data-layer-service'

import { GetSalesRepsOptionsDocument } from './get-sales-reps-options.staff.gql.types'
import {
  STAFF_SELECT_OPTION_FRAGMENT,
  StaffSelectOptionFragment
} from '../staff-select-option-fragment'

export const GET_JOB_STATION_SALES_REPS_OPTIONS: typeof GetSalesRepsOptionsDocument = gql`
  query GetSalesRepsOptions {
    roles(
      filter: { scope: SALES_REPRESENTATIVES }
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

export const useGetSalesRepsOptions = (onError: () => void) => {
  const { data, ...queryResult } = useQuery(
    GET_JOB_STATION_SALES_REPS_OPTIONS,
    { onError }
  )

  return {
    ...queryResult,
    salesReps: data?.roles.nodes.map(mapOption)
  }
}
