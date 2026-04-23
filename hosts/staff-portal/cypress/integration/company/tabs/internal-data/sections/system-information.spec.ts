import { HowDidYouHearValues } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { internalDataMocks } from '~integration/modules/pages/companies/internal-data-tab/mocks'
import { clientInternalDataMock } from '~integration/mocks/fragments'
import {
  errorOperationMock,
  successOperationMock
} from '~integration/mocks/operations'
import { getUserVerticalsResponse } from '~integration/mocks/responses'

describe('System Information', () => {
  const { internalDataTab } = new CompanyProfilePage()
  const { systemInformationSection } = internalDataTab

  beforeEach(() => {
    cy.updateStaffMocks(internalDataMocks())
    cy.stubGraphQLRequests({
      GetUserVerticals: getUserVerticalsResponse()
    })

    internalDataTab.visitTab()
  })

  describe('Most interested in', () => {
    it('is editable', () => {
      const interestedIn = 'Developers'

      systemInformationSection.editMostInterestedIn()
      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(clientInternalDataMock({ interestedIn }))
        }
      })
      const developerInterestedInId = 'VjEtVmVydGljYWwtMQ'

      systemInformationSection.selectMostInterestedIn(developerInterestedInId)
      systemInformationSection
        .mostInterestedIn()
        .should('contain', interestedIn)
    })
  })

  describe('Heard Us From', () => {
    it('is editable', () => {
      const howDidYouHear = HowDidYouHearValues.FACEBOOK

      systemInformationSection.editHeardUsFrom()
      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(clientInternalDataMock({ howDidYouHear }))
        }
      })
      systemInformationSection.selectHeardUsFrom(howDidYouHear)
      systemInformationSection
        .heardUsFrom()
        .should('contain', titleize(howDidYouHear))
    })
  })

  describe('How they heard us', () => {
    it('is editable', () => {
      const howDidYouHearDetails = 'test heard'

      systemInformationSection.editHowDidYouHearDetails()
      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(
              clientInternalDataMock({ howDidYouHearDetails })
            )
        }
      })
      systemInformationSection.updateHowDidYouHearDetails(howDidYouHearDetails)
      systemInformationSection
        .howDidYouHearDetails()
        .should('contain', howDidYouHearDetails)
    })
  })

  describe('Review link', () => {
    it('shows an error when invalid URL is supplied', () => {
      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            errorOperationMock([
              {
                code: 'invalidUrl',
                key: 'reviewLink',
                message: 'Is not a valid URL'
              }
            ])
        }
      })

      systemInformationSection.editReviewLink()
      systemInformationSection.updateReviewLink('invalid URL')
      systemInformationSection
        .reviewLinkFormError()
        .should('contain.text', 'Is not a valid URL')
    })

    it('is editable', () => {
      const reviewLink = 'https://toptal.com'

      systemInformationSection.editReviewLink()
      cy.updateStaffMocks({
        Mutation: {
          patchClientProfile: () =>
            successOperationMock(clientInternalDataMock({ reviewLink }))
        }
      })
      systemInformationSection.updateReviewLink(reviewLink)
      systemInformationSection.reviewLink().should('contain.text', reviewLink)
    })
  })
})
