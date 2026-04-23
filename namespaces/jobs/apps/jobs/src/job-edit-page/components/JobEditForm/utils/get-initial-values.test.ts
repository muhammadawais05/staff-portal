import { JobEditFragment } from '@staff-portal/jobs'
import { Scalars } from '@staff-portal/graphql/staff'

import { getInitialValues } from './get-initial-values'

describe('#getInitialValues', () => {
  it('takes the title from the job', () => {
    const title = 'title'

    expect(getInitialValues({ title } as JobEditFragment).title).toBe(title)
  })

  it('returns startDate as is', () => {
    const startDate: Scalars['Date'] = '2022-01-01'

    const result = getInitialValues({ startDate } as JobEditFragment).startDate

    expect(result).toBe(startDate)
  })

  it('takes the vertical id from the job', () => {
    const verticalId = 'verticalId'

    expect(
      getInitialValues({ vertical: { id: verticalId } } as JobEditFragment)
        .verticalId
    ).toBe(verticalId)
  })

  describe('when job has a claimer', () => {
    it('takes the specialization id from the job', () => {
      const specializationId = 'specializationId'

      expect(
        getInitialValues({
          claimer: {},
          specialization: { id: specializationId }
        } as JobEditFragment).specializationId
      ).toBe(specializationId)
    })
  })

  describe('when job does not have a claimer', () => {
    it('does not take the specialization id from the job', () => {
      const specializationId = 'specializationId'

      expect(
        getInitialValues({
          specialization: { id: specializationId }
        } as JobEditFragment).specializationId
      ).toBeUndefined()
    })
  })
})
