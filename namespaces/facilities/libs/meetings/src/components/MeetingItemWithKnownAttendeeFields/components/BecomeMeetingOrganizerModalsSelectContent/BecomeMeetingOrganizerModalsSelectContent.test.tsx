import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'

import BecomeMeetingOrganizerModalsSelectContent, {
  Props
} from './BecomeMeetingOrganizerModalsSelectContent'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='ModalSuspender' />
}))

jest.mock('@staff-portal/data-layer-service')

const mockQuery = (
  loading = false,
  data?: {
    node?: { possibleSchedulersForBecomeOrganizer: { nodes: unknown[] } }
  }
) => {
  const mockUseQuery = useQuery as jest.Mock

  mockUseQuery.mockReturnValue({ data, loading })
}

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
      <BecomeMeetingOrganizerModalsSelectContent
        id='5'
        setSelectedScheduler={jest.fn()}
        hideModal={jest.fn()}
        scheduledAt='2022-12-20T00:00:00+00:00'
        durationMinutes={30}
        organizer={DEFAULT_ORGANIZER}
        {...props}
      />
    </TestWrapper>
  )

describe('BecomeMeetingOrganizerModalsSelectContent', () => {
  describe('when the component is loading', () => {
    it('renders the modal suspender', () => {
      mockQuery(true)
      renderComponent()

      expect(screen.getByTestId('ModalSuspender')).toBeInTheDocument()
      expect(
        screen.queryByText('Assign self as organizer')
      ).not.toBeInTheDocument()
    })
  })

  describe('when the component is loaded', () => {
    it('renders the correct fields and title', () => {
      mockQuery(false, {
        node: {
          possibleSchedulersForBecomeOrganizer: {
            nodes: []
          }
        }
      })

      renderComponent()

      expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()

      expect(screen.getByText('Assign self as organizer')).toBeInTheDocument()

      expect(
        screen.queryByTestId('assign-self-as-organizer-select')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('current-meeting-organizer-select')
      ).toBeInTheDocument()
    })
  })
})
