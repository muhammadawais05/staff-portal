import { useEffect, useMemo, useState } from 'react'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'

import { BetaStaffMemberFragment } from '../../pages/BetaStaffMembers/data/get-beta-staff-member-list'
import {
  getTeamOptions,
  filterByBetaStatus,
  filterByEarlyAdopterStatus,
  filterByTeams,
  filterByDate
} from './utils'

const sortByName = (
  leftNode: BetaStaffMemberFragment,
  rightNode: BetaStaffMemberFragment
) => leftNode.fullName.localeCompare(rightNode.fullName)

export interface BetaStaffQueryParams extends QueryParams {
  beta_status?: string
  early_adopter_status?: string
  teams?: string[]
  last_visit?: { from?: string; till?: string }
}

export const useBetaStaffMembersFilters = (
  filterValues: BetaStaffQueryParams,
  data?: BetaStaffMemberFragment[]
) => {
  const [filteredNodes, setFilteredNodes] =
    useState<BetaStaffMemberFragment[]>()

  const sortedNodes: BetaStaffMemberFragment[] | undefined = useMemo(
    () =>
      data &&
      [...data].sort(sortByName).map(node => ({
        ...node,
        teams: {
          ...node.teams,
          nodes:
            node.teams?.nodes.map(team => ({
              ...team,
              id: decodeEntityId(team.id).id
            })) ?? []
        }
      })),
    [data]
  )

  const teamOptions = useMemo(() => getTeamOptions(sortedNodes), [sortedNodes])

  useEffect(() => {
    if (sortedNodes) {
      let filtered = [...sortedNodes]
      const { beta_status, early_adopter_status, last_visit, teams } =
        filterValues
      const from = last_visit?.from
      const till = last_visit?.till

      if (beta_status) {
        filtered = filterByBetaStatus(beta_status, filtered)
      }
      if (early_adopter_status) {
        filtered = filterByEarlyAdopterStatus(early_adopter_status, filtered)
      }
      if (teams?.length) {
        filtered = filterByTeams(teams, filtered)
      }
      if (from || till) {
        filtered = filterByDate(filtered, from, till)
      }
      setFilteredNodes(filtered)
    }
  }, [sortedNodes, setFilteredNodes, filterValues])

  return {
    teamOptions,
    filteredNodes
  }
}
