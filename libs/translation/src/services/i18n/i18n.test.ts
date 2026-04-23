import { i18n } from '../i18n/i18n'
import { formatter } from '../formatter/formatter'

jest.mock('../formatter/formatter')

const mockedFormatter = formatter as jest.Mock

describe('i18n', () => {
  it('i18n has all passed options', () => {
    expect(i18n.options).toEqual(
      expect.objectContaining({
        fallbackLng: ['en'],
        fallbackNS: false,
        interpolation: {
          escapeValue: false,
          format: mockedFormatter
        },
        ns: []
      })
    )
  })
})
