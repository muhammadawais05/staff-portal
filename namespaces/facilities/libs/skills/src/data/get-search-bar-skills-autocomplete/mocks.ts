import {
  GetSearchBarSkillsAutocompleteQuery,
  GetSearchBarSkillsAutocompleteQueryVariables,
  SearchBarSkillAutocompleteEdgeFragment,
  GetSearchBarSkillsAutocompleteDocument
} from './get-search-bar-skills-autocomplete.staff.gql.types'

export const buildSearchBarSkillMock = ({
  id = '1',
  label = 'Ruby',
  labelHighlight = 'Ruby',
  nodeType = 'skill_name'
} = {}): SearchBarSkillAutocompleteEdgeFragment => ({
  key: id,
  label,
  labelHighlight,
  node: {
    id
  },
  nodeTypes: [nodeType]
})

export const createGetSearchBarSkillsMock = (hasSuggestions = true) => ({
  request: {
    query: GetSearchBarSkillsAutocompleteDocument,
    variables: {
      term: 'Ru',
      excludedIds: [],
      limit: 6,
      offset: 0
    } as GetSearchBarSkillsAutocompleteQueryVariables
  },
  result: {
    data: {
      autocomplete: {
        edges: hasSuggestions
          ? [
              buildSearchBarSkillMock(),
              buildSearchBarSkillMock({
                id: '2',
                label: 'Ruby on Rails',
                labelHighlight: 'Ruby on Rails',
                nodeType: 'skill_name'
              })
            ]
          : []
      }
    } as GetSearchBarSkillsAutocompleteQuery
  }
})

export const createGetSearchBarSkillsFailedMock = (
  errorMessage = 'fake error message.'
) => ({
  request: { query: GetSearchBarSkillsAutocompleteDocument },
  error: new Error(errorMessage)
})
