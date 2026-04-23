import { AnyObject } from '@toptal/picasso-forms'
import fixtures from '@staff-portal/billing/src/_fixtures'

/// <reference types="cypress" />

const setUpServer = (mockData: AnyObject) => {
  cy.mockGraphQL((operationName: string) => {
    switch (operationName) {
      case 'GetEngagement':
        return {
          mockResult: {
            data: {
              node: mockData
            }
          }
        }

      case 'GetExperiments':
        return {
          mockResult: {
            data: {
              experiments: {
                __typename: 'Experiments'
              }
            }
          }
        }
      default:
        return {}
    }
  })
}

describe('Handle data loading variations', () => {
  describe('Restore modals', () => {
    describe('from new url structure', () => {
      beforeEach(() => {
        setUpServer(fixtures.MockEngagement)
        cy.visit('/?modal=commitment-change&engagement_id=171608', {
          onBeforeLoad: contentWindow => {
            contentWindow.DATA_WIDGET = 'StaffJobPage'
            contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
            contentWindow.DATA_ROLE = 'staff'
            contentWindow.DATA_MODALS_ONLY = true
          }
        })
        cy.waitForReact()
      })

      it('Modal exist', () => {
        cy.get('[data-testid=CommitmentChangeModalForm-job-title]').should(
          'contain',
          'Facemoji Keyboard Designer'
        )
      })
    })
  })

  describe('Permission issue', () => {
    beforeEach(() => {
      const mockData = {
        ...fixtures.MockEngagement,
        operations: {
          __typename: 'EngagementOperations',
          changeEngagementCommitment: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          changeProductBillingFrequency: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          }
        }
      }

      setUpServer(mockData)
      cy.visit('/?modal=commitment-change&engagement_id=171608', {
        onBeforeLoad: contentWindow => {
          contentWindow.DATA_WIDGET = 'StaffJobPage'
          contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
          contentWindow.DATA_ROLE = 'staff'
          contentWindow.DATA_MODALS_ONLY = true
        }
      })
      cy.waitForReact()
    })

    it('Modal should render a warning', () => {
      cy.getByTestId('AlertModal-title').should('contain', 'Change Commitment')
      cy.getByTestId('AlertModal-text').should(
        'contain',
        'This action is not available.'
      )
      cy.getByTestId('cancel').click()
      cy.url().should('eq', 'http://localhost:3032/')
    })
  })
})
