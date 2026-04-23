import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingAttendeeField from './MeetingAttendeeField'

jest.mock('@toptal/picasso/Icon', () => ({
  Check16: () => <div data-testid='svg-check-16' />,
  Close16: () => <div data-testid='svg-close-16' />,
  Pencil16: () => <div data-testid='svg-pencil-16' />
}))

jest.mock('./data', () => ({
  __esModule: true,
  useGetMeetingAttendeesAutocomplete: () => ({
    data: null,
    getMeetingAttendees: jest.fn(),
    loading: false
  }),
  useAssignAttendee: () => [jest.fn()]
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <MeetingAttendeeField meetingId='test-meeting-id' />
    </TestWrapper>
  )

describe('MeetingAttendeeField', () => {
  it('enables edit mode and shows autocomplete on edit button click', () => {
    const { getByTestId } = arrangeTest()

    const editButton = getByTestId('svg-pencil-16')

    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)

    const cancelButton = getByTestId('svg-close-16')
    const approveButton = getByTestId('svg-check-16')
    const autocomplete = getByTestId('autocomplete')

    expect(cancelButton).toBeInTheDocument()
    expect(approveButton).toBeInTheDocument()
    expect(autocomplete).toBeInTheDocument()
    expect(editButton).not.toBeInTheDocument()
  })

  it('closes edit mode and hides autocomplete', async () => {
    const { getByTestId } = arrangeTest()

    const editButton = getByTestId('svg-pencil-16')

    fireEvent.click(editButton)

    const cancelButton = getByTestId('svg-close-16')
    const autocomplete = getByTestId('autocomplete')

    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(getByTestId('svg-pencil-16')).toBeInTheDocument()
      expect(autocomplete).not.toBeInTheDocument()
      expect(getByTestId('svg-pencil-16')).toBeInTheDocument()
    })
  })

  it('show an error message when approving without selected value', async () => {
    window.Element.prototype.scrollIntoView = jest.fn()
    const { getByTestId, findByText } = arrangeTest()
    const editButton = getByTestId('svg-pencil-16')

    fireEvent.click(editButton)

    const approveButton = getByTestId('svg-check-16')

    fireEvent.click(approveButton)

    expect(await findByText('Please complete this field.')).toBeInTheDocument()
  })
})
