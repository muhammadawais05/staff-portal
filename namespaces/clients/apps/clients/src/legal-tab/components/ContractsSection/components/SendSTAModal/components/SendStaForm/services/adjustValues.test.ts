import { SendStaFormValues } from '../types/send-sta-form-values'
import { adjustValues } from './adjustValues'

describe('adjustValues', () => {
  it.each([
    [
      {
        customSigner: 'true',
        signerEmail: 'email',
        signerFullName: 'fullName'
      },
      { customSigner: true, signerEmail: 'email', signerFullName: 'fullName' }
    ],
    [
      {
        customSigner: 'false',
        signerEmail: 'email',
        signerFullName: 'fullName'
      },
      { customSigner: false }
    ]
  ])('returns expected output for given input', (values, expected) => {
    const clientId = {} as string
    const showDescendants = {} as boolean

    const adjusted = adjustValues(
      values as SendStaFormValues,
      clientId,
      showDescendants
    )

    expect(adjusted).toEqual({
      input: {
        clientId,
        ...expected
      },
      showDescendants
    })
  })
})
