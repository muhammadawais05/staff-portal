import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createUserVerticalsMock } from '@staff-portal/verticals/src/mocks'

import { InternalTeamMatcherFragment } from '../../data'
import { mapMatchersToVerticals } from './map-matchers-to-verticals'

const [designerVertical, developerVertical] = createUserVerticalsMock()
const verticalsMock = [
  {
    ...designerVertical,
    name: 'Designer',
    specializations: { totalCount: 0 }
  }
]
const roleMock = {
  id: encodeEntityId('456', 'Staff'),
  fullName: 'Matcher Name',
  webResource: {
    text: 'Toptal',
    url: 'https://toptal.com'
  }
}

const createMatcherMock = (
  data?: Partial<InternalTeamMatcherFragment['node']>
): InternalTeamMatcherFragment => {
  return {
    node: {
      id: encodeEntityId('123', 'ClientMatcher'),
      role: roleMock,
      vertical: designerVertical,
      ...data
    }
  }
}

describe('mapMatchersToVerticals', () => {
  it('returns proper data', () => {
    const designerMock = createMatcherMock()
    const developerMock = createMatcherMock({ vertical: developerVertical })

    expect(mapMatchersToVerticals([])).toEqual([])
    expect(mapMatchersToVerticals([], [])).toEqual([])
    expect(mapMatchersToVerticals([], [])).toEqual([])
    expect(mapMatchersToVerticals(verticalsMock, [designerMock])).toEqual([
      {
        fullName: 'Matcher Name',
        url: 'https://toptal.com',
        verticalName: 'Designer'
      }
    ])
    expect(mapMatchersToVerticals(verticalsMock, [developerMock])).toEqual([
      {
        fullName: undefined,
        url: undefined,
        verticalName: 'Designer'
      }
    ])
  })
})
