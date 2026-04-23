import React from 'react'
import { screen, render } from '@testing-library/react'
import { Link } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobIssues } from '@staff-portal/talents'

import Talent, { Props } from './Talent'
import { createJobIssuesMock } from '../../../../../../data/get-candidate-intro-drafts/mocks'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))
jest.mock('@staff-portal/talents/src/components/JobIssues', () => ({
  __esModule: true,
  default: jest.fn()
}))

const LinkMock = Link as unknown as jest.Mock
const JobIssuesMock = JobIssues as jest.Mock

const defaultJobIssues = createJobIssuesMock()

const arrangeTest = (props: Partial<Props> = {}) => {
  render(
    <TestWrapper>
      <Talent
        talentName='Some Name'
        talentProfileUrl='https://example.com'
        jobIssues={defaultJobIssues}
        {...props}
      />
    </TestWrapper>
  )
}

describe('Talent', () => {
  beforeEach(() => {
    LinkMock.mockImplementation(({ children }) => children)
    JobIssuesMock.mockImplementation(() => <div />)
  })

  describe('when Talent data is displayed', () => {
    it('shows talent name', () => {
      arrangeTest()
      expect(screen.queryByText('Some Name')).toBeInTheDocument()
    })

    it('shows link with a talent page URL', () => {
      arrangeTest()
      expect(LinkMock).toHaveBeenCalledWith(
        expect.objectContaining({ href: 'https://example.com' }),
        expect.anything()
      )
    })
  })

  describe('when Job issues are displayed', () => {
    it('shows talent job issues when fallen metrics are set', () => {
      arrangeTest()
      expect(JobIssuesMock).toHaveBeenCalledWith(
        {
          jobIssues: defaultJobIssues
        },
        expect.anything()
      )
    })

    it("doesn't show job issues when fallen metrics are empty", () => {
      arrangeTest({
        jobIssues: {
          ...defaultJobIssues,
          failedMetrics: []
        }
      })
      expect(JobIssuesMock).toHaveBeenCalledTimes(0)
    })
  })
})
