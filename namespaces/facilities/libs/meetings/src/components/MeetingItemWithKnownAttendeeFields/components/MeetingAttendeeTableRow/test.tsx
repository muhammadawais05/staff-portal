import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingAttendeeTableRow from '.'

const arrangeTest = (props: ComponentProps<typeof MeetingAttendeeTableRow>) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <MeetingAttendeeTableRow {...props} />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('MeetingAttendeeTableRow', () => {
  describe('renders', () => {
    it('displays content', () => {
      arrangeTest({
        attendeesLogs: {
          id: 'someId#1',
          name: 'someName#1',
          countryName: 'someCountryName#1',
          meetingJoinTime: '2021-08-23',
          meetingLeaveTime: '2021-08-23'
        }
      })

      expect(screen.getByTestId('attentees-table-row')).toBeInTheDocument()

      expect(screen.getByTestId('table-row-name')).toHaveTextContent(
        'someName#1'
      )

      expect(screen.getByTestId('table-row-countryName')).toHaveTextContent(
        'someCountryName#1'
      )

      expect(screen.getByTestId('table-row-meetingJoinTime')).toHaveTextContent(
        '2021-08-23, 2021-08-23'
      )

      expect(
        screen.getByTestId('table-row-meetingLeaveTime')
      ).toHaveTextContent('2021-08-23, 2021-08-23')
    })
  })
})
