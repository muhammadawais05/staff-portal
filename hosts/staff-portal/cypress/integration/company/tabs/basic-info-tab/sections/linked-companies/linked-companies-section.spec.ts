import {
  updateClientLinkedCompaniesNegotiationStubs,
  updateClientLinkedCompaniesStubs
} from '~integration/mocks/schema-updates/companies'
import {
  companyOutOfNegotiations,
  companyInNegotiations,
  companyWithBadLeadStatus
} from '~integration/mocks/fragments/client-linked-companies-mock'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { FormModal } from '~integration/modules/modals'

describe('Company Profile -> Basic Info tab -> Companies section', () => {
  const companyProfilePage = new CompanyProfilePage()
  const suspendCurrentNegotiationModal = new FormModal()
  const importSTAModal = new FormModal()
  const startNegotiationsModal = new FormModal()
  const updateNegotiationsStatusModal = new FormModal()

  const {
    basicInfoTab,
    basicInfoTab: { linkedCompaniesSection }
  } = companyProfilePage

  it('hides and shows entries based on Show Bad Leads checkbox state', () => {
    updateClientLinkedCompaniesStubs([
      companyOutOfNegotiations,
      companyWithBadLeadStatus
    ])

    basicInfoTab.visitTab()

    const badLeadCompanyName = companyWithBadLeadStatus.fullName as string
    const regularCompanyName = companyOutOfNegotiations.fullName as string

    linkedCompaniesSection.getTableRows().its('length').should('eq', 1)
    linkedCompaniesSection
      .getTableRows()
      .contains(badLeadCompanyName)
      .should('not.exist')

    linkedCompaniesSection.toggleBadLeadStatusCheckbox()
    linkedCompaniesSection.getTableRows().its('length').should('eq', 2)
    linkedCompaniesSection
      .getTableRows()
      .contains(badLeadCompanyName)
      .should('be.visible')

    linkedCompaniesSection
      .getTableRows()
      .contains(regularCompanyName)
      .should('be.visible')

    linkedCompaniesSection.toggleBadLeadStatusCheckbox()
    linkedCompaniesSection.getTableRows().its('length').should('eq', 1)
    linkedCompaniesSection
      .getTableRows()
      .contains(badLeadCompanyName)
      .should('not.exist')
  })

  it('imports STA', () => {
    updateClientLinkedCompaniesStubs([companyOutOfNegotiations])

    basicInfoTab.visitTab()

    linkedCompaniesSection.moreButton.click({ force: true })
    linkedCompaniesSection.moreButton.scrollIntoView()
    linkedCompaniesSection.moreDropdown.contains('Import STA').click()
    importSTAModal.setTextArea('guid', 'GUID')
    importSTAModal.submit()

    // Assert
    companyProfilePage
      .getNotification('The Company STA was successfully imported.')
      .should('be.visible')
  })

  it('starts negotiations with a company', () => {
    updateClientLinkedCompaniesStubs([companyOutOfNegotiations])

    basicInfoTab.visitTab()

    linkedCompaniesSection.moreButton.click({ force: true })
    linkedCompaniesSection.moreButton.scrollIntoView()
    linkedCompaniesSection.moreDropdown.contains('Start Negotiations').click()
    startNegotiationsModal.setTextArea('contactEmail', 'email@toptal.com')
    startNegotiationsModal.setDropdown('status', 'Waiting on Toptal')
    startNegotiationsModal.setTextArea('comment', 'comment')
    startNegotiationsModal.submit()

    // Assert
    companyProfilePage
      .getNotification('The Negotiations were successfully started.')
      .should('be.visible')
  })

  it('updates negotiations status', () => {
    updateClientLinkedCompaniesNegotiationStubs([companyInNegotiations])

    basicInfoTab.visitTab()

    linkedCompaniesSection.moreButton.click({ force: true })
    linkedCompaniesSection.moreButton.scrollIntoView()
    linkedCompaniesSection.moreDropdown
      .contains('Update Negotiations Status')
      .click()
    updateNegotiationsStatusModal.setDropdown('status', 'Waiting on Toptal')
    updateNegotiationsStatusModal.setTextArea('comment', 'comment')
    updateNegotiationsStatusModal.submit()

    // Assert
    companyProfilePage
      .getNotification('The Negotiations Status was successfully updated.')
      .should('be.visible')
  })

  it('suspends current negotiation', () => {
    updateClientLinkedCompaniesNegotiationStubs([companyInNegotiations])

    basicInfoTab.visitTab()

    linkedCompaniesSection.moreButton.click({ force: true })
    linkedCompaniesSection.moreButton.scrollIntoView()
    linkedCompaniesSection.moreDropdown
      .contains('Suspend Current Negotiation')
      .click()
    suspendCurrentNegotiationModal.comment.type('comment')
    suspendCurrentNegotiationModal.submitButton.click()

    // Assert
    companyProfilePage
      .getNotification('The Negotiations were successfully suspended.')
      .should('be.visible')
  })
})
