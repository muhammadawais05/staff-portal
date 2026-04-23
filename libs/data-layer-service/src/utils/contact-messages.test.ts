import { concatMessages } from './concat-messages'

describe('Concatenate messages', () => {
  it('handles undefined list', () => {
    expect(concatMessages()).toBe('')
  })

  it('handles an empty list', () => {
    expect(concatMessages([])).toBe('')
  })

  it('handles list with an empty message', () => {
    expect(concatMessages(['', ''])).toBe('')
  })

  it('returns messages as a string', () => {
    expect(concatMessages(['Error 1', 'Error 2'])).toBe('Error 1. Error 2.')
  })

  it('adds a dot at the end', () => {
    expect(concatMessages(['Error 1'])).toBe('Error 1.')
  })

  it('keeps the previous delimiter', () => {
    expect(concatMessages(['Error 1.', 'Error 2'])).toBe('Error 1. Error 2.')
  })
})
