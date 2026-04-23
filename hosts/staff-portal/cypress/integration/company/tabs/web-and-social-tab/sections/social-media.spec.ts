import CompanyProfilePage from '~integration/modules/pages/companies'
import { webNSocialTabMocks } from '~integration/mocks'
import { clientWebNSocialMock } from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

describe('when operations for editing are enabled', () => {
  const { webAndSocialTab } = new CompanyProfilePage()
  const { socialMediaSection: section } = webAndSocialTab

  beforeEach(() => {
    cy.updateStaffMocks(webNSocialTabMocks())

    webAndSocialTab.visitTab()
  })

  describe('testing social media inputs', () => {
    describe('when value is entered in Twitter', () => {
      it('saves the entered value', () => {
        const twitter = 'twitter'
        const twitterLink = {
          text: twitter,
          url: `https://twieditTwitter`
        }

        cy.updateStaffMocks({
          Mutation: {
            patchClientProfile: () =>
              successOperationMock(clientWebNSocialMock({ twitterLink }))
          }
        })
        section.editTwitter()
        section.setTwitter(twitter).save()
        section.getTwitter().should('contain', twitter)
      })
    })

    describe('when value is entered in LinkedIn', () => {
      it('saves the entered value', () => {
        const linkedin = 'linkedin'
        const linkedinLink = {
          text: linkedin,
          url: `https://linkedin.com/${linkedin}`
        }

        cy.updateStaffMocks({
          Mutation: {
            patchClientProfile: () =>
              successOperationMock(clientWebNSocialMock({ linkedinLink }))
          }
        })
        section.editLinkedin()
        section.setLinkedin(linkedin).save()
        section.getLinkedin().should('contain', linkedin)
      })
    })

    describe('when value is entered in Zoominfo Profile', () => {
      it('saves the entered value', () => {
        const zoominfoProfileUrl = 'http://zoominfo.com/sdsd'

        cy.updateStaffMocks({
          Mutation: {
            patchClientProfile: () =>
              successOperationMock(clientWebNSocialMock({ zoominfoProfileUrl }))
          }
        })
        section.editZoominfoProfile()
        section.setZoominfoProfile('zoom').save()
        section.getZoominfoProfile().should('contain', 'Go to zoominfo')
      })
    })

    describe('when value is entered in CrunchBase', () => {
      it('saves the entered value', () => {
        const crunchbase = 'testcrunchbase'
        const crunchbaseLink = {
          text: crunchbase,
          url: `https://www.crunchbase.com/organization/${crunchbase}`
        }

        cy.updateStaffMocks({
          Mutation: {
            patchClientProfile: () =>
              successOperationMock(clientWebNSocialMock({ crunchbaseLink }))
          }
        })
        section.editCrunchbase()
        section.setCrunchbase(crunchbase).save()
        section.getCrunchbase().should('contain', crunchbase)
      })
    })

    describe('when value is entered in Facebook', () => {
      it('saves the entered value', () => {
        const facebook = 'facebook'
        const facebookLink = {
          text: facebook,
          url: `https://facebook.com/${facebook}`
        }

        cy.updateStaffMocks({
          Mutation: {
            patchClientProfile: () =>
              successOperationMock(clientWebNSocialMock({ facebookLink }))
          }
        })
        section.editFacebook()
        section.setFacebook(facebook).save()

        section.getFacebook().should('contain', facebook)
      })
    })
  })
})
