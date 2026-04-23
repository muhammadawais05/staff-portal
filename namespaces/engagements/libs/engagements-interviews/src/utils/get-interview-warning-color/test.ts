import getInterviewWarningColor from './get-interview-warning-color'

describe('getInterviewWarningColor', () => {
  it('returns correct colors', () => {
    expect(getInterviewWarningColor('high')).toBe('red')

    expect(getInterviewWarningColor('medium')).toBe('yellow')

    expect(getInterviewWarningColor('low')).toBe('green')

    expect(getInterviewWarningColor('')).toBe('dark-grey')
  })
})
