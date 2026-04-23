import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        GetMinimumCommitmentEdit: {
          data: {
            node: pick(fixtures.MockClient, [
              '__typename',
              'id',
              'fullName',
              'commitmentSettings'
            ])
          }
        },
        SetUpdateClientCommitment: {
          data: {
            updateClientCommitment: {
              success: true,
              errors: [],
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                commitmentSettings: {
                  __typename: 'CommitmentSettings',
                  minimumHours: 0
                }
              },
              __typename: 'UpdateClientCommitmentPayload'
            }
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffBillingDetailsWidget'
    }
  })
  cy.waitForReact()
}

describe('when edit button is clicked', () => {
  before(() => {
    resetSetup()

    cy.getByTestId('MinimumCommitmentItem-minimum-commitment-edit').click()
  })

  after(() => {
    cy.getByTestId('cancel').click()
  })

  it('initial values are set properly', () => {
    cy.getByTestId('MinimumCommitmentModalForm-minimum-hours').within(() => {
      cy.get('input').should('have.value', '5')
    })
    cy.getByTestId('MinimumCommitmentModalForm-comment').within(() => {
      cy.get('textarea').first().should('have.value', '')
    })
  })
})

describe('when form is submitted', () => {
  before(() => {
    cy.getByTestId('MinimumCommitmentItem-minimum-commitment-edit').click()

    cy.selectByValue({
      field: 'MinimumCommitmentModalForm-minimum-hours',
      value: '0'
    })
    cy.getByTestId('MinimumCommitmentModalForm-comment').within(() => {
      cy.get('textarea').first().type('Comment')
    })

    cy.getByTestId('submit').click()
  })

  it('display a success message', () => {
    cy.getNotification().should(
      'contain',
      'Minimum commitment settings were successfully updated.'
    )
  })

  it('value in the table is updated', () => {
    cy.getByTestId('MinimumCommitmentItem-label').should(
      'contain',
      '0 hours per week'
    )
  })
})

describe('Failing action cases', () => {
  before(() => {
    cy.getByTestId('MinimumCommitmentItem-minimum-commitment-edit').click()
  })

  describe('when `comment` field is empty', () => {
    it('display that it is required', () => {
      cy.getByTestId('submit').click()

      cy.getFieldError('comment').should(
        'contain',
        'Please complete this field.'
      )
    })
  })
})
