import { adjustValues } from './adjust-values'

describe('adjustValues', () => {
  it('returns adjusted form values', () => {
    expect(
      adjustValues({
        clientId: '1',
        customSigner: 'true',
        signerFullName: 'John',
        signerEmail: 'Smith'
      })
    ).toEqual({
      clientId: '1',
      customSigner: true,
      signerFullName: 'John',
      signerEmail: 'Smith'
    })

    expect(
      adjustValues({
        clientId: '1',
        customSigner: 'false',
        signerFullName: 'John',
        signerEmail: 'Smith'
      })
    ).toEqual({
      clientId: '1',
      customSigner: false
    })
  })
})
