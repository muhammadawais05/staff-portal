import { decodeEntityId } from '@staff-portal/data-layer-service'

import { isMeOrNone } from './is-me-or-none'
import { MatcherGqlParam } from './id-matchers-gql-param'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: jest.fn()
}))
jest.mock('./is-me-or-none', () => ({
  isMeOrNone: jest.fn()
}))

const decodedEntityMock = decodeEntityId as jest.Mock
const isMeOrNoneMock = isMeOrNone as jest.Mock

describe('MatcherGqlParam', () => {
  it.each([
    {
      isMeOrNoneValue: false,
      values: { staff: '123' },
      expected: [{ roleIdentifier: 'decodedEntity', talentType: 'staff' }]
    },
    {
      isMeOrNoneValue: true,
      values: { staff: 'ME' },
      expected: [{ roleIdentifier: 'me', talentType: 'staff' }]
    },
    {
      isMeOrNoneValue: true,
      values: { staff: 'NONE' },
      expected: [{ roleIdentifier: 'none', talentType: 'staff' }]
    },
    {
      isMeOrNoneValue: false,
      values: { staff: undefined },
      expected: []
    },
    {
      isMeOrNoneValue: false,
      values: { staff: null },
      expected: []
    },
    {
      isMeOrNoneValue: false,
      values: {},
      expected: []
    }
  ])('returns proper value for %s', ({ values, expected, isMeOrNoneValue }) => {
    decodedEntityMock.mockReturnValue({ id: 'decodedEntity' })
    isMeOrNoneMock.mockReturnValue(isMeOrNoneValue)

    const result = MatcherGqlParam()(values)

    expect(result).toMatchObject(expected)
  })
})
