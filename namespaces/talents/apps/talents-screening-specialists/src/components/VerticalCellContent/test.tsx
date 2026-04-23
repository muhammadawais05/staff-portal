import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createTalentMock } from '@staff-portal/talents-screening-specialists/src/mocks'

import VerticalCellContent from './VerticalCellContent'

const talent = createTalentMock({
  talentType: 'Designer',
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        specialization: { id: 'test-id', title: 'UX' }
      }
    ]
  }
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <VerticalCellContent talent={talent} />
    </TestWrapper>
  )

describe('VerticalCell', () => {
  it('shows vertical and specialization', () => {
    arrangeTest()

    expect(screen.getByText('Designer - UX')).toBeInTheDocument()
  })
})
