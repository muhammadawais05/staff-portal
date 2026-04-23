import { Talent } from '@staff-portal/graphql/staff'

export const getJobTalentListItemResponse = (talent: Partial<Talent>) => ({
  data: {
    node: talent
  }
})
