import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { updateTalentPaymentsStubs } from '~integration/mocks/schema-updates/talents'
import { FormModal } from '~integration/modules/modals'
import {
  CreateHoldPaymentsModal,
  PaymentHistoryModal
} from '~integration/modules/pages/talents/components'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { daysFromNow } from '~integration/utils'

describe('Talent More Actions > Payments', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions
  const holdPaymentsModal = new CreateHoldPaymentsModal()
  const paymentHistoryModal = new PaymentHistoryModal()
  const removePaymentsHoldModal = new FormModal()

  describe('Hold Payment > Automatic', () => {
    it('submits the form and display notification', () => {
      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          createPaymentHold: enabledOperationMock()
        })
      })

      page.visit()
      page.moreActionsButton.click()
      actions.holdPayments.click()

      holdPaymentsModal.expirationTypeByAmountRadio.click()
      holdPaymentsModal.expireAtThresholdField.type('1')
      holdPaymentsModal.commentField.type('a')

      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          removePaymentHold: enabledOperationMock()
        })
      })

      holdPaymentsModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'The Payments were successfully put on hold.')
        .find('button')
        .click()

      page.moreActionsButton.click()
      actions.removeHoldOnPayment.should('exist')
    })
  })

  describe('Remove Hold Payments', () => {
    it('submits the form and display notification', () => {
      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          removePaymentHold: enabledOperationMock()
        })
      })

      actions.removeHoldOnPayment.click()

      removePaymentsHoldModal.comment.type('a')

      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          createPaymentHold: enabledOperationMock()
        })
      })

      removePaymentsHoldModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'The Payments Hold was successfully released.')
        .find('button')
        .click()

      page.moreActionsButton.click()
      actions.holdPayments.should('exist')
    })
  })

  describe('Hold Payments > Manual', () => {
    it('submits the form and display notification', () => {
      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          createPaymentHold: enabledOperationMock()
        })
      })

      actions.holdPayments.click()

      holdPaymentsModal.manualTab.click()
      holdPaymentsModal.commentField.type('a')

      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          removePaymentHold: enabledOperationMock(),
          downloadRolePaymentHistory: enabledOperationMock()
        })
      })

      holdPaymentsModal.submitButton.click()

      cy.getNotification()
        .should('have.text', 'The Payments were successfully put on hold.')
        .find('button')
        .click()

      page.moreActionsButton.click()
      actions.removeHoldOnPayment.should('exist')
      actions.paymentHistory.should('exist')
    })
  })

  describe('Payment history', () => {
    it('submits the form and display notification', () => {
      updateTalentPaymentsStubs({
        operations: getTalentOperations({
          removePaymentHold: enabledOperationMock(),
          downloadRolePaymentHistory: enabledOperationMock()
        })
      })

      actions.paymentHistory.click()

      paymentHistoryModal.startDate.clear().type(daysFromNow(7)).blur()
      paymentHistoryModal.endDate.clear().type(daysFromNow(8)).blur()

      cy.intercept('https://toptal.com/payment-history', {
        statusCode: 200,
        body: undefined
      }).as('paymentHistory')

      paymentHistoryModal.submitButton.click()

      cy.url().should('eq', 'https://toptal.com/payment-history')
    })
  })
})
