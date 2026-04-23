import { gql, useQuery } from '@staff-portal/data-layer-service'

import { getMonthRange } from '../services'
import { GetDayOffsDocument } from './get-days-off.staff.gql.types'

export default gql`
  query GetDayOffs($staffId: ID!, $from: Date!, $till: Date!) {
    node(id: $staffId) {
        ... on Staff {
          daysOff(filter: {from: $from, till: $till}) {
          totalCount
          nodes {
            start
            finish
          }
        }
      }
    }
  }
`

export const useGetDayOffs = ({
  staffId,
  selectedDate
}: {
  staffId: string
  selectedDate: Date
}) => {
  const { data, loading, initialLoading, refetch } = useQuery(
    GetDayOffsDocument,
    {
      variables: {
        staffId,
        ...getMonthRange(selectedDate)
      },
      throwOnError: true
    }
  )

  const dayOffs = data?.node?.daysOff?.nodes.reduce((previousValue, currentValue) => {
    if (currentValue.start && currentValue.finish) {
      const start = new Date(currentValue.start).getDate()
      const finish = new Date(currentValue.finish).getDate()

      const days = Array.from({ length: finish - start + 1 }, (_, counter) => start + counter);

      return [...previousValue, ...days]
    }

    return previousValue
  }, new Array<number>())

  return {
    dayOffs: new Set(dayOffs || []),
    loading,
    refetch,
    initialLoading
  }
}
