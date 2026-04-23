import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import DisableEmbeddedSigningModal from './DisableEmbeddedSigningModal'
import { useDisableEmbeddedSigning } from './data'

const mockDisableEmbeddedSigning = jest.fn()
const mockOnClose = jest.fn()

jest.mock('./data', () => ({
  useDisableEmbeddedSigning: () => [
    mockDisableEmbeddedSigning,
    { loading: false }
  ]
}))

const arrangeTest = () => {
  render(
    <TestWrapper>
      <DisableEmbeddedSigningModal companyId='123' hideModal={mockOnClose} />
    </TestWrapper>
  )
}

type DisableEmbeddedSigningVariables = Parameters<
  ReturnType<typeof useDisableEmbeddedSigning>[0]
>[0]

describe('DisableEmbeddedSigningModal', () => {
  it('renders modal', () => {
    arrangeTest()

    expect(
      screen.getByText('Disable Embedded Contract Signing')
    ).toBeInTheDocument()
  })

  it('calls mutation when form is sent', async () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'my_comment' }
    })

    fireEvent.click(screen.getByText('Disable Embedded Signing'))
    await act(() => Promise.resolve())

    const expectedVariables: DisableEmbeddedSigningVariables = {
      variables: {
        input: {
          clientId: '123',
          comment: 'my_comment'
        }
      }
    }

    expect(mockDisableEmbeddedSigning).toHaveBeenCalledWith(expectedVariables)
  })

  it('closes modal on cancel click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockOnClose).toHaveBeenCalled()
  })
})
