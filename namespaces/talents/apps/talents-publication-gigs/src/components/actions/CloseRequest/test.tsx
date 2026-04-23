import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import CloseRequest from './CloseRequest'
import CloseRequestModal from '../CloseRequestModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

describe('CloseRequest', () => {
  const showModal = jest.fn()

  beforeEach(() => {
    const useModalMock = useModal as jest.Mock

    useModalMock.mockReturnValue({ showModal })
  })

  it('renders correctly', () => {
    render(
      <TestWrapper>
        <CloseRequest gigId='abc' />
      </TestWrapper>
    )

    expect(screen.getByTestId('CloseButton')).toHaveTextContent('Close Request')
  })

  it('handles button click', () => {
    render(
      <TestWrapper>
        <CloseRequest gigId='abc' />
      </TestWrapper>
    )

    fireEvent.click(screen.getByTestId('CloseButton'))

    expect(useModal).toHaveBeenCalledWith(
      CloseRequestModal,
      expect.objectContaining({
        gigId: 'abc'
      })
    )
  })
})
