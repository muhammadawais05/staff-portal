import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CommunityEventList from './CommunityEventList'
import { FAKE_COMMUNITY_EVENTS } from '../../mocks'

describe('CommunityEventList', () => {
  it('renders empty text when there are no community events', () => {
    render(
      <TestWrapper>
        <CommunityEventList communityEvents={[]} />
      </TestWrapper>
    )

    expect(
      screen.getByText('There are no community events for this search criteria')
    ).toBeInTheDocument()
    expect(screen.queryAllByTestId('communityEventListItem')).toHaveLength(0)
  })

  it('renders community event list properly', () => {
    render(
      <TestWrapper>
        <CommunityEventList communityEvents={FAKE_COMMUNITY_EVENTS} />
      </TestWrapper>
    )

    expect(
      screen.queryByText(
        'There are no community events for this search criteria'
      )
    ).not.toBeInTheDocument()
    expect(screen.queryAllByTestId('communityEventListItem')).toHaveLength(2)
  })
})
