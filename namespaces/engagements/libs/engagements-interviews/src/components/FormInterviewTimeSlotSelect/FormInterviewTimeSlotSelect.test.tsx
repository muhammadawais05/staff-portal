import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TimeSlotType } from '../../types'
import FormInterviewTimeSlotSelect from './FormInterviewTimeSlotSelect'

const OPTIONS: TimeSlotType[] = [
  { date: '2020-01-26', hours: ['11:30 AM', '12:30 PM', '01:00 PM'] },
  { date: '2020-01-27', hours: ['11:15 AM', '11:25 AM', '11:35 AM'] }
]

const renderComponent = ({
  timeSlots,
  timeSlotsLoading
}: {
  timeSlots?: TimeSlotType[]
  timeSlotsLoading: boolean
}) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <FormInterviewTimeSlotSelect
          timeSlotsLoading={timeSlotsLoading}
          timeSlots={timeSlots}
          timeFieldName='time'
          dateFieldName='date'
        />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewTimeSlotSelect', () => {
  it('shows date and time options', async () => {
    renderComponent({ timeSlots: OPTIONS, timeSlotsLoading: false })

    expect(screen.queryByLabelText(/Time/)).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(/Date/))

    fireEvent.click(await screen.findByText('2020-01-26'))

    fireEvent.click(await screen.findByLabelText(/Time/))

    expect(await screen.findByText('12:30 PM')).toBeInTheDocument()
  })

  describe('when `timeSlotsLoading` prop is passed', () => {
    describe('when `timeSLotsLoading` value is `true`', () => {
      it('shows date loader', async () => {
        renderComponent({ timeSlotsLoading: true })

        expect(
          screen.queryByTestId('FormInterviewTimeSlotSelect-date-loader')
        ).toBeInTheDocument()
      })
    })

    describe('when `timeSLotsLoading` value is `false`', () => {
      it('does not show date loader', async () => {
        renderComponent({ timeSlotsLoading: false })

        expect(
          screen.queryByTestId('FormInterviewTimeSlotSelect-date-loader')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when `timeSlots` list is empty', () => {
    it('does not show date loader', async () => {
      renderComponent({ timeSlots: [], timeSlotsLoading: false })

      expect(
        screen.queryByTestId('FormInterviewTimeSlotSelect-date-loader')
      ).not.toBeInTheDocument()
    })
  })
})
