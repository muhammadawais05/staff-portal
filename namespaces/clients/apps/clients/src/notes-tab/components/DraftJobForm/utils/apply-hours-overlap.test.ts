import { JobHoursOverlap } from '@staff-portal/graphql/staff'

import { DraftJobFormFields } from '../../../enums/DraftJobFormFields'
import { applyHoursOverlap } from './apply-hours-overlap'

describe('#applyHoursOverlap', () => {
  const formData = {
    [DraftJobFormFields.VerticalId]: 'testId'
  }

  describe('should return the original data', () => {
    describe('when no hoursOverlap', () => {
      it('returns the original data', () => {
        expect(applyHoursOverlap(formData)).toStrictEqual(formData)
      })

      describe('hasPreferredHours is true', () => {
        it('returns the original data', () => {
          expect(applyHoursOverlap(formData, undefined, 'true')).toStrictEqual(
            formData
          )
        })
      })

      describe('hasPreferredHours is false', () => {
        it('returns the original data', () => {
          expect(applyHoursOverlap(formData, undefined, 'false')).toStrictEqual(
            formData
          )
        })
      })
    })
  })

  it('returns data with hoursOverlap', () => {
    expect(
      applyHoursOverlap(formData, JobHoursOverlap.HOUR_10, 'true')
    ).toStrictEqual({
      hoursOverlap: 'HOUR_10',
      ...formData
    })
  })
})
