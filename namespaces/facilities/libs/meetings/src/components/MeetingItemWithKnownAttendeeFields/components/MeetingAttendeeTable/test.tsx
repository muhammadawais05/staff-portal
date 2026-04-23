import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingAttendeeTable from '.'

const arrangeTest = (props: ComponentProps<typeof MeetingAttendeeTable>) =>
  render(
    <TestWrapper>
      <MeetingAttendeeTable {...props} />
    </TestWrapper>
  )

describe('MeetingAttendeeTable', () => {
  describe('renders', () => {
    it('displays content', () => {
      arrangeTest({
        children: (
          <tr>
            <td>some table content</td>
          </tr>
        )
      })

      expect(screen.getByTestId('attendees-log-table')).toBeInTheDocument()
      expect(screen.getByText('some table content')).toBeInTheDocument()
    })
  })
})
