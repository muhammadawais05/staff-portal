import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetLongshotReasonsDocument } from './get-longshot-reasons.staff.gql.types'

export default gql`
  query GetLongshotReasons {
    jobLongshotReasons
  }
`

export const useGetLongshotReasons = () => {
  const { data, ...restOptions } = useQuery(GetLongshotReasonsDocument)

  return {
    ...restOptions,
    jobLongshotReasons: data?.jobLongshotReasons ?? []
  }
}
