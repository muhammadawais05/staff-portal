import fixtures from '@staff-portal/billing/src/_fixtures'

/// <reference types="cypress" />

const setupServer = (customMutationResponse = {}) => {
  cy.mockGraphQL((operationName: string) => {
    switch (operationName) {
      case 'GetEngagement':
        return {
          mockResult: {
            data: {
              node: fixtures.MockEngagement
            }
          }
        }

      case 'SetChangeCommitment':
        return {
          mockResult: {
            data: {
              changeEngagementCommitment: {
                __typename: 'ChangeEngagementCommitmentPayload',
                engagement: fixtures.MockEngagement,
                errors: [],
                success: true,
                ...customMutationResponse
              }
            }
          }
        }

      default:
        return {}
    }
  })
}

const resetSetup = (customMutationResponse = {}) => {
  const now = new Date(2020, 1, 12).getTime()

  cy.clock(now)
  setupServer(customMutationResponse)
  cy.visit('/?engagement_id=171608&modal=commitment-change', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffJobPage'
      contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      contentWindow.DATA_ROLE = 'staff'
      contentWindow.DATA_MODALS_ONLY = true
    }
  })
  cy.waitForReact()
}

describe('Commitment Change - Modal', () => {
  before(() => {
    resetSetup()
  })

  describe('when `operation` is enabled', () => {
    it('General flow', () => {
      cy.getByTestId('CommitmentChangeModalForm-job-title').contains(
        'Facemoji Keyboard Designer'
      )

      cy.getByTestId('talent-hourly-rate').focus().clear().type('250').blur()

      cy.getByTestId('company-hourly-rate').focus().clear().type('300').blur()

      cy.getByTestId('talent-partTime-rate').focus().clear().type('354').blur()

      cy.getByTestId('company-partTime-rate').focus().clear().type('400').blur()

      cy.getByTestId('talent-fullTime-rate').focus().clear().type('450').blur()

      cy.getByTestId('company-fullTime-rate').focus().clear().type('500').blur()

      cy.getByTestId('notifyTalent').click()

      cy.getByTestId('notifyCompany').click()

      cy.getByTestId('submit').click()
      cy.get('#react_notification').contains(
        'The Commitment was successfully changed.'
      )
    })
  })

  describe('when engagement is active and DTU new experience is enabled', () => {
    before(() => {
      resetSetup({})
    })

    it('updates values correctly when changing rate method and markup', () => {
      cy.getByTestId('rateMethod').click()
      cy.contains('Override using markup/discount values').click({
        force: true
      })
      cy.getByTestId('markup').should('have.value', 1)

      cy.getByTestId('rateMethod').click()
      cy.contains('Default').click({ force: true })

      cy.getByTestId('markup').should('have.value', 10)
      cy.getByTestId('company-hourly-rate').should('have.value', '19.00')

      cy.getByTestId('rateMethod').click()
      cy.contains('Override using custom values').click({ force: true })

      cy.getByTestId('rateMethod').click()
      cy.contains('Default').click({ force: true })
      cy.getByTestId('company-hourly-rate').should('have.value', '19.00')
      cy.getByTestId('partTime-discount').should('have.value', '10')
      cy.getByTestId('fullTime-discount').should('have.value', '20')
    })
  })

  describe('when submission has been failed', () => {
    beforeEach(() => {
      resetSetup({
        engagement: {
          __typename: 'Engagement',
          id: 'VjEtSW52b2ljZS0zODA2MDA'
        },
        errors: [
          {
            __typename: 'UserError',
            code: 'exampleCode',
            key: 'base',
            message: ['Example form level error']
          },
          {
            __typename: 'UserError',
            code: 'exampleCode',
            key: 'commitment',
            message: ['Commitment is not nice']
          }
        ],
        success: false
      })
    })

    it('verify the behaviour', () => {
      cy.getByTestId('submit').click()
      cy.getByTestId('FormBaseErrorContainer-error').contains(
        'Example form level error'
      )
      cy.getByTestId('commitment-error').contains('Commitment is not nice')
    })
  })
})
