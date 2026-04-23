import { Talent } from '@staff-portal/graphql/staff'

export const getTalentSkillsWithExperienceResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: 'VjEtVGFsZW50LTIxOTU0ODA',
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS05NzU5OTU',
        skillSets: {
          nodes: [
            {
              id: 'VjEtU2tpbGxTZXQtNTk5MDgz',
              skill: {
                id: 'VjEtU2tpbGwtNjM4Mjk',
                name: 'Projects',
                skillPage: null,
                __typename: 'Skill'
              },
              experience: 20,
              __typename: 'SkillSet'
            }
          ],
          __typename: 'SkillSetConnection'
        },
        __typename: 'TalentProfile'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
