import { BetaStaffMemberFragment } from '../../pages/BetaStaffMembers/data/get-beta-staff-member-list'
export type FilterBetaStatus = 'enabled' | 'disabled' | undefined
type TargetStatusField = 'staffPortalBetaEnabled' | 'staffPortalEarlyAdopter'

export const getTeamOptions = (nodes?: BetaStaffMemberFragment[]) => {
  if (!nodes) {
    return []
  }
  const teamOptionsMap: Record<string, string> = {}

  for (const item of nodes) {
    const teams = item.teams

    teams?.nodes.forEach(team => {
      const id = team.id

      if (!teamOptionsMap[id]) {
        teamOptionsMap[id] = team.name
      }
    })
  }

  return Object.entries(teamOptionsMap).map(([teamId, teamName]) => ({
    id: teamId,
    label: teamName
  }))
}

export const filterByStatus = (
  status: string,
  nodes: BetaStaffMemberFragment[],
  targetField: TargetStatusField
) => {
  if (!status) {
    return nodes
  }

  return nodes.filter(node => {
    const isEnabled = node[targetField]

    if (
      (isEnabled && status === 'enabled') ||
      (!isEnabled && status === 'disabled')
    ) {
      return true
    }

    return false
  })
}
export const filterByBetaStatus = (
  status: string,
  nodes: BetaStaffMemberFragment[]
) => filterByStatus(status, nodes, 'staffPortalBetaEnabled')

export const filterByEarlyAdopterStatus = (
  status: string,
  nodes: BetaStaffMemberFragment[]
) => filterByStatus(status, nodes, 'staffPortalEarlyAdopter')

export const filterByTeams = (
  teamIds: string[],
  nodes: BetaStaffMemberFragment[]
) => {
  return nodes.filter(({ teams }) =>
    teams?.nodes.some(team => teamIds.includes(team.id))
  )
}

export const filterByDate = (
  nodes: BetaStaffMemberFragment[],
  fromDate?: string | null,
  tillDate?: string | null
) =>
  nodes.filter(({ lastVisitedDate }) => {
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    const lastVisit = new Date(lastVisitedDate as string)
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    const from = fromDate && new Date(fromDate)
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    const till = tillDate && new Date(tillDate)

    if (from && till) {
      return lastVisit >= from && lastVisit <= till
    }
    if (from) {
      return lastVisit >= from
    }
    if (till) {
      return lastVisit <= till
    }

    return true
  })
