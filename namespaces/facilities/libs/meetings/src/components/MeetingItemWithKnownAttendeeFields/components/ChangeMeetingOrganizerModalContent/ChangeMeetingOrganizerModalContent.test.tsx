import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeMeetingOrganizerModalContent, {
  Props
} from './ChangeMeetingOrganizerModalContent'
import { useGetPossibleSchedulers } from './data/get-possible-organizers'

jest.mock('./data/get-possible-organizers')
jest.mock('../ChangeOrganizerPossibleSchedulersAutocomplete', () => ({
  __esModule: true,
  default: () => <div data-testid='autocomplete' />
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='ModalSuspender' />
}))

const useGetPossibleSchedulersMocked = useGetPossibleSchedulers as jest.Mock

const DEFAULT_ORGANIZER = {
  id: '10',
  fullName: 'Test Meeting Organizer',
  webResource: {
    text: 'Test Meeting Organizer'
  }
}

const renderComponent = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <ChangeMeetingOrganizerModalContent
        id='5'
        setSelectedScheduler={jest.fn()}
        hideModal={jest.fn()}
        organizer={DEFAULT_ORGANIZER}
        {...props}
      />
    </TestWrapper>
  )

describe('ChangeMeetingOrganizerModalContent', () => {
  describe('when the component is loading', () => {
    it('renders the modal suspender', () => {
      useGetPossibleSchedulersMocked.mockReturnValue({
        loading: true
      })

      renderComponent()

      expect(screen.getByTestId('ModalSuspender')).toBeInTheDocument()
      expect(screen.queryByText('Change Organizer')).not.toBeInTheDocument()
    })
  })

  describe('when selecting the scheduler with autocomplete', () => {
    it('renders the title and autocomplete field', () => {
      useGetPossibleSchedulersMocked.mockReturnValue({
        data: {
          showPossibleSchedulersAutocomplete: true,
          possibleSchedulers: []
        },
        loading: false
      })

      renderComponent()

      expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
      expect(screen.getByText('Change Organizer')).toBeInTheDocument()
      expect(screen.queryByTestId('scheduler-select')).not.toBeInTheDocument()
      expect(screen.getByTestId('autocomplete')).toBeInTheDocument()
    })
  })

  describe('when selecting the scheduler with regular dropdown', () => {
    it('renders the select field', () => {
      useGetPossibleSchedulersMocked.mockReturnValue({
        data: {
          showPossibleSchedulersAutocomplete: false,
          possibleSchedulers: [
            {
              id: 1,
              code: 'booking-page-one',
              role: { id: 1, fullName: 'Luke Skywalker' }
            },
            {
              id: 2,
              code: 'booking-page-two',
              role: { id: 2, fullName: 'Jimmy Hendrix' }
            }
          ]
        },
        loading: false
      })

      renderComponent()

      expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
      expect(screen.getByText('Change Organizer')).toBeInTheDocument()
      expect(screen.getByTestId('scheduler-select')).toBeInTheDocument()
      expect(screen.queryByTestId('autocomplete')).not.toBeInTheDocument()
    })
  })
})
