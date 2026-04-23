import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetPossibleParentNamesAutocompleteForSkillDocument } from './index'
import { EditSkillNameSkillAutocompleteEdgeFragment } from '../index'

export const createFailedGetParentNamesAutocompleteForSkillMock = ({
  skillId,
  term
}: {
  skillId: string
  term: string
}): MockedResponse => ({
  request: {
    query: GetPossibleParentNamesAutocompleteForSkillDocument,
    variables: {
      skillId,
      term,
      offset: 0,
      limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
    }
  },
  error: new Error('Failed request')
})

export const createSuccessfulGetParentNamesAutocompleteForSkillMock = ({
  skillId,
  term,
  skills
}: {
  skillId: string
  term: string
  skills?: Partial<EditSkillNameSkillAutocompleteEdgeFragment>[]
}): MockedResponse => {
  const edges = skills || [
    {
      key: 'skills-keywords-101',
      label: 'Rails',
      labelHighlight: '{{strong}}Rails{{/strong}}',
      node: {
        id: 'skill-101',
        __typename: 'Skill'
      },
      __typename: 'AutocompleteEdge'
    }
  ]

  return {
    request: {
      query: GetPossibleParentNamesAutocompleteForSkillDocument,
      variables: {
        skillId,
        term,
        offset: 0,
        limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
      }
    },
    result: {
      data: {
        node: {
          possibleParentNamesAutocomplete: {
            edges,
            __typename: 'AutocompleteConnection'
          },
          __typename: 'Skill'
        }
      }
    }
  }
}
