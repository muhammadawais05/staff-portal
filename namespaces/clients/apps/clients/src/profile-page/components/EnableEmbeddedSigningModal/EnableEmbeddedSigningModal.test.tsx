import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EnableEmbeddedSigningModal from './EnableEmbeddedSigningModal'
import { useEnableEmbeddedSigning } from './data'

const mockEnableEmbeddedSigning = jest.fn()
const mockOnClose = jest.fn()

jest.mock('./data', () => ({
  useEnableEmbeddedSigning: () => [
    mockEnableEmbeddedSigning,
    { loading: false }
  ]
}))

const arrangeTest = () => {
  render(
    <TestWrapper>
      <EnableEmbeddedSigningModal companyId='123' hideModal={mockOnClose} />
    </TestWrapper>
  )
}

type EnableEmbeddedSigningVariables = Parameters<
  ReturnType<typeof useEnableEmbeddedSigning>[0]
>[0]

describe('EnableEmbeddedSigningModal', () => {
  it('renders modal', () => {
    arrangeTest()

    expect(
      screen.getByText('Enable Embedded Contract Signing')
    ).toBeInTheDocument()
  })

  it('calls mutation when form is sent', async () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'my_comment' }
    })

    fireEvent.click(screen.getByText('Enable Embedded Signing'))
    await act(() => Promise.resolve())

    const expectedVariables: EnableEmbeddedSigningVariables = {
      variables: {
        input: {
          clientId: '123',
          comment: 'my_comment'
        }
      }
    }

    expect(mockEnableEmbeddedSigning).toHaveBeenCalledWith(expectedVariables)
  })

  it('closes modal on cancel click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockOnClose).toHaveBeenCalled()
  })
})
