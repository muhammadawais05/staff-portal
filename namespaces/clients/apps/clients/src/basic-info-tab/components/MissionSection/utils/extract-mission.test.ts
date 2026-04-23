import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import extractMission from './extract-mission'
import { GetClientMissionAndOperationQuery } from '../data'

const getDataMock = (props?: {
  mission?: string | null
}): GetClientMissionAndOperationQuery => ({
  node: {
    id: 'id',
    mission: props?.mission,
    operations: {
      patchClientProfile: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  }
})

describe('extractMission', () => {
  describe('when has no data', () => {
    it.each([
      getDataMock({
        mission: undefined
      }),
      getDataMock({
        mission: null
      }),
      undefined
    ])('returns an empty string', data => {
      const value = extractMission(data)

      expect(value).toBe('')
    })
  })

  it('return client.mission', () => {
    const mission = 'mission'
    const data = getDataMock({ mission })

    const value = extractMission(data)

    expect(value).toBe(mission)
  })
})
