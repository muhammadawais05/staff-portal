import { useMemo } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'

import { GetFavoriteTalentsDocument } from '../data/get-favorite-talents.staff.gql.types'

const useGetFavoriteTalents = (jobId: string) => {
  const { data, loading } = useQuery(GetFavoriteTalentsDocument, {
    variables: { jobId }
  })

  const favoriteTalentsOptions = useMemo(
    () =>
      data?.node?.favoriteTalents?.edges.map(
        ({ node: { id, fullName, availabilityRequestMetadata } }) => ({
          text: fullName as string,
          value: id as string,
          label: fullName,
          node: {
            id,
            availabilityRequestMetadata
          }
        })
      ),
    [data]
  )

  return {
    loading,
    favoriteTalentsOptions
  }
}

export default useGetFavoriteTalents
