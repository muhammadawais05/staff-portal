import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentProfileJobsEngagementFragment } from '@staff-portal/engagements'

import JobItem from '../JobItem'

jest.mock('../JobItemTitle', () => ({
  __esModule: true,
  default: () => <div data-testid='item-title' />
}))

jest.mock('../JobItemContent', () => ({
  __esModule: true,
  default: () => <div data-testid='item-content' />
}))

const TEST_ENGAGEMENT: TalentProfileJobsEngagementFragment = {
  id: 'test',
  commitment: EngagementCommitmentEnum.FULL_TIME,
  status: EngagementStatus.ACTIVE,
  cumulativeStatus: 'pending',
  talent: {
    type: 'developer'
  },
  client: {
    id: 'test-client',
    fullName: 'test client',
    enterprise: false,
    webResource: {
      text: 'client name'
    }
  }
} as TalentProfileJobsEngagementFragment

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobItem engagement={TEST_ENGAGEMENT} />
    </TestWrapper>
  )

describe('Jobs tab - Job item', () => {
  it('render item title and content', () => {
    arrangeTest()
    expect(screen.getByTestId('item-title')).toBeInTheDocument()
    expect(screen.getByTestId('item-content')).toBeInTheDocument()
  })
})
