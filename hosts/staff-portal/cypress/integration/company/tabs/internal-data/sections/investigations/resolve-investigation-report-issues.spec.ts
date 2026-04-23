import {
  InvestigationReason,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { internalDataMocks } from '~integration/modules/pages/companies/internal-data-tab/mocks'
import { investigationsMock } from '~integration/mocks/fragments'
import {
  operationMock,
  successOperationMock
} from '~integration/mocks/operations'

describe('Resolve "Reported Issues" investigation', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { investigationsSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks({
      ...internalDataMocks({
        ...investigationsMock({
          reason: InvestigationReason.REPORTED_ISSUES,
          resolvedAt: null
        })
      }),
      ClientOperations: {
        ...operationMock(
          'resolveClientReportedIssuesInvestigation',
          OperationCallableTypes.ENABLED
        )
      },
      Mutation: {
        resolveClientReportedIssuesInvestigation: () =>
          successOperationMock({
            ...investigationsMock()
          })
      }
    })

    internalDataTab.visitTab()
    investigationsSection.toggleInvestigationsList()
    investigationsSection.openResolveInvestigationModal()
  })

  it('handles invalid input', () => {
    investigationsSection.enterResolveInvestigationInitialRefund('-1000')
    investigationsSection
      .resolveInvestigationInitialRefund()
      .blur()
      .should('have.value', '0.00')

    investigationsSection.enterResolveInvestigationRefundProvided('-1000')
    investigationsSection
      .resolveInvestigationRefundProvided()
      .blur()
      .should('have.value', '0.00')
  })

  it('displays validation errors', () => {
    const errorText = 'Please complete this field.'

    investigationsSection.submitResolveInvestigation()

    investigationsSection
      .resolveInvestigationIssueSourceError()
      .should('contain.text', errorText)
    investigationsSection
      .resolveInvestigationResolutionError()
      .should('contain.text', errorText)
    investigationsSection
      .resolveInvestigationCommentError()
      .should('contain.text', errorText)
    investigationsSection
      .resolveInvestigationInitialRefundError()
      .should('contain.text', errorText)
    investigationsSection
      .resolveInvestigationRefundProvidedError()
      .should('contain.text', errorText)
  })

  it('submits successfully and resolves the investigation', () => {
    investigationsSection
      .selectResolveInvestigationResolution('Other')
      .selectResolveInvestigationIssueSource('Other')
      .enterResolveInvestigationInitialRefund('1000')
      .enterResolveInvestigationRefundProvided('1000')
      .enterResolveInvestigationComment('test')
    investigationsSection.submitResolveInvestigation()
    cy.getNotification().should('contain', 'Investigation has been resolved.')
  })
})
