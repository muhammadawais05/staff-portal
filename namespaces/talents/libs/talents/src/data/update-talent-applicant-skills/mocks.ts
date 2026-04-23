import { UpdateTalentApplicantSkillsInput } from '@staff-portal/graphql/staff'

import { UPDATE_TALENT_APPLICANT_SKILLS } from './update-talent-applicant-skills.staff.gql'

export const createUpdateTalentApplicantSkillsMock = ({
  applicantSkillIds,
  talentId,
  newApplicantSkillNames = []
}: UpdateTalentApplicantSkillsInput) => ({
  request: {
    query: UPDATE_TALENT_APPLICANT_SKILLS,
    variables: { applicantSkillIds, talentId, newApplicantSkillNames }
  },
  result: {
    data: {
      updateTalentApplicantSkills: {
        talent: {
          id: talentId,
          applicantSkills: {
            nodes: [
              {
                id: 'VjEtU2tpbGwtMzg5NDc',
                name: 'Java RMI',
                __typename: 'Skill'
              },
              {
                id: 'VjEtU2tpbGwtMzgwMjU',
                name: 'PHP 5+',
                __typename: 'Skill'
              },
              {
                id: 'VjEtU2tpbGwtMzY5NDU',
                name: 'Django',
                __typename: 'Skill'
              },
              { id: 'VjEtU2tpbGwtMzcyMjA', name: 'Yii', __typename: 'Skill' },
              { id: 'VjEtU2tpbGwtMzY5MTY', name: 'MySQL', __typename: 'Skill' },
              {
                id: 'VjEtU2tpbGwtMzY5Mjk',
                name: 'PostgreSQL',
                __typename: 'Skill'
              },
              { id: 'VjEtU2tpbGwtMzY5MTg', name: 'CSS', __typename: 'Skill' }
            ],
            __typename: 'TalentApplicantSkillConnection'
          },
          __typename: 'Talent'
        },
        success: true,
        errors: [],
        __typename: 'UpdateTalentApplicantSkillsPayload'
      }
    }
  }
})

export const createUpdateTalentApplicantSkillsFailedMock = (
  input: UpdateTalentApplicantSkillsInput
) => ({
  request: { query: UPDATE_TALENT_APPLICANT_SKILLS, variables: { input } },
  error: new Error('Error occurred')
})
