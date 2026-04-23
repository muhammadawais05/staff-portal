import { StepType } from '@staff-portal/graphql/staff'

import { createStep } from '../../test-utils'
import { getNeedsToptalEmail } from '../get-needs-toptal-email'

const allStepsTypes = Object.keys(StepType) as StepType[]

describe('getNeedsToptalEmail', () => {
  it('returns true only for Toptal Email step', () => {
    allStepsTypes.forEach(type => {
      const result = getNeedsToptalEmail(createStep({ type }))

      if (type === StepType.TOPTAL_EMAIL) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toBe(true)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toBe(false)
      }
    })
  })
})
