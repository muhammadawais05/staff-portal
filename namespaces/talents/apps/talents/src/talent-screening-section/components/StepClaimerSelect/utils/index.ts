import { ClaimerFragment } from '@staff-portal/facilities'

const STAFF_TEAM_NAME = '(Staff)'

export const formatClaimers = (claimers: ClaimerFragment[]) =>
  claimers.map(({ id, fullName }) => ({
    text: fullName + ' ' + STAFF_TEAM_NAME,
    value: id
  }))

export const findClaimerById = (claimers: ClaimerFragment[], id: string) =>
  claimers.find(claimer => claimer.id === id)
