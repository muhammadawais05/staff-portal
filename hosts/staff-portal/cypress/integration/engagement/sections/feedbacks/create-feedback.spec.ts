import { Engagement } from '~integration/modules/pages/engagements'
import { updateCreateFeedbackStubs } from '~integration/mocks/schema-updates/engagement'
import { ENTER_KEY } from '~integration/utils'

describe('Engagement page -> Feedbacks -> Create Feedback', () => {
  const page = new Engagement()
  const {
    feedbacksSection: {
      clientFeedback: clientFeedbackSection,
      matcherFeedback: matcherFeedbackSection
    }
  } = page

  it('creates client and matcher feedbacks', () => {
    // Create Client Feedback
    updateCreateFeedbackStubs()

    page.visit()

    clientFeedbackSection.getCreateFeedbackButton().click()
    clientFeedbackSection.getCopyLinkButton().realClick()

    cy.getNotification().should('have.text', 'Copied to clipboard.')
    cy.getNotification().find('button').click()

    clientFeedbackSection
      .getQuestionCheckbox(0)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    clientFeedbackSection
      .getQuestionCheckbox(1)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    clientFeedbackSection
      .getQuestionCheckbox(2)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    clientFeedbackSection
      .getQuestionCheckbox(3)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    clientFeedbackSection.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Client Feedback was successfully created.'
    )
    cy.getNotification().find('button').click()

    // Create Matcher Feedback
    matcherFeedbackSection.getCreateFeedbackButton().click()

    matcherFeedbackSection
      .getQuestionCheckbox(0)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    matcherFeedbackSection
      .getQuestionCheckbox(2)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    matcherFeedbackSection
      .getQuestionCheckbox(3)
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    matcherFeedbackSection.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Matcher Feedback was successfully created.'
    )
  })
})
