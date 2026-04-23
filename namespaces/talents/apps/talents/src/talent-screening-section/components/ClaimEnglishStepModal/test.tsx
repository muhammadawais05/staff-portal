import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ClaimEnglishStepModal from './ClaimEnglishStepModal'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock

const arrangeTest = () => {
  mockUseQuery.mockReturnValue({
    data: {
      node: {
        step: {
          id: '123',
          title: 'English'
        },
        talent: {
          id: '123',
          fullName: 'Talent Name'
        }
      }
    },
    loading: false,
    initialLoading: false
  })
  mockUseModalFormChangeHandler.mockReturnValue({
    handleSubmit: jest.fn()
  })

  return render(
    <TestWrapperWithMocks>
      <ClaimEnglishStepModal
        roleStepId='123'
        hideModal={jest.fn()}
        talentId='talent-id'
      />
    </TestWrapperWithMocks>
  )
}

describe('ClaimEnglishStepModal', () => {
  it('shows the claim english step modal', async () => {
    arrangeTest()

    expect(screen.getByText('Claim English')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Are you sure you want to claim the English step for Talent Name?'
      )
    ).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(screen.getByText('Claim English Step'))
    })

    expect(mockUseModalFormChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: expect.objectContaining({
          successNotificationMessage:
            'The English Step was successfully claimed and assigned to you.'
        })
      })
    )
  })
})
