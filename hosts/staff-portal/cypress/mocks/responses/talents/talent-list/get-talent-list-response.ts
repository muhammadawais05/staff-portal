import { Talent } from '@staff-portal/graphql/staff'

export const getTalentListResponse = (talents: Partial<Talent>[] = []) => ({
  data: {
    talents: {
      nodes: talents,
      totalCount: talents.length,
      __typename: 'TalentOffsetConnection'
    }
  }
})
