import BasePage from './BasePage'

class MeetingsPage extends BasePage {
  visit() {
    return cy.visit('/meetings')
  }

  getEmptyMessage() {
    return cy.getByTestId('NoMeetingsMessage')
  }
}

export default MeetingsPage
