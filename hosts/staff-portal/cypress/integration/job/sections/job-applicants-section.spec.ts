import { Resolvers, Job } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import {
  jobMock,
  jobApplicationMock,
  JOB_APPLICATION_ID
} from '~integration/mocks'

const getNodeMock =
  (overrides: Partial<Job> = {}) =>
  (_parent: unknown, { id }: { id: string }) => {
    switch (id) {
      case JOB_APPLICATION_ID:
        return jobApplicationMock()
      default:
        return jobMock(overrides)
    }
  }

const staffMocks: Resolvers = {
  Query: {
    node: getNodeMock(),
    staffNode: () => ({
      ...jobMock()
    })
  }
}

describe('Job Applicants Section', () => {
  const page = new JobPage()
  const { jobApplicantsSection } = page

  beforeEach(() => {
    cy.updateStaffMocks(staffMocks)

    page.visit()
  })

  it('renders rows with applicant data', () => {
    jobApplicantsSection.getSection().should('exist')
    jobApplicantsSection.getRows().should('have.length', 5)
    jobApplicantsSection.getBestMatchField().should('exist')
    jobApplicantsSection
      .getBestMatchTooltipContent()
      .contains('Best Match Score: 27.10% (45 of 60)')
    jobApplicantsSection
      .getPublicProfileButton()
      .should(
        'have.attr',
        'href',
        'https://staging.toptal.net/product-managers/resume/obfuscated_slug_878771'
      )
  })

  it('expands job applicant profile', () => {
    jobApplicantsSection.openJobApplication()
    cy.contains('Profile Quality').should('exist')
  })
})
