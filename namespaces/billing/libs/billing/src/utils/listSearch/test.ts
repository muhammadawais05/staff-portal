import { ApolloClient } from '@apollo/client'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import {
  fromOption,
  getAutocompleteOptions,
  getBadgeLabel,
  getBadgeOptionsByQueryParams,
  toQueryParam
} from '.'
import { QueryAutocompleteDocument } from '../../data'
import { encodeId } from '../../_lib/helpers/apollo'
import { mapSearchParams } from './configureSearchParameters'
import { SearchBarGqlParam } from './searchbarToGql'
import { rejectEmpty } from './rejectEmpty'

describe('ListSearchAutocomplete utils', () => {
  it('#getAutocompleteOptions', async () => {
    const mockEdges: unknown[] = []
    const mockData = { autocomplete: { edges: mockEdges } }
    const mockQuery = jest.fn().mockReturnValue({
      data: mockData,
      loading: false
    })
    const mockApolloClient = { query: mockQuery }

    const term = '123'
    const limit = 100
    const offset = 0
    const model = AutocompleteModels.ACTIVE_OR_WITH_INVOICES_CLIENTS
    const result = await getAutocompleteOptions(model)(
      term,
      limit,
      mockApolloClient as unknown as ApolloClient<object>
    )

    expect(result).toStrictEqual({
      data: mockEdges,
      loading: false
    })

    expect(mockQuery).toHaveBeenCalledWith({
      query: QueryAutocompleteDocument,
      variables: {
        limit,
        model,
        offset,
        term
      }
    })
  })

  it('#getBadgeOptionsByQueryParams', async () => {
    const mockEdges: unknown[] = [{ label: 'test', node: { id: '123' } }]
    const mockData = { autocomplete: { edges: mockEdges } }
    const mockQuery = jest.fn().mockReturnValue({
      data: mockData,
      loading: false
    })
    const mockApolloClient = { query: mockQuery }

    const ids = ['456']
    const type = 'job'
    const model = AutocompleteModels.JOBS
    const result = await getBadgeOptionsByQueryParams(model, type)(
      ids,
      mockApolloClient as unknown as ApolloClient<object>
    )

    expect(result).toStrictEqual({
      data: [
        {
          id: '123',
          label: 'test',
          companyLegacyId: undefined
        }
      ],
      loading: false
    })

    expect(mockQuery).toHaveBeenCalledWith({
      query: QueryAutocompleteDocument,
      variables: {
        limit: ids.length,
        model,
        offset: 0,
        ids: ids.map(id => encodeId({ id, type })),
        term: ''
      }
    })
  })
})

const model = {
  payee_ids: 'payeeIds',
  jobs: 'jobTitles',
  client_ids: 'clientIds',
  talent_ids: 'talentIds'
}

describe('#mapSearchValues', () => {
  it('remaps values properly', () => {
    const expectedBase = { payeeIds: 'a', jobTitles: 'a' }

    const base = { payee_ids: 'a', jobs: 'a' }
    const actual = mapSearchParams(model)(base, {
      badges: { base },
      page: '1'
    })
    const expected = {
      values: expectedBase,
      urlValues: {
        badges: expectedBase,
        page: '1'
      }
    }

    expect(actual).toEqual(expected)
  })

  it('will change only the values presented by the model', () => {
    const expectedBase = { noChange: 'a', no_change: 'a' }

    const actual = mapSearchParams(model)(expectedBase, {
      badges: { expectedBase },
      page: '1'
    })
    const expected = {
      values: expectedBase,
      urlValues: {
        badges: expectedBase,
        page: '1'
      }
    }

    expect(actual).toEqual(expected)
  })
})

describe('#SearchBarGqlParam', () => {
  describe('When `value` is invalid', () => {
    it('returns undefined', () => {
      const actual = SearchBarGqlParam<any, any>(undefined)({}, {})

      expect(actual).toBeUndefined()
    })
  })

  describe('When `value` is valid', () => {
    it('returns set of values', () => {
      const values = { test: 'a' }
      const actual = SearchBarGqlParam<any, any>(undefined)(values, values)

      expect(actual).toEqual(values)
    })
  })

  it('calls each value set with its associated convert function', () => {
    const option = { id: '1234', label: 'label' }
    const option2 = { id: '5678', label: 'second label' }
    const values = { jobTitles: [option, option2] }
    const mock = jest.fn()
    const noCallMock = jest.fn()

    SearchBarGqlParam<any, any>({ jobTitles: mock, noCall: noCallMock })(
      values,
      values
    )

    expect(mock).toHaveBeenNthCalledWith(1, option)
    expect(mock).toHaveBeenNthCalledWith(2, option2)
    expect(noCallMock).not.toHaveBeenCalled()
  })
})

describe('#autocomplete', () => {
  it('#getBadgeLabel', () => {
    expect(getBadgeLabel({})).toBe('')
    expect(getBadgeLabel({ label: 'foo' })).toBe('foo')
  })

  it('#toQueryParam', () => {
    expect(
      toQueryParam({ id: encodeId({ type: 'job', id: '123' }), label: 'foo' })
    ).toBe('123')
  })

  it('#fromOption', () => {
    expect(
      fromOption({ label: 'test', node: { id: '123' }, nodeTypes: [] })
    ).toEqual({
      id: '123',
      label: 'test'
    })

    expect(fromOption({ node: { id: '123' }, nodeTypes: [] })).toEqual({
      id: '123',
      label: ''
    })
  })
})

describe('#rejectEmpty', () => {
  it('removes empty values on an object', () => {
    const input = { a: '', b: { a: true, c: 'valid', d: '' } }
    const actual = rejectEmpty(input)
    const expected = { b: { a: true, c: 'valid' } }

    expect(actual).toEqual(expected)
  })

  it('does not mess up arrays', () => {
    const input = { a: '', b: { c: 'valid', d: ['a', 'b'] } }
    const actual = rejectEmpty(input)
    const expected = { b: { c: 'valid', d: ['a', 'b'] } }

    expect(actual).toEqual(expected)
  })
})
