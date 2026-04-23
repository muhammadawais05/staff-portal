export default class TalentMoreActions {
  get requestAvailabilityMenuOption() {
    return cy.getByTestId('actions-dropdown-modal-item-RequestAvailability')
  }

  get deactivateTalentMenuOption() {
    return cy.getByTestId('actions-dropdown-modal-item-DeactivateDeveloper')
  }

  get reactivateTalentMenuOption() {
    return cy.getByTestId('actions-dropdown-modal-item-RestoreDeveloper')
  }

  get pauseApplication() {
    return cy.getByTestId('actions-dropdown-modal-item-PauseApplication')
  }

  get resetApplication() {
    return cy.getByTestId('actions-dropdown-menu-item-ResetApplication')
  }

  get rejectApplication() {
    return cy.getByTestId('actions-dropdown-modal-item-RejectApplication')
  }

  get convertToSourcingFlow() {
    return cy.getByTestId('actions-dropdown-modal-item-ConverttoSourcingFlow')
  }

  get convertTalent() {
    return cy.getByTestId('actions-dropdown-lazy-operation-convertTalent')
  }

  get convertOnboardingTalent() {
    return cy.getByTestId(
      'actions-dropdown-lazy-operation-convertOnboardingTalent'
    )
  }

  get holdPayments() {
    return cy.getByTestId('actions-dropdown-modal-item-HoldPayments')
  }

  get removeHoldOnPayment() {
    return cy.getByTestId('actions-dropdown-modal-item-RemoveHoldonPayments')
  }

  get paymentHistory() {
    return cy.getByTestId('actions-dropdown-modal-item-PaymentHistory')
  }

  get talentHealthStatus() {
    return cy.getByTestId(
      'actions-dropdown-lazy-operation-setHealthStatusTalent'
    )
  }

  get importContract() {
    return cy.getByTestId('actions-dropdown-modal-item-ImportContract')
  }

  get gdprRemoveData() {
    return cy.getByTestId('actions-dropdown-modal-item-GDPRRemoveData')
  }

  get applyToDifferentVertical() {
    return cy.getByTestId(
      'actions-dropdown-lazy-operation-applyTalentToAnotherVertical'
    )
  }
}
