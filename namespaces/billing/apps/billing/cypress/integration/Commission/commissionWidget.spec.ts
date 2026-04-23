import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses, {
  role
} from '../../support/defaultResponse/commissionDefault'
import setupServer from '../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffCommissionWidget'
    }
  })
  cy.waitForReact()
}

describe('CommissionWidget', () => {
  describe('Main functionality', () => {
    before(() => {
      resetSetup({
        GetCommission: {
          data: {
            node: {
              ...fixtures.MockGetCommission,
              commissionReceiver: null
            }
          }
        }
      })
    })

    describe('Change Claimer Modal', () => {
      before(() => {
        cy.getByTestId('CommissionContentItemWithAction-claimer_action').click()
      })

      it('displays information that the field to change claimer is required', () => {
        cy.getByTestId('submit').click()

        cy.getByTestId('ClaimerUpdateModalForm-claimerId').should(
          'contain',
          'Please complete this field.'
        )
      })

      it('when claimer changes, success message is displayed', () => {
        cy.selectByValue({
          field: 'ClaimerUpdateModalForm-claimerId',
          value: 'VjEtU3RhZmYtMTUxODEyOQ'
        })
        cy.getByTestId('ClaimerUpdateModalForm-comment')
          .get('textarea')
          .first()
          .type('This is a comment')

        cy.getByTestId('submit').click()

        cy.getNotification().should(
          'contain',
          'The Claimer was successfully changed.'
        )
      })

      it('a modal to change business type appears', () => {
        cy.getByTestId('ModalsState-clientBusinessTypeUpdate').should('exist')
      })

      it('initial value for business type is set properly', () => {
        cy.getByTestId('ClientBusinessTypeUpdateModalForm-businessType')
          .find('input')
          .should('have.value', 'Small business')
      })

      it('displays information that the field to change business type is required', () => {
        cy.getByTestId('ClientBusinessTypeUpdateModalForm-businessType')
          .find('[data-testid="reset-adornment"]')
          .find('button')
          .click({ force: true })

        cy.getByTestId('submit').click()

        cy.getByTestId('ClientBusinessTypeUpdateModalForm-businessType').should(
          'contain',
          'Please complete this field.'
        )
      })

      it('when business type changes, success message is displayed', () => {
        cy.selectByValue({
          field: 'ClientBusinessTypeUpdateModalForm-businessType',
          value: 'NON_PROFIT'
        })

        cy.getByTestId('submit').click()

        cy.getNotification().should(
          'contain',
          'The Business Type was successfully changed.'
        )
      })

      it('modals are closed', () => {
        cy.getByTestId('ModalsState-claimerUpdate').should('not.exist')
        cy.getByTestId('ModalsState-clientBusinessTypeUpdate').should(
          'not.exist'
        )
      })

      it(`claimer's name, in the detailed list, is updated`, () => {
        cy.getByTestId('CommissionContentItemWithAction-claimer_link').should(
          'contain',
          'Michal Raček'
        )
      })

      describe('when business type of company is the same as business type of a claimer', () => {
        it('a modal to change business type does not appear', () => {
          resetSetup({
            GetCommission: {
              data: {
                node: {
                  ...fixtures.MockGetCommission,
                  commissionReceiver: null
                }
              }
            },
            SetUpdateClientClaimer: {
              data: {
                updateClientClaimer: {
                  success: true,
                  errors: [],
                  client: {
                    id: 'VjEtQ2xpZW50LTUxMTg2MA',
                    claimer: role,
                    __typename: 'Client'
                  },
                  nextActionPerformable: false,
                  __typename: 'UpdateClientClaimerPayload'
                }
              }
            }
          })

          cy.getByTestId(
            'CommissionContentItemWithAction-claimer_action'
          ).click()

          cy.selectByValue({
            field: 'ClaimerUpdateModalForm-claimerId',
            value: 'VjEtU3RhZmYtMTUxODEyOQ'
          })

          cy.getByTestId('submit').click()

          cy.getByTestId('ModalsState-clientBusinessTypeUpdate').should(
            'not.exist'
          )
        })
      })
    })

    describe('Change Referrer Modal', () => {
      before(() => {
        cy.clock()
        cy.getByTestId('CommissionContentItemWithAction-referrer_action').click(
          { force: true }
        )

        cy.getByTestId('ChangeRoleReferrerModalFormAutocomplete')
          .click()
          .type('T')
          .tick(500)
          .getByTestId('ChangeRoleReferrerModalFormAutocomplete')
          .type('{enter}')
          .tick(500)

        cy.getByTestId('ChangeRoleReferrerModalForm-comment')
          .get('textarea')
          .first()
          .type('This is a comment')

        cy.getByTestId('ChangeRoleReferrerModalForm-submit').click()
      })

      it('success message is displayed', () => {
        cy.getNotification().should(
          'contain',
          'The referrer has been successfully changed.'
        )
      })

      it('the modal is closed', () => {
        cy.getByTestId('ModalsState-changeRoleReferrer').should('not.exist')
      })
    })

    describe('when commission receiver is present', () => {
      it('does not display a claimer', () => {
        resetSetup()

        cy.getByTestId('item-field: Claimer').should('not.exist')
      })
    })
  })
})
