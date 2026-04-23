import CompanyProfilePage from '~integration/modules/pages/companies'
import { webNSocialTabMocks } from '~integration/mocks'
import {
  careerPagesMock,
  clientWebNSocialMock
} from '~integration/mocks/fragments'
import {
  errorOperationMock,
  successOperationMock
} from '~integration/mocks/operations'

describe('Career Pages Component', () => {
  const { webAndSocialTab } = new CompanyProfilePage()

  beforeEach(() => {
    cy.updateStaffMocks(webNSocialTabMocks())

    webAndSocialTab.visitTab()
  })

  describe('testing Career Pages editor', () => {
    describe('when tries to save empty value', () => {
      it('shows validation', () => {
        const {
          inDepthCompanyResearchSection: { careerPagesEditor }
        } = webAndSocialTab

        careerPagesEditor.edit()
        careerPagesEditor.addItem()
        careerPagesEditor.submit()
        careerPagesEditor
          .getCareerPageUrlInputError(1)
          .should('contain', 'Please complete this field.')
      })
    })

    describe('when adds new page and save', () => {
      it('new career pages added', () => {
        const {
          inDepthCompanyResearchSection: { careerPagesEditor }
        } = webAndSocialTab

        careerPagesEditor.edit()
        careerPagesEditor.addItem()
        careerPagesEditor.setCareerPageUrl({
          value: 'http://test2.url',
          index: 1
        })
        careerPagesEditor.addItem()
        careerPagesEditor.setCareerPageUrl({
          value: 'http://test3.url',
          index: 2
        })
        careerPagesEditor.addItem()
        careerPagesEditor.setCareerPageUrl({
          value: 'http://test4.url',
          index: 3
        })
        cy.updateStaffMocks({
          Mutation: {
            updateClientCareerPages: () =>
              successOperationMock({
                careerPages: careerPagesMock
              })
          }
        })
        careerPagesEditor.submit()
        careerPagesEditor
          .getCareerPageUrlLabel(0)
          .should('contain', 'http://test1.url')
        careerPagesEditor
          .getCareerPageUrlLabel(1)
          .should('contain', 'http://test2.url')
        careerPagesEditor
          .getCareerPageUrlLabel(2)
          .should('contain', 'http://test3.url')
        careerPagesEditor
          .getCareerPageUrlLabel(3)
          .should('contain', 'http://test4.url')
        careerPagesEditor.getPrimaryLabel(0).should('contain', 'Primary')
      })
    })

    describe('when remove career pages and save', () => {
      it('career pages are removed', () => {
        const {
          inDepthCompanyResearchSection: { careerPagesEditor }
        } = webAndSocialTab

        cy.updateStaffMocks({
          Query: {
            node: () => ({
              ...clientWebNSocialMock({ careerPages: careerPagesMock })
            })
          }
        })
        careerPagesEditor.edit()
        careerPagesEditor.removeAllItems(4)
        cy.updateStaffMocks({
          Mutation: {
            updateClientCareerPages: () =>
              successOperationMock({
                careerPages: {
                  nodes: [],
                  totalCount: 0
                }
              })
          }
        })
        careerPagesEditor.submit()
        careerPagesEditor.getCareerPageUrlLabel(0).should('not.exist')
        careerPagesEditor.getCareerPageUrlLabel(1).should('not.exist')
        careerPagesEditor.getCareerPageUrlLabel(2).should('not.exist')
        careerPagesEditor.getCareerPageUrlLabel(3).should('not.exist')
      })
    })

    describe('when duplicate e-mail was added', () => {
      it('shows notification', () => {
        const {
          inDepthCompanyResearchSection: { careerPagesEditor }
        } = webAndSocialTab

        careerPagesEditor.edit()
        careerPagesEditor.addItem()
        careerPagesEditor.setCareerPageUrl({
          index: 1,
          value: 'http://test1.url'
        })
        cy.updateStaffMocks({
          Mutation: {
            updateClientCareerPages: () =>
              errorOperationMock([
                {
                  code: 'careerPagesNotUnique',
                  key: 'base',
                  message: 'Career pages must be unique.'
                }
              ])
          }
        })
        careerPagesEditor.submit()
        careerPagesEditor
          .getErrorMessage()
          .should('contain', ' Career  pages  must  be  unique. ')
      })
    })

    describe('when changed primary career page', () => {
      it('sets another page as primary', () => {
        const {
          inDepthCompanyResearchSection: { careerPagesEditor }
        } = webAndSocialTab

        cy.updateStaffMocks({
          Query: {
            node: () => ({
              ...clientWebNSocialMock({ careerPages: careerPagesMock })
            })
          }
        })
        careerPagesEditor.edit()
        careerPagesEditor.setCareerPageAsPrimary(1)
        cy.updateStaffMocks({
          Mutation: {
            updateClientCareerPages: () =>
              successOperationMock({
                careerPages: careerPagesMock,
                nodes: [
                  ...Object.assign([...careerPagesMock.nodes], {
                    0: {
                      id: '1',
                      primary: true,
                      url: 'http://test2.url'
                    },
                    1: {
                      id: '2',
                      primary: false,
                      url: 'http://test1.url'
                    }
                  })
                ],
                totalCount: 4
              })
          }
        })
        careerPagesEditor.submit()
        careerPagesEditor.getPrimaryLabel(0).should('contain', 'Primary')
      })
    })
  })
})
