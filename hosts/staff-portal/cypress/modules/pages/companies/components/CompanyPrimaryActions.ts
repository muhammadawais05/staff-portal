class CompanyPrimaryActions {
  get primaryActions() {
    return cy.getByTestId('company-profile-primary-actions')
  }

  get initialClaimEmailButton() {
    return this.primaryActions.findByTestId('initial-claim-email-button')
  }

  get repauseCompanyButton() {
    return this.primaryActions.findByTestId('repause-company-item')
  }

  get resumeCompanyButton() {
    return this.primaryActions.findByTestId('resume-company-item')
  }

  get restoreCompanyFromBlackFlagButton() {
    return this.primaryActions.findByTestId(
      'restore-company-from-black-flag-button'
    )
  }

  get restoreApplication() {
    return this.primaryActions.findByTestId('restore-application')
  }

  get requestEngagementsPauseButton() {
    return this.primaryActions.findByTestId('request-engagements-pause-button')
  }

  get openEnableTopscreenModalButton() {
    return this.primaryActions.findByTestId('open-enable-topcreen-modal-button')
  }

  get checkComplianceButton() {
    return this.primaryActions.findByTestId('check-client-compliance-button')
  }
}

export default CompanyPrimaryActions
