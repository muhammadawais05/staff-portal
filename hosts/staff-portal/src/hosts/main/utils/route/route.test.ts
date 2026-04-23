import { RouteData } from '@staff-portal/navigation'
import * as config from '@staff-portal/config'
import { Route } from '@staff-portal/routes'

import route from './route'

const PLATFORM_ORIGIN = 'https://platform.toptal.net'
const SP_ORIGIN = 'https://toptal.net'

describe('route', () => {
  beforeEach(() => {
    Object.defineProperty(config, 'PLATFORM_API_URL', {
      get: jest.fn().mockReturnValue(PLATFORM_ORIGIN)
    })

    Object.defineProperty(config, 'LEGACY_STAFF_PORTAL_URL', {
      get: jest.fn().mockReturnValue(`${PLATFORM_ORIGIN}/platform/staff`)
    })

    Object.defineProperty(config, 'ENVIRONMENT', {
      get: jest.fn().mockReturnValue('production')
    })

    Object.defineProperty(window, 'location', {
      value: { origin: SP_ORIGIN }
    })
  })

  it('returns the same value when path is a not valid url', () => {
    const notValidUrl = 'https://'
    const { url } = route([])(notValidUrl)

    expect(url).toBe(notValidUrl)
  })

  it('returns the same value when path origin is external', () => {
    const externalUrl = 'https://google.com/path?with=search#hash'
    const { url } = route([])(externalUrl)

    expect(url).toBe(externalUrl)
  })

  const oldFormatUrls: [string, string[], RouteData][] = [
    [
      '/platform/staff/tasks/123?performer_id=1',
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123?performer_id=1` }
    ],
    [
      '/platform/staff/tasks/123?performer_id=2',
      ['/tasks/:id'],
      { url: `/tasks/123?performer_id=2`, as: 'RouterLink' }
    ],
    [
      '/platform/staff/tasks/123',
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123` }
    ],
    [
      '/platform/staff/tasks/123',
      ['/tasks/:id'],
      { url: `/tasks/123`, as: 'RouterLink' }
    ],
    [
      '/platform/staff/talents/123#talent_jobs',
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/talents/123#talent_jobs` }
    ],
    [
      '/platform/staff/talents/123#talent_jobs',
      ['/talents/:id'],
      { url: `/talents/123#talent_jobs`, as: 'RouterLink' }
    ],
    [
      `${SP_ORIGIN}/platform/staff/tasks/123?performer_id=2`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123?performer_id=2` }
    ],
    [
      `${SP_ORIGIN}/platform/staff/tasks/123?performer_id=2`,
      ['/tasks/:id'],
      { url: `/tasks/123?performer_id=2`, as: 'RouterLink' }
    ],
    [
      `${SP_ORIGIN}/platform/staff/tasks/123`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123` }
    ],
    [
      `${SP_ORIGIN}/platform/staff/tasks/123`,
      ['/tasks/:id'],
      { url: `/tasks/123`, as: 'RouterLink' }
    ],
    [
      `${SP_ORIGIN}/platform/staff/talents/123#talent_jobs`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/talents/123#talent_jobs` }
    ],
    [
      `${SP_ORIGIN}/platform/staff/talents/123#talent_jobs`,
      ['/talents/:id'],
      { url: `/talents/123#talent_jobs`, as: 'RouterLink' }
    ]
  ]

  const newFormatUrls: [string, string[], RouteData][] = [
    [
      '/tasks/123?performer_id=2',
      [],
      {
        url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123?performer_id=2`
      }
    ],
    [
      '/tasks/123?performer_id=2',
      ['/tasks/:id'],
      { url: `/tasks/123?performer_id=2`, as: 'RouterLink' }
    ],
    ['/tasks/123', [], { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123` }],
    ['/tasks/123', ['/tasks/:id'], { url: `/tasks/123`, as: 'RouterLink' }],
    [
      `${SP_ORIGIN}/tasks/123?performer_id=2`,
      [],
      {
        url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123?performer_id=2`
      }
    ],
    [
      `${SP_ORIGIN}/tasks/123?performer_id=2`,
      ['/tasks/:id'],
      { url: `/tasks/123?performer_id=2`, as: 'RouterLink' }
    ],
    [
      `${SP_ORIGIN}/tasks/123`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/staff/tasks/123` }
    ],
    [
      `${SP_ORIGIN}/tasks/123`,
      ['/tasks/:id'],
      { url: `/tasks/123`, as: 'RouterLink' }
    ]
  ]

  const universalUrls: [string, string[], RouteData][] = [
    [
      `${SP_ORIGIN}/platform/memos/123?performer_id=2`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123?performer_id=2` }
    ],
    [
      `${SP_ORIGIN}/platform/memos/123?performer_id=2`,
      ['/memos/:id'],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123?performer_id=2` }
    ],
    [
      `${SP_ORIGIN}/platform/memos/123`,
      ['/memos/:id'],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123` }
    ],
    [
      `${SP_ORIGIN}/platform/memos/123`,
      [],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123` }
    ],
    [
      '/platform/memos/123?performer_id=2',
      [],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123?performer_id=2` }
    ],
    [
      '/platform/memos/123?performer_id=2',
      ['/memos/:id'],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123?performer_id=2` }
    ],
    [
      '/platform/memos/123',
      ['/memos/:id'],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123` }
    ],
    [
      '/platform/memos/123',
      [],
      { url: `${PLATFORM_ORIGIN}/platform/memos/123` }
    ]
  ]

  const externalUrls: [string, string[], RouteData][] = [
    [`https://googlse.com/?q=test`, [], { url: `https://googlse.com/?q=test` }],
    [
      `${PLATFORM_ORIGIN}/resume/obfuscated_slug_test123`,
      [],
      { url: `${PLATFORM_ORIGIN}/resume/obfuscated_slug_test123` }
    ]
  ]

  /* eslint-disable */
  // prettier-ignore
  describe.each([
    ...oldFormatUrls,
    ...newFormatUrls,
    ...universalUrls,
    ...externalUrls
  ])('when url is %s and beta enabled urls list %j', (url, betaEnabledUrls, expected) => {
    test(`returns ${expected.url}`, () => {
      const allPaths = betaEnabledUrls.map(betaUrl => ({ path: betaUrl })) as Route[]

      const values = route(allPaths)(url)
      expect(values).toEqual(expected)
    })
  })

  describe('when url is a absolute url without protocol', () => {
    it('should have https appended', () => {
      const values = route([])('github.com/user')

      expect(values.url).toEqual('https://github.com/user')
    })
  })
})
