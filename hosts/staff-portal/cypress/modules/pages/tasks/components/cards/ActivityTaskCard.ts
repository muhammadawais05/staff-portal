import TaskCard from './TaskCard'

class ActivityTaskCard extends TaskCard {
  get editActivityButton() {
    return this.get().findByTestId('edit-activity-button')
  }
}

export default ActivityTaskCard
