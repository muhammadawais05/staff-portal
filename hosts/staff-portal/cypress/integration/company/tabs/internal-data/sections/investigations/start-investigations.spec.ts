import CompanyProfilePage from '~integration/modules/pages/companies'
import { internalDataMocks } from '~integration/modules/pages/companies/internal-data-tab/mocks'
import { investigationsMock } from '~integration/mocks/fragments'
import {
  errorOperationMock,
  successOperationMock
} from '~integration/mocks/operations'

describe('Start investigations', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { investigationsSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks(
      internalDataMocks({
        investigations: {
          nodes: [],
          totalCount: 0
        }
      })
    )

    internalDataTab.visitTab()
    investigationsSection.openStartInvestigationModal()
  })

  it('opens the modal after click on "Start Investigation"', () => {
    investigationsSection
      .investigationReasonLabel()
      .should('contain.text', 'Reason')
  })

  it('displays validation errors', () => {
    investigationsSection.submitInvestigation()
    investigationsSection
      .investigationReasonError()
      .should('contain.text', 'Please complete this field.')
    investigationsSection
      .investigationCommentError()
      .should('contain.text', 'Please complete this field.')
  })

  it('displays an error if an investigation already exists', () => {
    cy.updateStaffMocks({
      Mutation: {
        createClientInvestigation: () =>
          errorOperationMock([
            {
              code: 'inInvestigation',
              key: 'base',
              message:
                'Only one investigation at a time can be run for a company.'
            }
          ])
      }
    })

    investigationsSection
      .selectInvestigationReason('OTHER')
      .enterInvestigationComment('test')
    investigationsSection.submitInvestigation()
    investigationsSection
      .formBaseError()
      .should(
        'have.text',
        ' Only  one  investigation  at  a  time  can  be  run  for  a  company. '
      )
  })

  it('submits successfully and create a new investigation', () => {
    cy.updateStaffMocks({
      Mutation: {
        createClientInvestigation: () =>
          successOperationMock({
            ...investigationsMock()
          })
      }
    })

    investigationsSection
      .selectInvestigationReason('OTHER')
      .enterInvestigationComment('test')
    investigationsSection.submitInvestigation()
    cy.getNotification().should('contain', 'Investigation has been started.')
  })
})
