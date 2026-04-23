import { concatMutationErrors } from './concat-mutation-errors'

describe('Mutation error concatenation', () => {
  it('handles an empty error list', () => {
    expect(concatMutationErrors([])).toBe('')
  })

  it('handles error list with an empty message', () => {
    expect(concatMutationErrors([{ message: '' }])).toBe('')
  })

  it('handles return errors as a string', () => {
    expect(
      concatMutationErrors([{ message: 'Error 1' }, { message: 'Error 2' }])
    ).toBe('Error 1. Error 2.')
  })

  it('adds a dot at the end', () => {
    expect(concatMutationErrors([{ message: 'Error 1' }])).toBe('Error 1.')
  })

  it('keeps the previous delimiter', () => {
    expect(
      concatMutationErrors([{ message: 'Error 1.' }, { message: 'Error 2' }])
    ).toBe('Error 1. Error 2.')
  })
})
