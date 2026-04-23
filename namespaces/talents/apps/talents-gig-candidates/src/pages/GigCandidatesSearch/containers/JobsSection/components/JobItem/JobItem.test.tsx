import React from 'react'
import { render, screen, getByText, fireEvent } from '@testing-library/react'
import {
  CommitmentAvailability,
  EngagementCommitmentEnum,
  EngagementStatus,
  SkillRating
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobItem from './JobItem'
import { CandidateJobsEngagementFragment } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql.types'

jest.mock('../../../../components/SkillsList')
jest.mock('../ClientFeedback')
jest.mock('../JobLink')

const TEST_ENGAGEMENT: CandidateJobsEngagementFragment = {
  id: 'test',
  commitment: EngagementCommitmentEnum.FULL_TIME,
  status: EngagementStatus.ACTIVE,
  cumulativeStatus: 'pending',
  createdAt: '2021-09-24T08:45:00-04:00',
  talent: {
    type: 'developer'
  },
  job: {
    id: 'job-id',
    client: { fullName: 'test client' },
    skillSets: {
      nodes: [
        {
          rating: SkillRating.COMPETENT,
          skill: {
            id: '1',
            name: 'React',
            category: {
              title: 'Title',
              description: 'description'
            }
          }
        },
        {
          rating: SkillRating.COMPETENT,
          skill: {
            id: '2',
            name: 'ES6',
            category: {
              title: 'Title 2',
              description: 'description 2'
            }
          }
        }
      ]
    },
    webResource: {
      text: 'job name'
    }
  },
  feedbacks: {
    nodes: [
      {
        clientAnswers: {
          nodes: [
            {
              option: {
                question: 'Has strong communication skills?',
                value: 'Yes'
              },
              tooltip: 'Tooltip text'
            }
          ]
        }
      }
    ]
  },
  client: {
    id: 'test-client',
    fullName: 'test client',
    enterprise: false,
    webResource: {
      text: 'client name'
    }
  },
  currentCommitment: {
    availability: CommitmentAvailability.full_time
  }
} as CandidateJobsEngagementFragment

const arrangeTest = (
  engagementData: Partial<CandidateJobsEngagementFragment> = {}
) =>
  render(
    <TestWrapper>
      <JobItem
        engagement={{ ...TEST_ENGAGEMENT, ...engagementData }}
        talentSkills={[]}
      />
    </TestWrapper>
  )

describe('Job item', () => {
  it('renders correctly', () => {
    arrangeTest()
    const jobItem = screen.getByTestId('job-item')
    const jobSkills = screen.getByTestId('skills-list')

    expect(getByText(jobItem, 'job name')).toBeInTheDocument()
    expect(getByText(jobSkills, 'React,ES6')).toBeInTheDocument()
    expect(screen.getByText('test client •')).toBeInTheDocument()

    expect(screen.getByTestId('engagement-status')).toHaveTextContent(
      'Sent on Sep 24, 2021 at 8:45 AM - pending review'
    )
  })

  it('does not render feedback when there are none', () => {
    arrangeTest({ feedbacks: { nodes: [] } })

    expect(screen.queryByTestId('job-item-accordion')).not.toBeInTheDocument()
  })

  it('displays client feedback', () => {
    arrangeTest()

    expect(screen.getByTestId('job-item-accordion')).toBeInTheDocument()
    expect(
      screen.queryByTestId('candidate-jobs-feedback-test')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('engagement-status'))

    expect(
      screen.getByTestId('candidate-jobs-feedback-test')
    ).toBeInTheDocument()
  })
})
