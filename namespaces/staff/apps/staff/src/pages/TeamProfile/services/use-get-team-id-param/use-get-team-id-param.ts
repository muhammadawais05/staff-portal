import { useMemo } from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const useGetTeamIdParam = () => {
  const { id: teamId } = useParams<{ id: string }>()

  return {
    teamId: useMemo(() => encodeEntityId(teamId, 'Team'), [teamId])
  }
}
