import BasePage from './BasePage'

class QuizzesPage extends BasePage {
  visit() {
    return cy.visit('/quizzes')
  }

  getEmptyMessage() {
    return cy.getByTestId('no-search-results')
  }

  getQuestionByIndex(index: number) {
    return cy.getByTestId(`talent-quiz-question-${index}`)
  }

  getEditButtonByIndex(index: number) {
    return cy.getByTestId(`EditQuestionButton-${index}`)
  }

  getAddNewQuestionButton() {
    return cy.getByTestId('AddNewQuestionButton')
  }

  getFormInputByName(
    name:
      | 'body'
      | 'wrongAnswer'
      | 'correctAnswer'
      | 'feedback'
      | 'verticalId'
      | 'kind'
  ) {
    return cy.getByTestId(`QuizQuestionForm-${name}`)
  }

  getCloneQuestionsButton() {
    return cy.getByTestId('CloneQuestionsButton')
  }

  getFormSelectByName(name: 'originalVerticalId' | 'destinationVerticalId') {
    return cy.getByTestId(`QuizQuestionForm-${name}`).find('select')
  }

  getFormSubmitButton() {
    return cy.getByTestId('QuizQuestionForm-submit-button')
  }

  getCloneSubmitButton() {
    return cy.getByTestId('CloneQuestionsForm-submit-button')
  }

  getDropdownByRole() {
    return cy.get('[role=tooltip]')
  }
}

export default QuizzesPage
