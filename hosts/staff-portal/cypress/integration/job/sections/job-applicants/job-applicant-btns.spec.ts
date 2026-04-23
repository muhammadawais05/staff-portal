import { Resolvers, Job } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import {
  jobMock,
  recipientMock,
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
      ...jobMock(),
      ...recipientMock()
    })
  }
}

// TODO - it will be refactor to use fetch stubbing in https://toptal-core.atlassian.net/browse/SP-1839
// eslint-disable-next-line jest/no-disabled-tests
// TODO - These tests
describe.skip('Job Applicants buttons', () => {
  const page = new JobPage()
  const { jobApplicantsSection } = page

  beforeEach(() => {
    cy.updateStaffMocks(staffMocks)

    page.visit()
    jobApplicantsSection.openJobApplication()
  })

  describe('when user clicks Email Developer button', () => {
    it('opens New Email modal', () => {
      jobApplicantsSection.openEmailApplicantModal()
      page.modal.close()
    })
  })

  describe('when user clicks Reject button', () => {
    it('opens Reject Job Application modal', () => {
      jobApplicantsSection.openRejectJobApplicationModal()
      page.modal.close()
    })
  })
})
