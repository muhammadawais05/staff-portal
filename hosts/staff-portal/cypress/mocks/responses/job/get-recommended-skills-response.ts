import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getRecommendedSkillsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      recommendedSkills: {
        requestId: '52aee970-95ef-4ca9-aae0-759d503b0b30',
        nodes: [
          {
            name: 'iOS',
            totalProfilesCount: 3824,
            __typename: 'RecommendedSkill'
          }
        ],
        __typename: 'RecommendedSkillConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
