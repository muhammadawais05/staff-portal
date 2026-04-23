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

describe('Resolve default investigation', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { investigationsSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks({
      ...internalDataMocks({
        ...investigationsMock({
          reason: InvestigationReason.PAYMENT_PROBLEM,
          resolvedAt: null
        })
      }),
      ClientOperations: {
        ...operationMock(
          'resolveClientPaymentProblemInvestigation',
          OperationCallableTypes.ENABLED
        )
      },
      Mutation: {
        resolveClientPaymentProblemInvestigation: () =>
          successOperationMock({
            ...investigationsMock()
          })
      }
    })

    internalDataTab.visitTab()
    investigationsSection.toggleInvestigationsList()
    investigationsSection.openResolveInvestigationModal()
  })

  it('displays validation errors', () => {
    const errorText = 'Please complete this field.'

    investigationsSection.submitResolveInvestigation()

    investigationsSection
      .resolveInvestigationResolutionError()
      .should('contain.text', errorText)
    investigationsSection
      .resolveInvestigationCommentError()
      .should('contain.text', errorText)
  })

  it('submits successfully and resolves the investigation', () => {
    investigationsSection
      .selectResolveInvestigationResolution('Other')
      .enterResolveInvestigationComment('test')
    investigationsSection.submitResolveInvestigation()
    cy.getNotification().should('contain', 'Investigation has been resolved.')
  })
})
