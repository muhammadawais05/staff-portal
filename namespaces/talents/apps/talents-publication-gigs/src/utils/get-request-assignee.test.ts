import { GigParticipationType } from '@staff-portal/graphql/staff'

import { getRequestAssignee } from './'

const getSlackWorkspaces = (
  participationType = GigParticipationType.FULFILLER
) => [
  {
    channelUrl: 'slack://channel?team=T02856HKHFS&id=C035G1NABB7',
    id: 'VjEtU2xhY2tXb3Jrc3BhY2UtMTI',
    participations: {
      nodes: [
        {
          id: 'VjEtR2lnUGFydGljaXBhdGlvbi0zMC1GVUxGSUxMRVItMTMxNTgzOQ',
          participationType,
          role: {
            fullName: 'Jenine Lueilwitz',
            id: 'VjEtVGFsZW50LTEzMTU4Mzk',
            timeZone: {
              name: '(UTC+03:00) Asia - Istanbul',
              value: 'Asia/Istanbul'
            },
            webResource: {
              text: 'Jenine Lueilwitz',
              url: 'https://staging.toptal.net/platform/staff/talents/1315839'
            }
          }
        }
      ]
    }
  }
]

describe('GetRequestAssigee', () => {
  it('returns undefined when reach outs is empy', () => {
    expect(getRequestAssignee([])).toBeUndefined()
  })

  it('returns undefined when there is no fullfiler', () => {
    expect(
      getRequestAssignee(getSlackWorkspaces(GigParticipationType.CLAIMER))
    ).toBeUndefined()
  })

  it('returns fulfiller when one exists', () => {
    expect(getRequestAssignee(getSlackWorkspaces())).toMatchObject({
      fullName: 'Jenine Lueilwitz',
      id: 'VjEtVGFsZW50LTEzMTU4Mzk',
      webResource: {
        text: 'Jenine Lueilwitz',
        url: 'https://staging.toptal.net/platform/staff/talents/1315839'
      }
    })
  })
})
