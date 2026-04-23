import CompanyProfilePage from '~integration/modules/pages/companies'
import { webNSocialTabMocks } from '~integration/mocks'
import { clientWebNSocialMock } from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

describe('when operations for editing are enabled', () => {
  const { webAndSocialTab } = new CompanyProfilePage()
  const { financialInformationSection: section } = webAndSocialTab

  beforeEach(() => {
    cy.updateStaffMocks(webNSocialTabMocks())

    webAndSocialTab.visitTab()
  })

  describe('when new values selected in Stage', () => {
    it('saves selected value', () => {
      const stage = 'IPO'

      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(clientWebNSocialMock({ stage }))
        }
      })
      section.editStage()
      section.setStage(stage)
      //TODO: The only way to save the field is clicking outside of it
      //TODO: Investigate the behaviour and ask the design team about it
      cy.contains('Stage').click()
      section.getStage().should('contain', stage)
    })
  })

  describe('when value is entered in Total Funding', () => {
    it('saves the entered value', () => {
      const totalFunding = '200'

      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(clientWebNSocialMock({ totalFunding }))
        }
      })
      section.editTotalFunding()
      section.setTotalFunding(totalFunding).save()
      section.getTotalFunding().should('contain', totalFunding)
    })
  })

  describe('when value is entered in Acquired By', () => {
    it('saves the entered value', () => {
      const acquiredBy = 'acquiredBy'

      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(
              clientWebNSocialMock({ acquiredBy: [acquiredBy] })
            )
        }
      })
      section.editAcquiredBy()
      section.setAcquiredBy(acquiredBy).save()
      section.getAcquiredBy().should('contain', acquiredBy)
    })
  })

  describe('when value is entered in Acquired Companies', () => {
    it('saves the entered value', () => {
      const acquiredCompanies = 'acquiredCompanies'

      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(
              clientWebNSocialMock({ acquiredCompanies: [acquiredCompanies] })
            )
        }
      })
      section.editCompanies()
      section.setAcquiredCompanies(acquiredCompanies).save()
      section.getAcquiredCompanies().should('contain', acquiredCompanies)
    })
  })
})
