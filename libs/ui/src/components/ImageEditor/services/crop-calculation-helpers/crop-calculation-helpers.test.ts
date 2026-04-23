import { getMaxInscribedCrop } from './crop-calculation-helpers'

describe('getMaxInscribedCrop', () => {
  it.each([
    {
      aspect: { width: 16, height: 9 },
      width: 16,
      height: 9,
      expected: { width: 16, height: 9 }
    },
    {
      aspect: { width: 16, height: 9 },
      width: 17,
      height: 9,
      expected: { width: 16, height: 9 }
    },
    {
      aspect: { width: 2, height: 4 },
      width: 1,
      height: 100,
      expected: { width: 1, height: 2 }
    },
    {
      aspect: { width: 1, height: 2 },
      width: 3,
      height: 4,
      expected: { width: 2, height: 4 }
    },
    {
      aspect: { width: 1, height: 2 },
      width: 0,
      height: 0,
      expected: { width: 0, height: 0 }
    },
    {
      aspect: { width: 350, height: 350 },
      width: 1,
      height: 3,
      expected: { width: 1, height: 1 }
    },
    {
      aspect: { width: 350, height: 350 },
      width: 5690,
      height: 8955,
      expected: { width: 5690, height: 5690 }
    }
  ])('calculates correctly', ({ width, height, aspect, expected }) => {
    const calculated = getMaxInscribedCrop(width, height, aspect)

    expect(calculated).toEqual(expected)
  })
})
