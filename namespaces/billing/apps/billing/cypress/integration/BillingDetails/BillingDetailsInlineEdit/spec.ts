import { pick } from 'lodash-es'
import {
  ClientCollectionSpeed,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        UpdateBillingNotes: {
          data: {
            updateBillingNotes: {
              success: true,
              errors: [],
              notice: null,
              roleOrClient: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                billingNotes: 'test'
              },
              __typename: 'UpdateBillingNotesPayload'
            }
          }
        },
        GetExperiments: {},
        SetUpdateClientNetTerms: {
          data: {
            updateClientNetTerms: {
              success: true,
              errors: [],
              notice: null,
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                netTerms: 0
              },
              __typename: 'UpdateBillingNotesPayload'
            }
          }
        },
        SetUpdateClientNotifyAboutNewInvoices: {
          data: {
            updateClientNotifyAboutNewInvoices: {
              success: true,
              errors: [],
              notice: null,
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                notifyAboutNewInvoices: false
              },
              __typename: 'UpdateClientNotifyAboutNewInvoicesPayload'
            }
          }
        },
        SetUpdateClientAutoAllocateMemos: {
          data: {
            updateClientAutoAllocateMemos: {
              success: true,
              errors: [],
              notice: null,
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                autoAllocateMemos: false
              },
              __typename: 'UpdateClientNotifyAboutNewInvoicesPayload'
            }
          }
        },
        SetUpdateClientAttachTimesheetsToInvoices: {
          data: {
            updateClientAttachTimesheetsToInvoices: {
              success: true,
              errors: [],
              notice: null,
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                attachTimesheetsToInvoices: false
              },
              __typename: 'UpdateClientNotifyAboutNewInvoicesPayload'
            }
          }
        },
        SetUpdateClientInvestmentGrade: {
          data: {
            updateClientInvestmentGrade: {
              success: true,
              errors: [],
              notice: null,
              client: {
                ...pick(fixtures.MockClient, ['__typename', 'id']),
                investmentGrade: false
              },
              __typename: 'UpdateClientNotifyAboutNewInvoicesPayload'
            }
          }
        },
        SetUpdateClientCollectionSpeed: {
          data: {
            updateClientCollectionSpeed: {
              errors: [],
              success: true,
              client: {
                id: fixtures.MockClient.id,
                collectionSpeed: ClientCollectionSpeed.STANDARD,
                __typename: 'Client'
              },
              __typename: 'UpdateClientCollectionSpeedPayload'
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

describe('when operations for editing are enabled', () => {
  beforeEach(resetSetup)

  describe('when the cancel button is clicked while editing a Notes field', () => {
    it('does not save a typed value', () => {
      cy.getByTestId('EditableField-toggle-button-billingNotes').click()
      cy.getByTestId('EditableTextarea-input').within(() => {
        cy.get('textarea').first().clear().type('test')
      })
      cy.getByTestId('EditableField-billingNotes-editor-cancel').click()

      cy.getByTestId('EditableField-billingNotes').should(
        'contain.text',
        ' This  is  a  short  note.      With  multiline  render. '
      )
    })
  })

  describe('when value is entered in notes', () => {
    it('saves the entered value', () => {
      cy.getByTestId('EditableField-toggle-button-billingNotes').click()

      const billingNotes = 'test'

      cy.getByTestId('EditableTextarea-input').within(() => {
        cy.get('textarea').first().clear().type(billingNotes)
      })

      cy.getByTestId('EditableField-billingNotes-editor-submit').click()

      cy.getByTestId('EditableField-billingNotes').should(
        'contain.text',
        billingNotes
      )
    })
  })

  describe('when the esc key is pressed while editing a Net Terms field', () => {
    it('does not save a typed value', () => {
      cy.getByTestId('NetTermsItem').within(() => {
        cy.getByTestId('EditableField-toggle-button-netTerms').click()
        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').clear().type('0').type('{esc}')
        })

        cy.getByTestId('NetTermsItem-label').should('contain', 'Net 10')
      })
    })
  })

  describe('when clicking outside while editing the Net Terms field', () => {
    it('does not save a typed value', () => {
      cy.getByTestId('item-field: Net terms').within(() => {
        cy.getByTestId('EditableField-toggle-button-netTerms').click()
        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').should('have.focus')
        })
        cy.getByTestId('item-field-label').click()
        cy.getByTestId('NetTermsItem-label').should('contain', 'Net 10')
      })
    })
  })

  describe('when 0 (zero) is entered in Net Terms field', () => {
    it('saves the entered value', () => {
      resetSetup({
        GetClientBillingDetails: {
          data: {
            node: {
              ...defaultResponses.GetClientBillingDetails.data.node,
              netTerms: 0
            },
            viewer: {
              permits: { canManageBillingOptions: true }
            }
          }
        }
      })

      cy.getByTestId('NetTermsItem').within(() => {
        cy.getByTestId('NetTermsItem-label').should('contain', 'Upon Receipt')
      })
    })
  })

  describe('when no values in Net Terms', () => {
    it('shows validation message', () => {
      cy.getByTestId('NetTermsItem').within(() => {
        cy.getByTestId('EditableField-toggle-button-netTerms')
          .scrollIntoView()
          .click({ force: true })
        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').clear().blur()
        })

        cy.getByTestId('NetTermsItem-input').should(
          'contain',
          'Please complete this field.'
        )

        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').type('{esc}')
        })
      })
    })
  })

  describe('when dot (.) entered in Net Terms', () => {
    it('shows validation message', () => {
      cy.getByTestId('NetTermsItem').within(() => {
        cy.getByTestId('EditableField-toggle-button-netTerms')
          .scrollIntoView()
          .click({ force: true })
        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').clear().type('.').type('{enter}')
        })

        cy.getByTestId('NetTermsItem-input').should(
          'contain',
          'Must be a valid number'
        )

        cy.getByTestId('NetTermsItem-input').within(() => {
          cy.get('input').type('{esc}')
        })
      })
    })
  })

  describe('when No selected in Notify About New Invoices', () => {
    it('saves selected value', () => {
      cy.getByTestId(
        'EditableField-toggle-button-notifyAboutNewInvoices'
      ).click()

      cy.selectByValue({
        field: 'YesOrNoItem-notifyAboutNewInvoices-select',
        value: 0
      })

      cy.getByTestId('YesOrNoItem-notifyAboutNewInvoices')
        .find('p')
        .should('contain', 'No')
    })
  })

  describe('when No selected in Auto Allocate Memos', () => {
    it('saves selected value', () => {
      cy.getByTestId('EditableField-toggle-button-autoAllocateMemos').click()

      cy.selectByValue({
        field: 'YesOrNoItem-autoAllocateMemos-select',
        value: 0
      })

      cy.getByTestId('YesOrNoItem-autoAllocateMemos')
        .find('p')
        .should('contain', 'No')
    })
  })

  describe('when No selected in Add Timesheet to Invoice', () => {
    it('saves selected value', () => {
      cy.getByTestId(
        'EditableField-toggle-button-attachTimesheetsToInvoices'
      ).click()

      cy.selectByValue({
        field: 'YesOrNoItem-attachTimesheetsToInvoices-select',
        value: 0
      })

      cy.getByTestId('YesOrNoItem-attachTimesheetsToInvoices')
        .find('p')
        .should('contain', 'No')
    })
  })

  describe('when - (empty) selected in Investment Grade', () => {
    it('shows validation message', () => {
      cy.getByTestId('EditableField-toggle-button-investmentGrade').click()

      cy.selectByValue({
        field: 'YesOrNoItem-investmentGrade-select',
        value: -1
      })

      cy.getByTestId('YesOrNoItem-investmentGrade-select').should(
        'contain',
        'Please complete this field.'
      )
    })
  })

  describe('when No selected in Investment Grade', () => {
    it('saves selected value', () => {
      cy.getByTestId('EditableField-toggle-button-investmentGrade').click()

      cy.selectByValue({
        field: 'YesOrNoItem-investmentGrade-select',
        value: 0
      })

      cy.getByTestId('YesOrNoItem-investmentGrade')
        .find('p')
        .should('contain', 'No')
    })
  })

  // Flaky test randomly returning Yes/-
  // eslint-disable-next-line
  describe.skip('when Investment Grade is null', () => {
    it('combobox should have selected an empty data sign', () => {
      resetSetup({
        GetClientBillingDetails: {
          data: {
            node: {
              ...fixtures.MockClient,
              investmentGrade: null
            },
            viewer: {
              permits: { canManageBillingOptions: true }
            }
          }
        }
      })

      cy.getByTestId('EditableField-toggle-button-investmentGrade').click()

      cy.getByTestId('YesOrNoItem-investmentGrade-select')
        .find('input')
        .should('have.value', '—')
    })
  })
})

