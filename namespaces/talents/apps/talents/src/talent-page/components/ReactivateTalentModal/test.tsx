import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ReactivateTalentModal from './ReactivateTalentModal'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const useQueryMock = useQuery as jest.Mock
const handleSubmitMock = jest.fn()

const COMMENT = 'some comment'
const TALENT_ID = 'TALENT_ID'

const arrangeTest = (hideModal = jest.fn()) => {
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => {
      onSuccessAction()

      return {
        handleSubmit: handleSubmitMock,
        loading: false
      }
    }
  )

  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          reactivateTalent: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <ReactivateTalentModal
        talentId={TALENT_ID}
        talentType='Developer'
        fullName='Test Name'
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('ReactivateTalentModal', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      arrangeTest(hideModal)

      fireEvent.click(screen.getByTestId('modal-cancel-button'))

      expect(hideModal).toHaveBeenCalled()
    })
  })
  describe('when not filling the required fields', () => {
    it('shows validation message', async () => {
      arrangeTest()

      expect(
        screen.getByText('Restore Developer Test Name')
      ).toBeInTheDocument()

      fireEvent.click(screen.getByText('Restore Developer'))

      expect(
        screen.getByText('Please complete this field.')
      ).toBeInTheDocument()
    })
  })
  describe('when submitting filled fields', () => {
    it('handles mutation and closes the modal', async () => {
      const hideModal = jest.fn()

      arrangeTest(hideModal)

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      await act(async () => {
        fireEvent.click(screen.getByText('Restore Developer'))
      })

      expect(handleSubmitMock).toHaveBeenCalledTimes(1)
      expect(handleSubmitMock).toHaveBeenCalledWith({
        talentId: TALENT_ID,
        comment: COMMENT
      })
      expect(hideModal).toHaveBeenCalledTimes(1)
    })
  })
})
