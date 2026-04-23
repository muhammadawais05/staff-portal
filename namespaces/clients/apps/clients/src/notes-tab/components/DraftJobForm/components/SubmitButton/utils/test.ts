import { loadingState, disabledState } from '.'

describe('Managing of DraftJobForm submit buttons states', () => {
  describe('when not submitting', () => {
    const submitting = false

    describe('when action and currentAction are equal', () => {
      const action = 'saveDraftJob'
      const currentAction = 'saveDraftJob'

      it('is not loading', () => {
        expect(loadingState(action, currentAction, submitting)).toBeFalsy()
      })

      it('is not disabled', () => {
        expect(disabledState(action, currentAction, submitting)).toBeFalsy()
      })
    })
  })

  describe('when submitting', () => {
    const submitting = true

    describe('when action and currentAction are equal', () => {
      const action = 'saveDraftJob'
      const currentAction = 'saveDraftJob'

      it('is loading', () => {
        expect(loadingState(action, currentAction, submitting)).toBeTruthy()
      })

      it('is not disabled', () => {
        expect(disabledState(action, currentAction, submitting)).toBeFalsy()
      })
    })

    describe('when action and currentAction are not equal', () => {
      const action = 'saveDraftJob'
      const currentAction = 'saveDraftJobAndApprove'

      it('is not loading', () => {
        expect(loadingState(action, currentAction, submitting)).toBeFalsy()
      })

      it('is disabled', () => {
        expect(disabledState(action, currentAction, submitting)).toBeTruthy()
      })
    })
  })
})
