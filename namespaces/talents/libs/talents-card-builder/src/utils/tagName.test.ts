import { compareTagNames } from './tagName'

describe('compareTagNames', () => {
  it('sorts alphabetically', () => {
    expect(['Ruby', 'C', 'Javascript'].sort(compareTagNames)).toEqual([
      'C',
      'Javascript',
      'Ruby'
    ])
  })

  it('is case insensitive', () => {
    expect(['Ruby', 'javascript', 'Javascript'].sort(compareTagNames)).toEqual([
      'javascript',
      'Javascript',
      'Ruby'
    ])
  })

  it('is numeric', () => {
    expect(['Windows8', 'Windows10'].sort(compareTagNames)).toEqual([
      'Windows8',
      'Windows10'
    ])
  })
})
