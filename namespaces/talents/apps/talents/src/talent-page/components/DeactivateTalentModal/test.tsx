import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { useDeactivateTalent } from './data'
import DeactivateTalentModal from './DeactivateTalentModal'

jest.mock('./data', () => ({
  __esModule: true,
  useDeactivateTalent: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
const useQueryMock = useQuery as jest.Mock

const mockUseDeactivateTalent = useDeactivateTalent as jest.Mock

const mockReturnValues = () => {
  mockUseDeactivateTalent.mockReturnValue([
    () => ({
      data: {
        removeTalent: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
}

const mockErrorImplementation = () => {
  mockUseDeactivateTalent.mockImplementation(
    ({ onError }: { onError: () => void }) => [
      () => {
        onError()
      },
      { loading: false }
    ]
  )
}

const arrangeTest = (hideModal = jest.fn()) => {
  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          removeTalent: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <DeactivateTalentModal
        talentId='id'
        talentType='Developer'
        fullName='Test Name'
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('DeactivateTalentModal', () => {
  it('shows validation message', async () => {
    mockReturnValues()
    arrangeTest()

    expect(
      screen.getByText('Deactivate Developer Test Name')
    ).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByText('Deactivate Developer'))
    })

    expect(screen.getByText('Please complete this field.')).toBeInTheDocument()
  })

  it('deactivates the talent', async () => {
    mockReturnValues()
    arrangeTest()

    act(() => {
      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Deactivate Developer'))
    })

    expect(
      await screen.findByText('Developer was deactivated')
    ).toBeInTheDocument()
  })

  it('shows error message', async () => {
    mockErrorImplementation()
    arrangeTest()

    act(() => {
      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: 'some comment' }
      })

      fireEvent.click(screen.getByText('Deactivate Developer'))
    })
    expect(
      await screen.findByText(
        'An error occurred, the Developer profile was not removed.'
      )
    ).toBeInTheDocument()
  })
})
