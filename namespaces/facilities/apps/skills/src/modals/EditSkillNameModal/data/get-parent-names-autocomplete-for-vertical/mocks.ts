import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetPossibleParentNamesAutocompleteForVerticalDocument } from './index'
import { EditSkillNameSkillAutocompleteEdgeFragment } from '../index'

export const createFailedGetParentNamesAutocompleteForVerticalMock = ({
  verticalId,
  term
}: {
  verticalId: string
  term: string
}): MockedResponse => ({
  request: {
    query: GetPossibleParentNamesAutocompleteForVerticalDocument,
    variables: {
      verticalId,
      term,
      offset: 0,
      limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
    }
  },
  error: new Error('Failed request')
})

export const createSuccessfulGetParentNamesAutocompleteForVerticalMock = ({
  verticalId,
  term,
  skills
}: {
  verticalId: string
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
      query: GetPossibleParentNamesAutocompleteForVerticalDocument,
      variables: {
        verticalId,
        term,
        offset: 0,
        limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
      }
    },
    result: {
      data: {
        node: {
          possibleParentSkillNamesAutocomplete: {
            edges,
            __typename: 'AutocompleteConnection'
          },
          __typename: 'Vertical'
        }
      }
    }
  }
}
