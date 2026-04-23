import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SectionAssignmentsLoader from './SectionAssignmentsLoader'

describe('SectionAssignmentsLoader', () => {
  describe('when assignee is defined', () => {
    const title = 'TEST_TITLE'

    it('should show title', () => {
      render(
        <TestWrapper>
          <SectionAssignmentsLoader title={title} />
        </TestWrapper>
      )

      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })
})
