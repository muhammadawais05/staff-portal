import formatDuration from './format-duration'

describe('format-duration', () => {
  it('returns formatted duration', () => {
    const result = formatDuration(67)

    expect(result).toBe('01:07')
  })
})
