import {
  Maybe,
  Resolvers,
  SourcingRequestStatus,
  Staff
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { JobPage } from '~integration/modules/pages/jobs'
import { jobMock, jobSourcingRequestMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

interface GetMocksParams {
  talentSpecialist?: Maybe<Partial<Staff>>
  id?: string
  status?: SourcingRequestStatus
}

const SPECIALISTS = [
  {
    fullName: 'Staff 1',
    id: encodeEntityId('10', 'Staff'),
    webResource: {
      text: 'Beata Skiles',
      url: 'https://staging.toptal.net/platform/staff/staff/2354841',
      __typename: 'Link'
    }
  },
  {
    fullName: 'Staff 2',
    id: encodeEntityId('11', 'Staff'),
    webResource: {
      text: 'Beata Skiles',
      url: 'https://staging.toptal.net/platform/staff/staff/2354841',
      __typename: 'Link'
    }
  }
]

const updateTalentSpecialist = () => {
  const job = getMocks({
    id: encodeEntityId('10', 'Job'),
    talentSpecialist: SPECIALISTS[0]
  })

  cy.updateStaffMocks(job)
}

const updateStatus = () => {
  const job = getMocks({
    id: encodeEntityId('20', 'Job'),
    status: SourcingRequestStatus.ACTIVE_SOURCING
  })

  cy.updateStaffMocks(job)
}

const getMocks = ({ talentSpecialist, id, status }: GetMocksParams) => {
  const staffMocks: Resolvers = {
    Mutation: {
      updateSourcingRequestTalentSpecialist: successMutationMock,
      updateSourcingRequestStatus: successMutationMock
    },
    Query: {
      roles: () =>
        ({
          nodes: SPECIALISTS
        } as never),
      node: (...args) => {
        const [, , , request] = args

        if (request?.operation?.name?.value === 'GetLazyOperation') {
          return jobSourcingRequestMock({ talentSpecialist, status })
        }

        const params: { [param: string]: unknown } = {
          sourcingRequest: jobSourcingRequestMock({ talentSpecialist, status })
        }

        if (id) {
          params['id'] = id
        }

        return jobMock(params)
      }
    }
  }

  return staffMocks
}

describe('Sourcing Request Tab', () => {
  const page = new JobPage()
  const { sourcingRequestTab } = page

  beforeEach(() => {
    cy.updateStaffMocks(getMocks({}))
  })

  describe('Talent Specialist', () => {
    it('Edit Talent Specialist', () => {
      page.visitSourcingRequestTab()
      sourcingRequestTab.detailsSection.getEditTalentSpecialistButton().click()
      sourcingRequestTab.detailsSection.getSpecialistField().click()
      cy.contains(SPECIALISTS[0].fullName).click()
      sourcingRequestTab.detailsSection
        .getSpecialistCommentField()
        .type('Comment for staff 1')

      updateTalentSpecialist()

      sourcingRequestTab.detailsSection.getSpecialistSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'The Talent Specialist was successfully updated'
      )
      sourcingRequestTab.detailsSection
        .getSection()
        .should('contain', SPECIALISTS[0].fullName)
    })

    it('Edit Status', () => {
      page.visitSourcingRequestTab()
      sourcingRequestTab.detailsSection.getEditStatusButton().click()
      sourcingRequestTab.detailsSection.getStatusField().click()
      cy.contains('Active Sourcing').click()
      sourcingRequestTab.detailsSection
        .getStatusCommentField()
        .type('Comment for active sourcing')

      updateStatus()

      sourcingRequestTab.detailsSection.getStatusSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'The Sourcing Request Status was successfully updated'
      )
      sourcingRequestTab.detailsSection
        .getSection()
        .should('contain', 'Active Sourcing')
    })
  })
})
