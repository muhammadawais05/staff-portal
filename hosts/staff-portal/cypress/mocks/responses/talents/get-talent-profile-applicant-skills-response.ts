import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentProfileApplicantSkillsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      applicantSkills: {
        nodes: [
          {
            id: 'VjEtU2tpbGwtMTExNzEy',
            name: 'AWS',
            __typename: 'Skill'
          },
          {
            id: 'VjEtU2tpbGwtMzcwMDE',
            name: 'Jenkins',
            __typename: 'Skill'
          }
        ],
        __typename: 'TalentApplicantSkillConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