describe('when items are not provided', () => {
  it('shows empty data signs', () => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            billingNotes: null,
            notifyAboutNewInvoices: null,
            autoAllocateMemos: null,
            attachTimesheetsToInvoices: null,
            investmentGrade: null
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      }
    })

    cy.getByTestId('EditableField-billingNotes').should('contain.text', '—')
    cy.getByTestId('YesOrNoItem-notifyAboutNewInvoices')
      .find('p')
      .should('contain', '—')
    cy.getByTestId('YesOrNoItem-autoAllocateMemos')
      .find('p')
      .should('contain', '—')
    cy.getByTestId('YesOrNoItem-attachTimesheetsToInvoices')
      .find('p')
      .should('contain', '—')
    cy.getByTestId('YesOrNoItem-investmentGrade')
      .find('p')
      .should('contain', '—')
  })

  it('does not show a field for collection speed', () => {
    cy.getByTestId('CollectionSpeedLabel-label').should('not.exist')
  })
})

describe('field for collection speed', () => {
  before(() => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...fixtures.MockClient,
            enterprise: true,
            collectionSpeed: ClientCollectionSpeed.SLOW_PAY,
            operations: {
              ...fixtures.MockClient.operations,
              updateClientCollectionSpeed: {
                callable: OperationCallableTypes.ENABLED,
                messages: [],
                __typename: 'Operation'
              }
            }
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      }
    })
  })

  it('initial value is properly set', () => {
    cy.getByTestId('CollectionSpeedLabel-label').should('contain', 'Slow Pay')
  })

  it('saves selected value', () => {
    cy.getByTestId('CollectionSpeedItem')
      .find('[data-testid="componentTogglerWithFormButton"]')
      .click()

    cy.selectByValue({
      field: 'CollectionSpeedForm-collectionSpeed-select',
      value: ClientCollectionSpeed.STANDARD
    })

    cy.getByTestId('CollectionSpeedLabel-label').should('contain', 'Standard')
  })

  describe('when esc is pressed', () => {
    it('exits edit mode', () => {
      cy.getByTestId('CollectionSpeedItem')
        .find('[data-testid="componentTogglerWithFormButton"]')
        .click()

      cy.getByTestId('CollectionSpeedForm-collectionSpeed-select').should(
        'exist'
      )

      cy.get('body').type('{esc}')

      cy.getByTestId('CollectionSpeedLabel-label').should('contain', 'Standard')
      cy.getByTestId('CollectionSpeedForm-collectionSpeed-select').should(
        'not.exist'
      )
    })
  })
})
