import { encode, decode, sanitize } from './encoder'

describe('encode() function', () => {
  describe('when configuration is provided', () => {
    it('encodes parameters', () => {
      const PARAMETER_WITH_ENCODER = 'pdkd72'
      const result = encode(
        {
          parameterWithEncoder: PARAMETER_WITH_ENCODER
        },
        {
          parameterWithEncoder: {
            encode: (value: string) => `${value}-encoded`,
            decode: () => null
          }
        }
      )

      expect(result).toEqual({
        parameterWithEncoder: `${PARAMETER_WITH_ENCODER}-encoded`
      })
    })
  })

  describe('when configuration is not provided', () => {
    it('leaves parameters intact', () => {
      const PARAMETER_VALUE = 'achd6a'
      const result = encode({ parameter: PARAMETER_VALUE })

      expect(result).toEqual({ parameter: PARAMETER_VALUE })
    })
  })
})

describe('sanitize() function', () => {
  describe('when configuration is provided', () => {
    it('sanitizes encoded parameters', async () => {
      const PARAMETER_WITH_SANITIZER = 'aoc62a'
      const result = sanitize(
        {
          parameterWithSanitizer: PARAMETER_WITH_SANITIZER
        },
        {
          parameterWithSanitizer: {
            encode: () => null,
            sanitize: (value: string) => value.replace(/[^0-9]/g, ''),
            decode: (value: string) => value
          }
        }
      )

      expect(result).toEqual({
        parameterWithSanitizer: '62'
      })
    })
  })

  describe('when configuration is not provided', () => {
    it('leaves parameters intact', async () => {
      const PARAMETER_VALUE = 'alvo83'
      const result = await decode({ parameter: PARAMETER_VALUE })

      expect(result).toEqual({ parameter: PARAMETER_VALUE })
    })
  })
})

describe('decode() function', () => {
  describe('when configuration is provided', () => {
    it('decodes parameters', async () => {
      const PARAMETER_WITH_DECODER = 'aoc62a'
      const result = await decode(
        {
          parameterWithDecoder: PARAMETER_WITH_DECODER
        },
        {
          parameterWithDecoder: {
            encode: () => null,
            decode: (value: string) =>
              new Promise(resolve => resolve(`${value}-decoded`))
          }
        }
      )

      expect(result).toEqual({
        parameterWithDecoder: `${PARAMETER_WITH_DECODER}-decoded`
      })
    })
  })

  describe('when configuration is not provided', () => {
    it('leaves parameters intact', async () => {
      const PARAMETER_VALUE = 'alvo83'
      const result = await decode({ parameter: PARAMETER_VALUE })

      expect(result).toEqual({ parameter: PARAMETER_VALUE })
    })
  })
})
