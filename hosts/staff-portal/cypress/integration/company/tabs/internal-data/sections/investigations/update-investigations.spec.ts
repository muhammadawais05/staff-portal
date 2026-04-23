import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { internalDataMocks } from '~integration/modules/pages/companies/internal-data-tab/mocks'
import { investigationsMock } from '~integration/mocks/fragments'
import {
  operationMock,
  successOperationMock
} from '~integration/mocks/operations'

describe('Update investigation', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { investigationsSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks({
      ...internalDataMocks({
        ...investigationsMock({ resolvedAt: null })
      }),
      ClientOperations: {
        ...operationMock(
          'createClientInvestigation',
          OperationCallableTypes.HIDDEN
        ),
        ...operationMock(
          'updateClientInvestigation',
          OperationCallableTypes.ENABLED
        )
      }
    })

    internalDataTab.visitTab()
    investigationsSection.toggleInvestigationsList()
    investigationsSection.openUpdateInvestigationModal()
  })

  it('opens the modal after click on "Update Investigation"', () => {
    investigationsSection
      .investigationReasonLabel()
      .should('contain.text', 'Reason')
  })

  it('displays validation errors', () => {
    investigationsSection.clearInvestigationComment().submitInvestigation()

    investigationsSection
      .investigationCommentError()
      .should('contain.text', 'Please complete this field.')
  })

  it('submits successfully and updates the investigation', () => {
    cy.updateStaffMocks({
      Mutation: {
        updateClientInvestigation: () =>
          successOperationMock({
            ...investigationsMock({})
          })
      }
    })

    investigationsSection
      .selectInvestigationReason('OTHER')
      .clearInvestigationComment()
      .enterInvestigationComment('test')
    investigationsSection.submitInvestigation()

    cy.getNotification().should('contain', 'Investigation has been updated.')
  })
})
