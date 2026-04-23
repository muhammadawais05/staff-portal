import { gqlNoneMeIdQueryParam } from './gql-none-me-id-query-param'

describe('gqlNoneMeIdQueryParam', () => {
  it('will decode the id', () => {
    const actualEncodedId = gqlNoneMeIdQueryParam('Staff').decode('id', {}, {})

    expect(actualEncodedId).toBe('VjEtU3RhZmYtaWQ')
  })

  it('will respect the ignored values', () => {
    const actualDecodedIdMe = gqlNoneMeIdQueryParam('Staff').decode(
      'me',
      {},
      {}
    )
    const actualEncodedIdME = gqlNoneMeIdQueryParam('Staff').encode('ME')
    const actualDecodedIdNone = gqlNoneMeIdQueryParam('Staff').decode(
      'none',
      {},
      {}
    )
    const actualEncodedIdNONE = gqlNoneMeIdQueryParam('Staff').encode('NONE')

    expect(actualDecodedIdMe).toBe('me')
    expect(actualEncodedIdME).toBe('me')
    expect(actualDecodedIdNone).toBe('none')
    expect(actualEncodedIdNONE).toBe('none')
  })
})
