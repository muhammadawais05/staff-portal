import adjustClientMatcherValues from './adjust-client-matcher-values'

describe('adjustClientMatcherValues', () => {
  it('returns proper values', () => {
    expect(adjustClientMatcherValues({})).toEqual({ matcherId: null })

    expect(
      adjustClientMatcherValues({
        clientId: '123',
        verticalId: ''
      })
    ).toEqual({ clientId: '123', verticalId: '', matcherId: null })

    expect(
      adjustClientMatcherValues({
        clientId: '123',
        verticalId: '456',
        matcherId: '789'
      })
    ).toEqual({ clientId: '123', verticalId: '456', matcherId: '789' })
  })
})
