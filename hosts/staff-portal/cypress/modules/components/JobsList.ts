class JobsList {
  get moreButtons() {
    return cy.getByTestId('more-button')
  }

  get deleteJobMenuItem() {
    return cy.getByTestId('job-action-item-delete')
  }

  get postponeJobMenuItem() {
    return cy.getByTestId('job-action-item-postpone')
  }

  get sendAwayJobMenuItem() {
    return cy.getByTestId('job-action-item-send-away')
  }

  get restorePostponeJobMenuItem() {
    return cy.getByTestId('job-action-item-restore-postpone')
  }

  get restoreSendAwayJobMenuItem() {
    return cy.getByTestId('job-action-item-restore-send-away')
  }

  get cancelInterviewMenuItem() {
    return cy.getByTestId('cancel-interview')
  }

  get expireEngagementMenuItem() {
    return cy.getByTestId('expire-engagement-item')
  }
}

export default JobsList
