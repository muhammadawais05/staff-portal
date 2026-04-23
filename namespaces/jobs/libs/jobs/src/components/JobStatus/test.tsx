import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import {
  Job,
  CumulativeJobStatus,
  JobStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { default as JobStatusComponent } from './JobStatus'

// TODO avoid using non-mocked component https://toptal-core.atlassian.net/browse/SPB-2314
jest.mock('@toptal/picasso/TypographyOverflow', () =>
  jest.requireActual('@toptal/picasso/TypographyOverflow')
)

describe('JobStatus component', () => {
  it('renders with some default styling', async () => {
    const job = {
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      status: JobStatus.ACTIVE
    } as Job

    const { container } = render(
      <TestWrapper>
        <JobStatusComponent job={job} />
      </TestWrapper>
    )

    expect(container.innerHTML).toContain('green')
    expect(container.innerHTML).toContain('semibold')
  })

  it('can render with inherited styling', async () => {
    const job = {
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      status: JobStatus.ACTIVE
    } as Job

    const { container } = render(
      <TestWrapper>
        <JobStatusComponent job={job} inheritStyling />
      </TestWrapper>
    )

    expect(container.innerHTML).toContain('PicassoTypography-inheritWeight')
    expect(container.innerHTML).toContain('PicassoTypography-inherit-')
  })

  it('can render with explicit tooltip message', async () => {
    const job = {
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      status: JobStatus.ACTIVE
    } as Job

    render(
      <TestWrapper>
        <JobStatusComponent job={job} tooltipContent='Test Message' />
      </TestWrapper>
    )

    fireEvent.mouseOver(screen.getByTestId('tooltip-icon'))
    expect(screen.getByText('Test Message')).toBeInTheDocument()
  })

  it('can explicitly not render the tooltip', async () => {
    const job = {
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      status: JobStatus.ACTIVE
    } as Job

    render(
      <TestWrapper>
        <JobStatusComponent
          job={job}
          tooltipContent='Test Message'
          showTooltip={false}
        />
      </TestWrapper>
    )

    expect(screen.queryByTestId('tooltip-icon')).not.toBeInTheDocument()
  })
})
