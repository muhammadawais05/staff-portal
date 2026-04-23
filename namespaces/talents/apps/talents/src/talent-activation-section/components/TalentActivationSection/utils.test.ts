import { StepStatus, StepType } from '@staff-portal/graphql/staff'

import { createStep } from '../../test-utils'
import { TalentActivationStepsFragment } from '../../data/get-talent-activation'
import { ActivationStatus } from '../../types'
import { getTalentActivationData } from './utils'

const defaultOptions = {
  isProfileCreationStepFinished: true
}

const arrangeTest = ({ isProfileCreationStepFinished } = defaultOptions) => ({
  talent: {
    activation: {
      id: 'ActivationId',
      status: ActivationStatus.InProgress,
      steps: {
        nodes: [
          createStep({
            type: StepType.PROFILE_CREATION,
            status: isProfileCreationStepFinished
              ? StepStatus.FINISHED
              : StepStatus.PENDING_APPLICANT_ACTION
          })
        ]
      }
    }
  } as TalentActivationStepsFragment
})

describe('getTalentActivationData', () => {
  it('returns profile creation step finished', () => {
    const { talent } = arrangeTest()
    const { isProfileCreationStepFinished } = getTalentActivationData(talent)

    expect(isProfileCreationStepFinished).toBeTruthy()
  })

  describe('when `isProfileCreationStepFinished` is `false`', () => {
    it('returns profile creation step finished', () => {
      const { talent } = arrangeTest({
        ...defaultOptions,
        isProfileCreationStepFinished: false
      })
      const { isProfileCreationStepFinished } = getTalentActivationData(talent)

      expect(isProfileCreationStepFinished).toBeFalsy()
    })
  })
})
