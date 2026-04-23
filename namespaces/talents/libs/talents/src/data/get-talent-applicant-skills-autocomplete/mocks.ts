import { mapToTypename } from '@staff-portal/test-utils'

import { GetTalentApplicationSkillsAutoCompleteQueryVariables } from './get-talent-applicant-skills-autocomplete.staff.gql.types'
import { GET_TALENT_APPLICATION_SKILLS_AUTOCOMPLETE } from './get-talent-applicant-skills-autocomplete.staff.gql'

export const generateGetTalentApplicationsSkillsAutoCompleteMock = (
  skills: { name: string; id: string }[]
) =>
  skills.map(skill => ({
    node: {
      name: skill.name,
      id: skill.id,
      __typename: 'Skill'
    }
  }))

export const createGetTalentApplicationsSkillsAutoCompleteMock = (
  applicantSkills: {
    key: string
    labelHighlight: string
    node: {
      name: string
      id: string
      __typename: string
    }
  }[],
  {
    talentOrVerticalId,
    term,
    limit = 0,
    offset = 0,
    excludedIds
  }: GetTalentApplicationSkillsAutoCompleteQueryVariables
) => ({
  request: {
    query: GET_TALENT_APPLICATION_SKILLS_AUTOCOMPLETE,
    variables: { talentOrVerticalId, term, offset, limit, excludedIds }
  },
  result: {
    data: {
      node: {
        id: talentOrVerticalId,
        skillsAutocomplete: {
          edges: mapToTypename(applicantSkills, 'AutocompleteEdge')
        },
        __typename: 'Vertical'
      }
    }
  }
})

export const createGetTalentApplicationsSkillsAutoCompleteFailedMock = ({
  talentOrVerticalId,
  term,
  limit = 0,
  offset = 0,
  excludedIds
}: GetTalentApplicationSkillsAutoCompleteQueryVariables) => ({
  request: {
    query: GET_TALENT_APPLICATION_SKILLS_AUTOCOMPLETE,
    variables: { talentOrVerticalId, term, offset, limit, excludedIds }
  },
  error: new Error('Mocked Error')
})
