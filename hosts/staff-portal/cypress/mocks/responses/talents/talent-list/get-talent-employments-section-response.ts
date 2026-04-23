import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentEmploymentsSectionResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      vertical: {
        id: 'VjEtVmVydGljYWwtOA',
        talentType: 'project_manager',
        __typename: 'Vertical'
      },
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS05NzU5OTU',
        employments: {
          nodes: [
            {
              company: 'Cogitact Management Consulting',
              startDate: 2018,
              endDate: null,
              experienceItems: ['Coached a construction.'],
              position: 'Project Management Consultant',
              skills: {
                nodes: [
                  {
                    id: 'VjEtU2tpbGwtNjM2ODg',
                    name: 'Agile',
                    __typename: 'Skill'
                  }
                ],
                __typename: 'SkillConnection'
              },
              __typename: 'Employment'
            }
          ],
          __typename: 'EmploymentConnection'
        },
        __typename: 'Profile'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
