import { palette } from '@toptal/picasso/utils'
import Color from 'color'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer, { MockedCalls } from '../../../support/commands/setupServer'

const BLUE = Color(palette.blue.main).toString()

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string, variables) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses,
      variables
    })
  )

  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffConsolidationDefaultsPage'
      contentWindow.DATA_CLIENT_ID = 'VjEtQ2xpZW50LTM3OTU4NA'
    }
  })
  cy.waitForReact()
}

describe('when the Consolidation Defaults experiment is enabled', () => {
  before(() => resetSetup())

  it('displays the Consolidation Defaults', () => {
    cy.getByTestId('ConsolidationDefaultsTableRow')
      .should('have.length', 2)
      .first()
      .should('contain', 'Active CD 1')
      .should('contain', 'Jun 21, 2021')
  })

  it('displays the engagements when expanded', () => {
    cy.getByTestId('ConsolidationDefaultsTableRow-expand').first().click()

    cy.getByTestId('EngagementsTableRow')
      .should('have.length', 2)
      .first()
      .should('contain', 'Beier, Kilback and Yost')
      .should('contain', 'Principal Marketing Developer (209029)')
      .should('contain', 'Clinton Senger')
  })

  it('filters the expired/deleted consolidation defaults', () => {
    cy.getByTestId('ConsolidationDefaultsTableRow-status').should(
      'contain',
      'Active'
    )

    cy.getByTestId('consolidation-defaults-filter')
      .should('not.have.css', 'backgroundColor', BLUE)
      .click()
      .should('have.css', 'backgroundColor', BLUE)

    cy.getByTestId('ConsolidationDefaultsTableRow-status').should(
      'not.contain',
      'Active'
    )

    cy.getByTestId('ConsolidationDefaultsTableRow-status')
      .last()
      .should('contain', 'Deleted')
  })

  it('Opens the Create Consolidation Default Modal', () => {
    resetSetup()
    cy.clock()

    cy.getByTestId('consolidation-defaults-add').click()
    cy.tick(5)

    cy.getByTestId('Modals-billingDetails:consolidation-defaults-create').as(
      'modal'
    )

    cy.getByTestId('ConsolidationDefaultModalForm-submit').click()
    cy.getFieldError('name').should('contain', 'Please complete this field.')

    // Select all clients
    cy.getByTestId('ClientMultiSelector-checkbox').click()

    cy.get('@modal').within(() => {
      cy.getByTestId('EngagementsTableRow').as('engagementRows')

      // Test disabled row and its info tooltip
      cy.get('@engagementRows')
        .should('have.length', 33)
        .eq(2)
        .within(() => {
          cy.root().should('have.css', 'backgroundColor', 'rgb(243, 244, 246)')
          cy.get('[type="checkbox"]').should('be.disabled')
          cy.getByTestId('EngagementsTableRowIcon-icon').trigger('mouseover', {
            force: true
          })
          cy.tick(200)
        })
    })

    cy.getTooltip()
      .invoke('text')
      .should(
        'contain',
        'This engagement already belongs to ffff and cannot be selected.'
      )

    cy.tick(50)

    cy.get('@engagementRows')
      .eq(2)
      .within(() => {
        cy.getByTestId('EngagementsTableRowIcon-icon').trigger('mouseout', {
          force: true
        })
      })

    // Select one engagement
    cy.get('@engagementRows')
      .eq(3)
      .within(() => {
        cy.get('[type="checkbox"]').check({ force: true })
      })

    // Deselect certain clients
    cy.getByTestId('ClientMultiSelector-container').within(() => {
      cy.contains('[role="button"]', 'Bayer-Shields TD')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Beier, Kilback and Yost')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Breitenberg-Reichert RZ')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Effertz-Langworth PP')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Fritsch, Stark and Romaguera')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Gislason-Streich KI')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
      cy.contains('[role="button"]', 'Larson, Nikolaus and Bergnaum')
        .find('[aria-label="delete icon"]')
        .click({ force: true })
    })

    cy.getByTestId('ConsolidationDefaultModalForm-title').click()

    cy.get('@engagementRows').should('have.length', 3)

    // Assert previously select row remains selected and visible
    cy.get('@engagementRows')
      .eq(0)
      .within(() => {
        cy.get('[type="checkbox"]').should('be.checked')
        cy.getByTestId('EngagementsTableRow-company').within(() => {
          cy.root().should('contain', 'Beier, Kilback and Yost')
          cy.get('a')
            .invoke('attr', 'href')
            .should('contain', '/platform/staff/companies/762234')
        })
      })

    // Select two additional engagements
    cy.get('@engagementRows')
      .eq(1)
      .within(() => {
        cy.get('[type="checkbox"]').check({ force: true })
      })

    cy.get('@engagementRows')
      .eq(2)
      .within(() => {
        cy.get('[type="checkbox"]').check({ force: true })
      })

    // Test sort by Start Date
    cy.get('input[value="startDate"]').click()
    cy.tick(50)

    cy.get('@modal').within(() => {
      cy.getByTestId('EngagementsTableRow').as('engagementRows')
    })

    cy.get('@engagementRows')
      .eq(0)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-company').should(
          'contain',
          'Beier, Kilback and Yost'
        )
      })

    cy.get('@engagementRows')
      .eq(2)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-company').should(
          'contain',
          'Schmitt-Bosco SG'
        )
      })

    // Test sort by Talent
    cy.get('input[value="talent.fullName"]').click()
    cy.tick(50)

    cy.get('@modal').within(() => {
      cy.getByTestId('EngagementsTableRow').as('engagementRows')
    })

    cy.get('@engagementRows')
      .eq(0)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-talent').should(
          'contain',
          'Emelda Glover'
        )
      })

    cy.get('@engagementRows')
      .eq(2)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-talent').should(
          'contain',
          'Jesse McKenzie'
        )
      })

    // Test sort by PO Number
    cy.get('input[value="effectivePurchaseOrder.poLineNumber"]').click()
    cy.tick(50)

    cy.get('@modal').within(() => {
      cy.getByTestId('EngagementsTableRow').as('engagementRows')
    })

    cy.get('@engagementRows')
      .eq(0)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-po-number').should(
          'contain',
          '4150657193'
        )
      })

    cy.get('@engagementRows')
      .eq(2)
      .within(() => {
        cy.getByTestId('EngagementsTableRow-po-number').should(
          'contain',
          '4150674297'
        )
      })

    // Test search being case-insensitive
    const expectedDropdownResult = 'Bayer-Shields TD #2292125'

    cy.getByTestId('ClientMultiSelector').click()
    cy.getByTestId('ClientMultiSelector').type('bay')
    cy.getTooltip().within(() => {
      cy.get('li').should('have.text', expectedDropdownResult)
    })
    cy.getByTestId('ClientMultiSelector').clear()
    cy.getByTestId('ClientMultiSelector').type('Bay')
    cy.getTooltip().within(() => {
      cy.get('li').should('have.text', expectedDropdownResult)
    })

    // Fill name and submit
    cy.get('#name').type('t')

    // Submit and assert mutation payload
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.getByTestId('ConsolidationDefaultModalForm-submit')
      .click()
      .then(() => {
        expect(MockedCalls).to.deep.include({
          operationName: 'CreateConsolidationDefault',
          variables: {
            input: {
              clientId: 'VjEtQ2xpZW50LTM3OTU4NA',
              engagementIds: [
                'VjEtRW5nYWdlbWVudC0yMTc3OTE',
                'VjEtRW5nYWdlbWVudC0yMjM1Mjc',
                'VjEtRW5nYWdlbWVudC0yNDUyNDc'
              ],
              name: 't'
            }
          }
        })
      })

    cy.closeModal()
  })
})
