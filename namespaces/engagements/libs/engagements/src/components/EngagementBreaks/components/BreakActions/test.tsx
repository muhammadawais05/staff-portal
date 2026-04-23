import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { createEngagementBreakMock } from '../../mocks'
import BreakActions from './BreakActions'

jest.mock('../DeleteBreakButton')
jest.mock('../EditBreakButton')

const arrangeTest = () =>
  render(
    <TestWrapper>
      <BreakActions
        engagementId='123'
        node={createEngagementBreakMock()}
        engagementStatus={EngagementStatus.ACTIVE}
      />
    </TestWrapper>
  )

describe('BreakActions', () => {
  it('renders buttons', () => {
    arrangeTest()

    expect(screen.getByTestId('DeleteBreakButton')).toBeInTheDocument()
    expect(screen.getByTestId('EditBreakButton')).toBeInTheDocument()
  })
})
