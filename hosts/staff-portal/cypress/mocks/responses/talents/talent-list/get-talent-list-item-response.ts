import { Talent } from '@staff-portal/graphql/staff'

export const getTalentListItemResponse = (talent: Partial<Talent>) => ({
  data: {
    node: talent
  }
})
