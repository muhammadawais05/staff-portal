import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TaskWithOptionalMetadata } from '@staff-portal/tasks'
import { TaskCardConfig } from '@staff-portal/tasks-cards'

import { CommunityEventFragment } from '../../data/community-event-fragment'
import CommunityEventTaskCard from './CommunityEventTaskCard'
import { useGetCommunityEvent } from './data'
import { createCommunityEventMock } from './data/get-community-event/mock'

jest.mock('./data', () => ({
  __esModule: true,
  useGetCommunityEvent: jest.fn()
}))

const mockedUseGetCommunityEvent = useGetCommunityEvent as jest.Mock

const mockReturnValues = (event?: Partial<CommunityEventFragment>) => {
  const communityEvent = createCommunityEventMock(event)

  mockedUseGetCommunityEvent.mockReturnValue({
    data: communityEvent,
    loading: false
  })
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CommunityEventTaskCard
        taskCardConfig={{ entityId: '1' } as TaskCardConfig}
        task={{} as TaskWithOptionalMetadata}
      />
    </TestWrapper>
  )

describe('CommunityEventTaskCard', () => {
  it('shows the community event task card', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.getByText('Event Name')).toBeInTheDocument()
    expect(screen.getByText('Event Description')).toBeInTheDocument()
    expect(screen.getByText('Fill Typeform')).toBeInTheDocument()
    expect(screen.getByText('Event Short Name')).toBeInTheDocument()
    expect(screen.getByText('Nov 3, 2028')).toBeInTheDocument()
    expect(screen.getByText('Nov 2, 2028')).toBeInTheDocument()

    expect(
      screen.getByText('City Name, State Name, Country Name')
    ).toBeInTheDocument()

    expect(screen.getByText('Fill Typeform').closest('a')).toHaveAttribute(
      'href',
      'https://www.toptal.com'
    )
  })
})
