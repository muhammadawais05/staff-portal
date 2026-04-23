import { adjustStage } from '.'

describe('adjustStage', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ stage: 'Option' }, { stage: 'Option' }],
      [{ stage: '' }, { stage: '' }],
      [{ stage: undefined }, { stage: '' }]
    ])('%s', (input, expected) => {
      expect(adjustStage(input)).toMatchObject(expected)
    })
  })
})
