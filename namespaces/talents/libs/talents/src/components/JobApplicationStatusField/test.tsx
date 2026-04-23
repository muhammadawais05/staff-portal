import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  AvailabilityRequestStatus,
  TalentJobApplicationStatusValue,
  JobApplicationStatus,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobApplicationStatusField, { Props } from './JobApplicationStatusField'

const WEB_RESOURCE_LINK = 'https://test.url/jobs/123#availability_requests_tab'

const defaultProps: Props = {
  jobApplicationStatus: {
    status: TalentJobApplicationStatusValue.AVAILABILITY_REQUESTED,
    relatedObject: {
      id: 'test-id',
      availabilityRequestStatus: AvailabilityRequestStatus.CONFIRMED,
      job: {
        id: '70b37e6aee12'
      }
    },
    webResource: {
      text: '',
      url: WEB_RESOURCE_LINK
    }
  }
}

const arrangeTest = (props: Partial<Props['jobApplicationStatus']> = {}) =>
  render(
    <TestWrapper>
      <JobApplicationStatusField
        jobApplicationStatus={{
          ...defaultProps.jobApplicationStatus,
          ...props
        }}
      />
    </TestWrapper>
  )

describe('JobApplicationStatusField', () => {
  it('renders if availability request is CONFIRMED', () => {
    arrangeTest()

    const statusLink = screen.getByText('Request Confirmed')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })

  it('renders if talent job application status is APPLIED_AFTER_RECOMMENDATION', () => {
    arrangeTest({
      status: TalentJobApplicationStatusValue.APPLIED_AFTER_RECOMMENDATION
    })

    const statusLink = screen.getByText('Applied after recommendation')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })

  it('renders if talent job application status is RECOMMENDED_FOR_THE_JOB', () => {
    arrangeTest({
      status: TalentJobApplicationStatusValue.RECOMMENDED_FOR_THE_JOB
    })

    const statusLink = screen.getByText('Recommended for the job')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })

  it('renders if engagement status is CANCELLED', () => {
    arrangeTest({
      status: TalentJobApplicationStatusValue.ENGAGED,
      relatedObject: {
        id: 'test-id',
        engagementStatus: EngagementStatus.CANCELLED
      }
    })

    const statusLink = screen.getByText('Engagement Cancelled')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })

  it('renders if engagement status is CANCELLED_DRAFT', () => {
    arrangeTest({
      status: TalentJobApplicationStatusValue.ENGAGED,
      relatedObject: {
        id: 'test-id',
        engagementStatus: EngagementStatus.CANCELLED_DRAFT
      }
    })

    const statusLink = screen.getByText('Engagement Cancelled Draft')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })

  it('renders if job application status is CANCELLED', () => {
    arrangeTest({
      status: TalentJobApplicationStatusValue.ENGAGED,
      relatedObject: {
        id: 'test-id',
        jobApplicationStatus: JobApplicationStatus.ACCEPTED,
        job: {
          id: 'cae6d470'
        }
      }
    })

    const statusLink = screen.getByText('Talent Application Accepted')

    expect(statusLink).toBeInTheDocument()
    expect(statusLink.getAttribute('href')).toEqual(WEB_RESOURCE_LINK)
  })
})
