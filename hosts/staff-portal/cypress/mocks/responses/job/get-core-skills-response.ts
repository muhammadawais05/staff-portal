import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

export const getCoreSkillsResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      coreSkills: {
        nodes: [
          {
            id: encodeEntityId('123', 'Skill'),
            name: 'Amazon Web Services (AWS)',
            competentProfilesCount: 1,
            expertProfilesCount: 2,
            strongProfilesCount: 3,
            totalProfilesCount: 6,
            category: {
              id: encodeEntityId('123', 'SkillCategory'),
              title: 'Platforms',
              __typename: 'SkillCategory'
            },
            __typename: 'Skill'
          }
        ],
        __typename: 'JobSkillsConnection'
      },
      ...job,
      __typename: 'Job'
    }
  }
})
