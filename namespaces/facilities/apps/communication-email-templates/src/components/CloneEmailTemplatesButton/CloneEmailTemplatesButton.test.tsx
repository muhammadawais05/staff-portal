import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import CloneEmailTemplatesButton from './CloneEmailTemplatesButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CloneEmailTemplatesButton />
    </TestWrapper>
  )

describe('CloneEmailTemplatesButton', () => {
  it('opens the clone email template modal', () => {
    const mockShowModal = jest.fn()

    mockUseModal.mockReturnValue({ showModal: mockShowModal })

    arrangeTest()

    fireEvent.click(screen.getByRole('button'))

    expect(mockShowModal).toHaveBeenCalledTimes(1)
  })
})
