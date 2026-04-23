import { Call } from '@staff-portal/graphql/staff'

import {
  updateCallCounterPartySuccessMock,
  updateCallPurposeSuccessMock
} from '~integration/mocks/fragments/calls'
import { successMutationMock } from '~integration/mocks/mutations'
import { singleCallMocked, userAutocompleteMock } from '../../mocks'
import { CallsPage } from '../../modules/pages'

const staffMocks = (calls: Call[]) => ({
  CallsConnection: {
    totalCount: () => calls.length,
    nodes: () => calls
  }
})
const page = new CallsPage()

describe('Calls list page', () => {
  beforeEach(() => {
    page.visit()
  })

  it('support pagination of calls', () => {
    page.getPageTitle().should('contain', 'Call History (50)')
    cy.updateStaffMocks(
      staffMocks([
        {
          ...singleCallMocked({
            counterparty: {
              fullName: 'Second Page',
              phoneNumber: '+1 803 302 3140',
              roleId: 'VjEtVGFsZW50LTI0NzQwMzY=',
              roleType: 'Talent'
            }
          })
        }
      ])
    )
    cy.get('button').contains('Next').click()
    page.getCounterPartyAtRow(0).should('contain', 'Second Page')
  })

  it('loads empty calls list', () => {
    cy.updateStaffMocks(staffMocks([]))

    page.visit()

    cy.contains('There are no calls for this search criteria.').should('exist')
  })

  it('change call purpose', () => {
    page.editPurpose()
    cy.updateStaffMocks({
      Mutation: {
        updateCallPurpose: updateCallPurposeSuccessMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            purpose: 'Sales Discovery Call',
            customPurpose: null
          })
        }
      ])
    })

    page.setPurpose('Sales Discovery Call')
    page.getPurposeAtRow(0).should('contain', 'Sales Discovery Call')

    cy.updateStaffMocks({
      Mutation: {
        updateCallPurpose: updateCallPurposeSuccessMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({ purpose: null, customPurpose: 'other purpose' })
        }
      ])
    })
    page.editPurpose()
    page.setPurpose('Other')
    page.getPurposeAtRow(0).should('contain', 'other purpose')
  })

  it('dismisses call with missing information', () => {
    cy.updateStaffMocks({
      Mutation: {
        toggleCallDismissedFlag: successMutationMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({ customPurpose: null, isUnfilled: true })
        }
      ])
    })

    page.visit('/unfilled')
    page.getPageTitle().should('contain', 'Calls with Missing information (1)')

    cy.updateStaffMocks({
      Mutation: {
        toggleCallDismissedFlag: successMutationMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({ isDismissed: true, isUnfilled: false })
        }
      ])
    })

    page.dismissCall()

    page.confirmDismissCall()

    page.getPurposeAtRow(0).should('contain', 'N/A')
    page.getCounterPartyAtRow(0).should('contain', 'N/A')
  })

  it('undismiss call with missing information', () => {
    cy.updateStaffMocks({
      Mutation: {
        toggleCallDismissedFlag: successMutationMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            isDismissed: true,
            isUnfilled: false,
            customPurpose: null
          })
        }
      ])
    })
    page.visit()

    page.getPurposeAtRow(0).should('contain', 'N/A')
    page.getCounterPartyAtRow(0).should('contain', 'N/A')

    cy.updateStaffMocks({
      Mutation: {
        toggleCallDismissedFlag: successMutationMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            customPurpose: null,
            isUnfilled: true
          })
        }
      ])
    })

    page.undismissCall()

    page.getPurposeAtRow(0).should('contain', '—')
    page.getCounterPartyAtRow(0).should('contain', 'First Last')
  })

  it('change call counterparty', () => {
    cy.updateStaffMocks({
      Query: {
        autocomplete: userAutocompleteMock
      }
    })
    page.visit()
    page.editCounterParty()
    cy.updateStaffMocks({
      Mutation: {
        updateCallCounterparty: updateCallCounterPartySuccessMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            counterparty: {
              fullName: 'Francesca Connelly',
              phoneNumber: '+1 803 302 3140',
              roleId: 'VjEtVGFsZW50LTI0NzQwMzY=',
              roleType: 'CompanyRepresentative'
            }
          })
        }
      ])
    })

    page.setCounterParty('Francesca')
    page.getCounterPartyAtRow(0).should('contain', 'Francesca Connelly')
  })

  it('listen to voicemail', () => {
    const voicemailUrl =
      'https://api.twilio.com/2010-04-01/Accounts/AC4f73212d67dfc39a1e2431cded2f0c08/Recordings/RE2b7835c5e813b4240a97ee6675d270e4'

    cy.updateStaffMocks(
      staffMocks([
        {
          ...singleCallMocked({
            voicemail: {
              duration: 5,
              transcriptionText: '',
              url: voicemailUrl
            }
          })
        }
      ])
    )
    page.visit()
    page.stubOpenNewTab('VoicemailWindowOpen')

    page.listenToVoicemail()
    cy.get('@VoicemailWindowOpen').should('be.calledWith', voicemailUrl)
  })

  it('fills missing counterparty', () => {
    cy.updateStaffMocks({
      Query: {
        autocomplete: userAutocompleteMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            counterparty: {
              fullName: null,
              phoneNumber: '+1 803 302 3140',
              roleId: null,
              roleType: null
            }
          })
        }
      ])
    })
    page.visit()
    page.editCounterParty()
    cy.updateStaffMocks({
      Mutation: {
        updateCallCounterparty: updateCallCounterPartySuccessMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            counterparty: {
              fullName: 'Francesca Connelly',
              phoneNumber: '+1 803 302 3140',
              roleId: 'VjEtVGFsZW50LTI0NzQwMzY=',
              roleType: 'CompanyRepresentative'
            }
          })
        }
      ])
    })

    page.setCounterParty('Francesca')
    page.getCounterPartyAtRow(0).should('contain', 'Francesca Connelly')
  })

  it('fills missing purpose', () => {
    cy.updateStaffMocks(
      staffMocks([
        {
          ...singleCallMocked({
            customPurpose: null,
            purpose: null
          })
        }
      ])
    )
    page.visit()
    page.editPurpose()
    cy.updateStaffMocks({
      Mutation: {
        updateCallPurpose: updateCallPurposeSuccessMock
      },
      ...staffMocks([
        {
          ...singleCallMocked({
            purpose: 'Sales Discovery Call'
          })
        }
      ])
    })

    page.setPurpose('Sales Discovery Call')
    page.getPurposeAtRow(0).should('contain', 'Sales Discovery Call')
  })
})
