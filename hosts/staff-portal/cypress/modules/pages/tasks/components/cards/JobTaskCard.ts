import TaskCard from './TaskCard'

class JobTaskCard extends TaskCard {
  get sendEngagementClientEmailButton() {
    return this.get().findByTestId('send-engagement-client-email-item')
  }

  get restorePostponedButton() {
    return this.get().findByTestId('restore-postponed-button')
  }

  get claimAndApproveJobButton() {
    return this.get().findByTestId('claim-and-approve-job-button')
  }
}

export default JobTaskCard
