import { TalentQuizQuestionFragment } from '@staff-portal/quizzes-app'

import { QuizzesPage } from '~integration/modules/pages'
import { quizzesMock } from '~integration/mocks'
import {
  updateCreateQuestionMocks,
  updateEditQuestionMocks,
  updateCloneQuestionsMock
} from '~integration/mocks/schema-updates/quizzes'

const getStaffMocks = (quizzes: TalentQuizQuestionFragment[]) => ({
  TalentQuizQuestionConnection: {
    totalCount: () => quizzes.length,
    nodes: () => quizzes
  }
})

describe('Quizzes list page', () => {
  describe('No quizzes', () => {
    const page = new QuizzesPage()

    beforeEach(() => {
      cy.updateStaffMocks(getStaffMocks([]))

      page.visit()
    })

    it('renders empty message', () => {
      page
        .getEmptyMessage()
        .should('exist')
        .should('contain', 'No quizzes found')
    })
  })

  describe('Quizzes list', () => {
    const page = new QuizzesPage()

    beforeEach(() => {
      cy.updateStaffMocks(getStaffMocks(quizzesMock))

      page.visit()
    })

    it('renders quizzes in a list, when quizzes available', () => {
      page
        .getQuestionByIndex(1)
        .should('exist')
        .should(
          'contain',
          'Should I ever speak about rates with my Toptal client?'
        )

      page
        .getQuestionByIndex(2)
        .should('exist')
        .should(
          'contain',
          'Who should I contact if I get stuck on a problem or have an issue with my engagement, an interview, or anything related to my client?'
        )
    })

    it('creates new question, when operation is available', () => {
      updateCreateQuestionMocks()

      page.getAddNewQuestionButton().click()

      page.getFormInputByName('body').type('Some text')
      page.getFormInputByName('wrongAnswer').type('Some text')
      page.getFormInputByName('correctAnswer').type('Some text')
      page.getFormInputByName('feedback').type('Some text')
      page.getFormInputByName('verticalId').click()
      page.getDropdownByRole().first().click()
      page.getFormInputByName('kind').click()
      page.getDropdownByRole().first().click()

      page.getFormSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'The question was successfully added.'
      )
    })

    it('edits question, when operation is available', () => {
      updateEditQuestionMocks()

      page.getEditButtonByIndex(1).click()

      page.getFormInputByName('body').type('Some text')
      page.getFormInputByName('wrongAnswer').type('Some text')
      page.getFormInputByName('correctAnswer').type('Some text')
      page.getFormInputByName('feedback').type('Some text')
      page.getFormInputByName('verticalId').click()
      page.getDropdownByRole().first().click()
      page.getFormInputByName('kind').click()
      page.getDropdownByRole().first().click()

      page.getFormSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'The question was successfully updated.'
      )
    })

    // eslint-disable-next-line
    it.skip('successfully clones quizzes', () => {
      updateCloneQuestionsMock()

      page.getCloneQuestionsButton().click()
      page.getFormSelectByName('originalVerticalId').select('Developer')
      page.getFormSelectByName('destinationVerticalId').select('TopScreen')
      page.getCloneSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'Questions were successfully cloned.'
      )
    })
  })
})
