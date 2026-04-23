import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getTalentWorkExperiencePortfolioItemsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      type: 'ProjectManager',
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS05NzU5OTU',
        portfolioItems: {
          nodes: [
            {
              id: 'VjEtVGFsZW50UG9ydGZvbGlvSXRlbS0xOTU1MTc',
              coverPhoto: null,
              title: 'Timekeeping/Payroll System',
              kindEnum: 'ACCOMPLISHMENT',
              link: '',
              description: 'The customer needed a replacement for.',
              skills: {
                nodes: [
                  {
                    id: 'VjEtU2tpbGwtNzc5ODg',
                    name: 'Microsoft Teams',
                    skillPage: null,
                    __typename: 'Skill'
                  }
                ],
                __typename: 'SkillConnection'
              },
              __typename: 'PortfolioItem'
            }
          ],
          __typename: 'TalentPortfolioItemConnection'
        },
        __typename: 'TalentProfile'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
