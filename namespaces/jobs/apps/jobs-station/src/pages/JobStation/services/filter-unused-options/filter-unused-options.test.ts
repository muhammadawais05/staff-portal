import { CumulativeJobStatus } from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'

import { filterUnusedOptions } from './filter-unused-options'
import { PostedAtRadioOptionValues } from '../../types'

describe('JobList utils test', () => {
  describe('filter unused options', () => {
    it('should filter posted_at_range if not a custom mode', () => {
      const patams = {
        posted_at: [PostedAtRadioOptionValues.LAST_14_DAYS],
        posted_at_range: {}
      } as QueryParams

      const filtered = filterUnusedOptions(patams)

      expect(filtered).not.toHaveProperty('posted_at_range')
    })

    it('should filter pending_talent_status if not a pendingTalent mode', () => {
      const patams = {
        cumulative_statuses: [CumulativeJobStatus.ACTIVE],
        pending_talent_status: {}
      } as QueryParams

      const filtered = filterUnusedOptions(patams)

      expect(filtered).not.toHaveProperty('pending_talent_status')
    })

    it('should not filter for sub the sub section modes', () => {
      const patams = {
        cumulative_statuses: [
          CumulativeJobStatus.PENDING_ENGINEER.toLocaleLowerCase()
        ],
        posted_at: [PostedAtRadioOptionValues.CUSTOM],
        posted_at_range: {},
        pending_talent_status: {}
      } as QueryParams

      const filtered = filterUnusedOptions(patams)

      expect(filtered).toHaveProperty('posted_at_range')
      expect(filtered).toHaveProperty('pending_talent_status')
    })
  })
})
