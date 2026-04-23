import { ENTER_KEY, TAB_KEY } from '~integration/utils'

class EditTrialLengthModal {
  setComment(comment: string) {
    cy.get('#comment').type(comment)
  }

  setTrialLength(trialLength: string) {
    cy.getByTestId('TrialLengthEditModal-trial-length').click()

    cy.getByTestId('TrialLengthEdit-modal')
      .find('input:last')
      // TODO: remove { force: true } in scope of
      // https://toptal-core.atlassian.net/browse/SPB-2967
      .trigger('keydown', {
        keyCode: TAB_KEY,
        force: true
      })

    cy.get('[placeholder="Search"]').type(trialLength).trigger('keydown', {
      keyCode: ENTER_KEY
    })
  }

  submitModal() {
    cy.getByTestId('TrialLengthEditModal-submit-button').click()
  }
}

export default EditTrialLengthModal
