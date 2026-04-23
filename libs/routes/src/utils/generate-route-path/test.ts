import { generateRoute } from '../get-paths/route-paths'
import generateRoutePath from './generate-route-path'

describe('generateRoutePath', () => {
  it('works with empty path', () => {
    expect(generateRoutePath('')).toBe('')
    expect(generateRoutePath('', { searchParams: {} })).toBe('')

    expect(generateRoutePath('', { searchParams: { test: 'value' } })).toBe(
      '?test=value'
    )

    expect(
      generateRoutePath('', {
        searchParams: { test: ['value_1', 'value_2'] }
      })
    ).toBe('?test%5B%5D=value_1&test%5B%5D=value_2')

    expect(
      generateRoutePath('', {
        searchParams: { test: 'value' }
      })
    ).toBe('?test=value')
  })

  it('works with path', () => {
    expect(generateRoutePath('/talents')).toBe('/talents')
    expect(generateRoutePath('/talents', { searchParams: {} })).toBe('/talents')

    expect(
      generateRoutePath('/talents', {
        searchParams: {}
      })
    ).toBe('/talents')

    expect(
      generateRoutePath('/talents', {
        searchParams: { test: 'value' }
      })
    ).toBe('/talents?test=value')

    expect(
      generateRoutePath('/talents', {
        searchParams: { test: ['value_1', 'value_2'] }
      })
    ).toBe('/talents?test%5B%5D=value_1&test%5B%5D=value_2')

    expect(
      generateRoutePath('/talents', {
        searchParams: {
          ['badges[skills][strong][]']: 'React',
          logic: 'and',
          'sort[order]': 'desc'
        }
      })
    ).toBe(
      '/talents?badges%5Bskills%5D%5Bstrong%5D%5B%5D=React&logic=and&sort%5Border%5D=desc'
    )

    expect(
      generateRoutePath(
        generateRoute<{ entity: string; id: string }>(
          'https://toptal.net/:entity/:id'
        ),
        {
          parameters: { entity: 'talents', id: '1' },
          searchParams: { test: 'value' }
        }
      )
    ).toBe('https://toptal.net/talents/1?test=value')
  })
})
