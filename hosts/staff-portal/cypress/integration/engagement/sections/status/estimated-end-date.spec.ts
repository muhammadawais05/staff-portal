import {
  EngagementStatus,
  ProposedEngagementEnd,
  Scalars
} from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { Engagement } from '~integration/modules/pages/engagements'
import { updateEstimatedEndDateStubs } from '~integration/mocks/schema-updates/engagement'

describe('Engagement Page -> Status Section -> Estimated End Date', () => {
  const page = new Engagement()

  const currentISODate: Scalars['Date'] = '2021-11-01'
  const updatedISODate: Scalars['Date'] = '2021-11-02'
  const updatedFormattedDate = 'Nov 2, 2021'

  const { statusSection } = page

  beforeEach(() => {
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    cy.clock(new Date(currentISODate).getTime())
  })

  describe('when engagement has `proposed end` date', () => {
    it('edits `estimated end date`', () => {
      updateEstimatedEndDateStubs()
      page.visit()

      statusSection
        .getEstimatedEndDateField()
        .should('contain.text', 'Oct 15, 2021')

      statusSection.getEstimatedEndDateEditButton().click()

      updateEstimatedEndDateStubs({
        engagement: {
          cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
          status: EngagementStatus.ON_TRIAL,
          proposedEnd: {
            endDate: updatedISODate
          } as ProposedEngagementEnd
        }
      })

      statusSection
        .getEstimatedEndDateInput()
        .clear()
        .focus()
        .type(updatedISODate)
        .blur()

      statusSection
        .getEstimatedEndDateField()
        .should('contain.text', updatedFormattedDate)
    })
  })
})
