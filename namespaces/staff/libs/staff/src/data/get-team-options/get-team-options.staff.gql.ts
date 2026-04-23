import { useMemo } from 'react'
import {
  gql,
  useQuery,
  decodeEntityId,
  encodeEntityId
} from '@staff-portal/data-layer-service'

import { GetTeamsDocument } from './get-team-options.staff.gql.types'

export default gql`
  query GetTeams($filter: TeamsFilter!) {
    teams(filter: $filter, pagination: { offset: 0, limit: 9999 }) {
      totalCount
      nodes {
        id
        name
      }
    }
  }
`

const mapResponse = ({ id, name }: { id: string; name: string }) => ({
  id,
  value: decodeEntityId(id).id,
  text: name
})

const mapIds = (id: string) => encodeEntityId(id, 'Team')

export const useGetTeamOptions = ({
  ids,
  onError,
  skip
}: {
  ids?: string[]
  onError?: () => void
  skip?: boolean
}) => {
  const { data, ...queryResult } = useQuery(GetTeamsDocument, {
    skip,
    variables: { filter: { ids: ids?.map(mapIds) } },
    onError
  })

  const options = useMemo(() => data?.teams?.nodes?.map(mapResponse), [data])

  return {
    ...queryResult,
    teamOptions: options
  }
}
