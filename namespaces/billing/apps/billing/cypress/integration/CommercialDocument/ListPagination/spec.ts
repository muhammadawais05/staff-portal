import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import fixtures from '@staff-portal/billing/src/_fixtures'

import defaultResponses from '../../../support/defaultResponse/invoiceListDefault'
import setupServer from '../../../support/commands/setupServer'

const GREY_DARK = Color(palette.grey.dark).toString()
const pageSize = 25
const totalCount = pageSize * 2 + 3

const multipleByTotalCount = <T>(invoices: T[]): T[] => {
  let result = invoices

  if (!result || result.length === 0) {
    throw new Error('invoices required to properly test pagination')
  }

  while (result.length < totalCount) {
    result = result.concat(result)
  }

  return result
}

const getMultipliedList = ({
  pagination
}: Record<string, Record<string, number>> = {}) => {
  const start = pagination?.offset || 0
  const end = pagination?.offset + pagination?.limit

  return {
    ...fixtures.MockInvoiceList,
    invoices: {
      ...fixtures.MockInvoiceList.invoices,
      groups: [
        {
          ...fixtures.MockInvoiceList.invoices.groups[0],
          invoices: multipleByTotalCount(
            fixtures.MockInvoiceList.invoices.groups[0].invoices
          ).slice(start, end)
        }
      ],
      totalCount
    }
  }
}

const resetSetup = ({ overriddenResponses = {}, baseUrl = '/' }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cy.mockGraphQL((operationName: string, variables?: Record<string, any>) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses: {
        ...overriddenResponses,
        GetInvoicesList: {
          data: getMultipliedList(variables)
        }
      }
    })
  )
  cy.visit(baseUrl, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffInvoiceListPage'
    }
  })
  cy.waitForReact()
}

describe('Widget - Staff - List Pagination', () => {
  describe('Invoice List Pagination', () => {
    it('display pagination properly', () => {
      resetSetup({})

      cy.getByTestId('ListPagination').within(() => {
        cy.get('button')
          .eq(0)
          .should('be.disabled')
          .should('contain.text', 'Prev')
        cy.get('button')
          .eq(1)
          .should('have.css', 'background-color', GREY_DARK)
          .should('contain.text', '1')
        cy.react('Button').contains('2').click()
      })
      cy.url().should('include', '/?page=2')
    })
  })

  describe('Invoice List Page', () => {
    it('will restore selected filter options from url', () => {
      resetSetup({ baseUrl: '/?page=2' })

      cy.getByTestId('ListPagination').within(() => {
        cy.get('button')
          .eq(2)
          .should('have.text', '2')
          .should('have.css', 'background-color', GREY_DARK)
      })
    })
  })
})
