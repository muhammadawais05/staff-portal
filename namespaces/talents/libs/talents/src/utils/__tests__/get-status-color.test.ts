import { getStatusColor } from '../get-status-color'

describe('getStatusColor', () => {
  const defaultProps = {
    pureScore: 0,
    acceptThreshold: 0,
    rejectThreshold: 0
  }

  it('should return undefined when pureScore is null', () => {
    const testProps = {
      ...defaultProps,
      pureScore: null
    }

    const result = getStatusColor(testProps)

    expect(result).toBeUndefined()
  })

  it('should return red if pureScore is less than rejectThreshold', () => {
    const testProps = {
      ...defaultProps,
      pureScore: 1,
      rejectThreshold: 5
    }

    const result = getStatusColor(testProps)

    expect(result).toBe('red')
  })

  it('should return green if pureScore is greater than acceptThreshold', () => {
    const testProps = {
      ...defaultProps,
      pureScore: 6,
      acceptThreshold: 5
    }

    const result = getStatusColor(testProps)

    expect(result).toBe('green')
  })

  it('should return green if pureScore is equal acceptThreshold', () => {
    const testProps = {
      ...defaultProps,
      pureScore: 5,
      acceptThreshold: 5
    }

    const result = getStatusColor(testProps)

    expect(result).toBe('green')
  })

  it('should return yellow if pureScore is less than acceptThreshold and greater than rejectThreshold', () => {
    const testProps = {
      ...defaultProps,
      pureScore: 3,
      rejectThreshold: 1,
      acceptThreshold: 5
    }

    const result = getStatusColor(testProps)

    expect(result).toBe('yellow')
  })
})
