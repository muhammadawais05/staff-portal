import createGqlFilterVariables from './create-gql-filter-variables'

const mockFilterValues = {
  kind: 'activation',
  talent_type: ['talent_type_1', 'talent_type_2'],
  badges: {
    keywords: ['keyword_1', 'keyword_2']
  },
  logic: 'OR'
}

const mockPagination = { offset: 0, limit: 10 }

describe('createGqlFilterVariables', () => {
  it('returns correct values', () => {
    const { filter, pagination } = createGqlFilterVariables(
      mockFilterValues,
      mockPagination
    )

    expect(filter).toEqual({
      kind: mockFilterValues.kind.toUpperCase(),
      talentType: mockFilterValues.talent_type,
      keywords: mockFilterValues.badges.keywords,
      logic: mockFilterValues.logic
    })
    expect(pagination).toEqual({
      offset: 0,
      limit: 10
    })
  })
})
