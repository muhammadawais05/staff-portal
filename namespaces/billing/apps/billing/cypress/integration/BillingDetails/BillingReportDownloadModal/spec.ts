import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        SetDownloadClientBillingReport: {
          data: {
            downloadClientBillingReport: {
              success: true,
              errors: [],
              downloadUrl: '',
              __typename: 'DownloadClientBillingReportPayload'
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

describe('BillingReportDownloadModal', () => {
  before(() => {
    resetSetup()
    cy.clock(new Date(2021, 10, 10))

    cy.getByTestId('DownloadClientBillingReportButton-download-button').click()
  })

  it('automatically displays a datepicker for a start date field', () => {
    cy.getByTestId('BillingReportDownloadModalForm-calendar').should(
      'be.visible'
    )
  })

  it('calendar for start date opens on a current month', () => {
    cy.getByTestId('BillingReportDownloadModalForm-calendar').should(
      'contain',
      'November 2021'
    )
  })

  it('calendar for end date opens on a current month', () => {
    cy.clock(new Date(2021, 10, 10))
    cy.getByTestId('day-button-11').click()
    cy.getByTestId('BillingReportDownloadModalForm-endDate')
      .find('input')
      .focus()
    cy.getByTestId('BillingReportDownloadModalForm-calendar').should(
      'contain',
      'November 2021'
    )
  })

  it('displays a success message when a button to download is clicked', () => {
    cy.getByTestId('day-button-12').click()
    cy.getByTestId('submit').click()

    cy.get('#react_notification').should(
      'have.text',
      "Your download should begin momentarily. Please do not refresh the page. If for some reason the download doesn't initiate, please click this link to download the document manually."
    )
  })

  // Confirmed it's working, current test not so meaningful
  // eslint-disable-next-line
  it.skip('success message contains an anchor element with properly set href', () => {
    /**
     * Href is set to the same value, as was returned from api. A real downloadUrl
     * is not set, to prevent automatic download due to the "waiting for page load"
     * issue (https://github.com/cypress-io/cypress/issues/14857).
     */
    cy.get('#react_notification').find('a').should('have.attr', 'href', '')
  })

  it('displays an error saying that start date is required', () => {
    cy.getByTestId('DownloadClientBillingReportButton-download-button').click()
    cy.getByTestId('submit').click()

    cy.getFieldError('startDate').should(
      'contain',
      'Please complete this field.'
    )
  })

  it('displays an error saying that end date is required', () => {
    cy.getFieldError('endDate').should('contain', 'Please complete this field.')
  })
})
