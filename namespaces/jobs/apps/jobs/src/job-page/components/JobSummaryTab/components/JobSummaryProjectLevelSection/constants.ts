import { JobProjectTeamInvolved } from '@staff-portal/graphql/staff'

export const JOB_PROJECT_TEAM_ENVOLVED_MAPPING: Record<
  JobProjectTeamInvolved,
  string
> = {
  [JobProjectTeamInvolved.INVOLVED_UNSURE]: 'Unsure',
  [JobProjectTeamInvolved.INVOLVED_NO_TEAM]: 'No team',
  [JobProjectTeamInvolved.INVOLVED_JUST_CLIENT]: 'Just client',
  [JobProjectTeamInvolved.INVOLVED_2_TO_6_MEMBERS]: '2 - 6 members',
  [JobProjectTeamInvolved.INVOLVED_7_PLUS_MEMBERS]: '7+ members'
}
