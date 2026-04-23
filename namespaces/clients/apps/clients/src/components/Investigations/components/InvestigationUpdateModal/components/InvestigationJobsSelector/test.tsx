import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { CumulativeJobStatus, JobStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationJobsSelector from './InvestigationJobsSelector'

jest.mock(
  '../../../JobListingTable'
)

const COMPANY_NAME = 'companyName'

const arrangeTest = (props: ComponentProps<typeof InvestigationJobsSelector>) =>
  render(
    <TestWrapper>
      <InvestigationJobsSelector {...props} />
    </TestWrapper>
  )

describe('InvestigationJobsSelector', () => {
  describe('when jobs exist', () => {
    it('displays message about assigning jobs into investigation', () => {
      arrangeTest({
        companyName: COMPANY_NAME,
        jobs: [
          {
            status: JobStatus.ACTIVE,
            id: 'testid',
            title: 'Senior Solutions Developer (207367)',
            cumulativeStatus: CumulativeJobStatus.ACTIVE,
            hiredCount: 1,
            matcherCallScheduled: false,
            talentCount: 0,
            currentTalents: { totalCount: 0, nodes: [] },
            webResource: {
              text: '',
              url: ''
            }
          }
        ]
      })

      expect(
        screen.queryByTestId('InvestigationJobsSelector-loader')
      ).toBeNull()
      expect(
        screen.getByTestId('JobsAssociationMessage-text')
      ).toHaveTextContent(
        `Would you like to associate ${COMPANY_NAME}'s jobs with the investigation?`
      )
    })
  })

  describe('when jobs does not exist', () => {
    it('displays message investigation does not have jobs', () => {
      arrangeTest({
        companyName: COMPANY_NAME,
        jobs: []
      })

      expect(
        screen.getByTestId('JobsAssociationMessage-text')
      ).toHaveTextContent(
        `${COMPANY_NAME} doesn't have jobs in a state appropriate for associating with the investigation.`
      )
    })
  })
})
