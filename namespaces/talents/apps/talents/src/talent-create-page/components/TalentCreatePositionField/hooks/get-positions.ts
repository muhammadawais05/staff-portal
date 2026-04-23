import { useQuery } from '@staff-portal/data-layer-service'
import { SelectOption } from '@toptal/picasso'
import { useMemo } from 'react'

import { GetTalentCreatePositionsDocument } from '../data/get-positions/get-positions.staff.gql.types'

export const useGetPositions = () => {
  const { data, loading } = useQuery(GetTalentCreatePositionsDocument)

  const selectOptions = useMemo(() => {
    const result = data?.topscreenClients?.nodes.reduce<SelectOption[]>(
      (acc, item) => {
        item?.topscreenPositions?.nodes.forEach(positionItem => {
          acc.push({
            value: positionItem.id,
            text: `${positionItem.title} (${item.name})`
          })
        })

        return acc
      },
      []
    )

    return result || []
  }, [data])

  return {
    selectOptions,
    loading
  }
}
