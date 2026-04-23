import TaskCard from './TaskCard'

class DetailsTaskCard extends TaskCard {
  get scheduleTaskNextCheckButton() {
    return this.get().findByTestId('schedule-task-next-check-button')
  }

  get disputeTaskButton() {
    return this.get().findByTestId('dispute-task-button')
  }

  get cancelTaskButton() {
    return this.get().findByTestId('delete-task-button')
  }

  get cancelTaskSubmitButton() {
    return cy.getByTestId('delete-task-prompt-submit-button')
  }

  get cancelDisputeButton() {
    return this.get().findByTestId('cancel-dispute-button')
  }

  get taskCommentInput() {
    return this.get().findByTestId('task-comment')
  }

  get taskCommentSubmitButton() {
    return this.get().findByTestId('submit-comment')
  }
}

export default DetailsTaskCard
