import { toStartCase } from './to-start-case'

describe('toStartCase', () => {
  it('formats to start case', () => {
    expect(toStartCase('this is a sentence')).toBe('This Is A Sentence')
    expect(toStartCase('word')).toBe('Word')
    expect(toStartCase('this, is - a sentence.')).toBe(
      'This, Is - A Sentence.'
    )
  })
})
