import React from 'react'
import { render } from '@testing-library/react'
import { fireEvent } from '@toptal/picasso/test-utils'
import {
  CumulativeJobStatus,
  Job,
  JobStatus
} from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  getMultipleHiresTooltip,
  MULTIPLE_HIRES_TOOLTIP
} from '@staff-portal/jobs'

import JobListItem from './JobListItem'

jest.mock(
  '@staff-portal/jobs-cards/src/components/JobCardTalentItemHeader/JobCardTalentItemHeader',
  () => ({
    __esModule: true,
    default: () => <div data-testid='JobCardTalentItemHeader' />
  })
)

jest.mock(
  '@staff-portal/jobs-cards/src/components/JobCardTalentList/JobCardTalentList',
  () => ({
    __esModule: true,
    default: () => <div data-testid='JobCardTalentList' />
  })
)
jest.mock('@staff-portal/talents', () => ({
  TalentApplicantSkillsSelector: () => (
    <div data-testid='TalentApplicantSkillsSelector' />
  )
}))
jest.mock('@staff-portal/engagements', () => ({
  ENGAGEMENT_COMMITMENT_MAPPING: {}
}))

const renderComponent = (job: Job) =>
  render(
    <TestWrapperWithMocks>
      <table>
        <tbody>
          <JobListItem
            job={job}
            isExpanded={false}
            index={1}
            expandCollapseJob={() => {}}
          />
        </tbody>
      </table>
    </TestWrapperWithMocks>
  )

describe('getMultipleHiresTooltip', () => {
  it('should return tooltip for multiple hired jobs in non claim status', () => {
    const job = {
      talentCount: 3,
      status: JobStatus.PENDING_ENGINEER
    } as Job

    expect(getMultipleHiresTooltip(job)).toBe(MULTIPLE_HIRES_TOOLTIP)
  })

  it('should NOT return tooltip for multiple hired jobs in claim status', () => {
    const job = {
      talentCount: 3,
      status: JobStatus.PENDING_CLAIM
    } as Job

    expect(getMultipleHiresTooltip(job)).toBeUndefined()
  })

  it('should NOT return tooltip for single hired jobs', () => {
    const job = {
      talentCount: 1,
      status: JobStatus.PENDING_ENGINEER
    } as Job

    expect(getMultipleHiresTooltip(job)).toBeUndefined()
  })
})

describe('JobListItem', () => {
  describe('contacts render', () => {
    it('should show single contact', () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        contacts: {
          nodes: [
            {
              id: '1',
              webResource: {
                text: 'John Smith'
              }
            }
          ]
        }
      } as Job

      const { getByTestId } = renderComponent(job)

      expect(getByTestId('job-contacts-cell')).toHaveTextContent('John Smith')
    })

    it('should show two contacts', () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        contacts: {
          nodes: [
            {
              id: '1',
              webResource: {
                text: 'John Smith'
              }
            },
            {
              id: '2',
              webResource: {
                text: 'Mike Poul'
              }
            }
          ]
        }
      } as Job

      const { getByTestId } = renderComponent(job)
      const cell = getByTestId('job-contacts-cell')

      expect(cell).toHaveTextContent('John Smith')
      expect(cell).toHaveTextContent('Mike Poul')
    })

    it('should show counter for the multiple contacts', () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        contacts: {
          nodes: [
            {
              id: '1',
              webResource: {
                text: 'John Smith'
              }
            },
            {
              id: '2',
              webResource: {
                text: 'Mike Poul'
              }
            },
            {
              id: '3',
              webResource: {
                text: 'Fred Bonz'
              }
            }
          ]
        }
      } as Job

      const { getByTestId } = renderComponent(job)
      const cell = getByTestId('job-contacts-cell')

      expect(cell).toHaveTextContent('John Smith')
      expect(cell).toHaveTextContent('Mike Poul, +1')
    })

    it('show replacement for the matcher', () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        claimer: {
          contacts: {
            nodes: [
              {
                id: '1',
                webResource: {
                  text: 'Sam Smith'
                }
              }
            ]
          }
        },
        contacts: {
          nodes: {}
        },
        claimerHandoff: {
          replacement: {
            webResource: {
              text: 'John Smith'
            }
          },
          subject: {
            webResource: {
              text: 'Anna Smith'
            }
          }
        },
        webResource: {
          text: 'Alex Smith'
        }
      } as Job

      const { getByTestId } = renderComponent(job)
      const icon = getByTestId('job-handoff-icon')
      const cell = getByTestId('job-matcher-cell')

      expect(icon).toBeInTheDocument()
      expect(cell).toHaveTextContent('John Smith')
    })
  })

  describe('contacts tooltip', () => {
    it('should show tooltip with all contacts', async () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        contacts: {
          nodes: [
            {
              id: '1',
              fullName: 'John Smith',
              contacts: {
                nodes: [
                  {
                    value: '+55555'
                  }
                ]
              },
              email: 'test1@test.co',
              webResource: {
                text: 'John Smith'
              }
            },
            {
              id: '2',
              fullName: 'Mike Poul',
              contacts: {
                nodes: [
                  {
                    value: '+12345'
                  }
                ]
              },
              email: 'test2@test.co',
              webResource: {
                text: 'Mike Poul'
              }
            },
            {
              id: '3',
              fullName: 'Fred Bonz',
              contacts: {
                nodes: [
                  {
                    value: '+54321'
                  }
                ]
              },
              email: 'test3@test.co',
              webResource: {
                text: 'Fred Bonz'
              }
            }
          ]
        }
      } as Job

      const { getByText, findByTestId } = renderComponent(job)
      const link = getByText('John Smith')

      fireEvent.mouseOver(link)

      const tooltip = await findByTestId('job-contacts-tooltip')

      expect(tooltip).toHaveTextContent('John Smith')
      expect(tooltip).toHaveTextContent('test1@test.co')
      expect(tooltip).toHaveTextContent('+12345')

      expect(tooltip).toHaveTextContent('Mike Poul')
      expect(tooltip).toHaveTextContent('test2@test.co')
      expect(tooltip).toHaveTextContent('+55555')

      expect(tooltip).toHaveTextContent('Fred Bonz')
      expect(tooltip).toHaveTextContent('test3@test.co')
      expect(tooltip).toHaveTextContent('+54321')
    })
  })

  describe('commitment tooltip', () => {
    it('should show commitment tooltip with desired commitment', async () => {
      const job = {
        jobType: '',
        status: JobStatus.ACTIVE,
        cumulativeStatus: CumulativeJobStatus.ACTIVE,
        client: {},
        talentCount: 1,
        commitment: 'part_time',
        currentEngagement: {
          commitment: 'HOURLY'
        },
        contacts: {
          nodes: {}
        },
        webResource: {
          text: 'John Smith'
        }
      } as Job

      const { getByTestId, getByText } = renderComponent(job)
      const icon = getByTestId('job-desired-commitment')

      fireEvent.mouseOver(icon)

      const tooltip = await getByText('Desired Commitment: Part-time')

      expect(tooltip).toBeInTheDocument()
    })
  })
})
