import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  useGetLazyOperation
} from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import {
  crateTalentQuizQuestionMock,
  createDestroyTalentQuizQuestionMock,
  createDestroyTalentQuizQuestionFailedMock
} from './data/destroy-talent-quiz-question/mocks'
import DeleteQuestionButton from './DeleteQuestionButton'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation/get-lazy-operation.gql'
)

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

const arrangeTest = async (
  callable: OperationCallableTypes,
  mocks?: MockedResponse[]
) => {
  const OPERATION = {
    callable,
    messages: []
  }

  const mockedTalentQuizQuestion = crateTalentQuizQuestionMock({
    id: mockedTalentQuizQuestionId,
    operations: {
      destroyTalentQuizQuestion: OPERATION
    }
  })

  mockUseGetLazyOperation.mockImplementation(
    (
      _,
      {
        onCompleted
      }: {
        onCompleted: (data: GetLazyOperationQuery) => void
      }
    ) => [
      () =>
        onCompleted({
          node: {
            operations: { destroyTalentQuizQuestion: OPERATION }
          }
        }),
      {
        data: {
          loading: false,
          node: {
            operations: { destroyTalentQuizQuestion: OPERATION }
          }
        }
      }
    ]
  )

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <DeleteQuestionButton question={mockedTalentQuizQuestion} />
    </TestWrapperWithMocks>
  )
}

const mockedTalentQuizQuestionId = '123'

describe('DeleteQuestionButton', () => {
  const mockedHandleMutationResult = jest.fn()

  beforeEach(() => {
    useHandleMutationResultMock.mockReturnValue({
      handleMutationResult: mockedHandleMutationResult
    })
  })

  describe('when delete is enabled', () => {
    it('shows delete button', () => {
      arrangeTest(OperationCallableTypes.ENABLED)

      expect(
        screen.getByTestId(
          `DeleteQuestionButton-delete-button-${mockedTalentQuizQuestionId}`
        )
      ).toBeInTheDocument()
    })

    it('handles delete success', async () => {
      const destroyTalentQuizQuestionMock = createDestroyTalentQuizQuestionMock(
        {
          talentQuizQuestionId: mockedTalentQuizQuestionId
        }
      )

      arrangeTest(OperationCallableTypes.ENABLED, [
        destroyTalentQuizQuestionMock
      ])

      expect(
        screen.getByTestId(
          `DeleteQuestionButton-delete-button-${mockedTalentQuizQuestionId}`
        )
      ).toBeInTheDocument()

      fireEvent.click(
        screen.getByTestId(
          `DeleteQuestionButton-delete-button-${mockedTalentQuizQuestionId}`
        )
      )

      expect(
        screen.getByText('Do you really want to delete this question?')
      ).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /Delete Question/i }))

      await waitFor(() => {
        expect(mockedHandleMutationResult).toHaveBeenCalledWith({
          successNotificationMessage: 'The question was successfully deleted.',
          mutationResult:
            destroyTalentQuizQuestionMock.result.data.destroyTalentQuizQuestion
        })
      })
    })

    it('handles delete failure', async () => {
      const destroyTalentQuizQuestionMock =
        createDestroyTalentQuizQuestionFailedMock({
          talentQuizQuestionId: mockedTalentQuizQuestionId
        })

      arrangeTest(OperationCallableTypes.ENABLED, [
        destroyTalentQuizQuestionMock
      ])
      fireEvent.click(
        screen.getByTestId(
          `DeleteQuestionButton-delete-button-${mockedTalentQuizQuestionId}`
        )
      )
      fireEvent.click(screen.getByRole('button', { name: /Delete Question/i }))

      await waitFor(() => {
        expect(
          screen.getByText('An error occurred, the Question was not deleted.')
        ).toBeInTheDocument()
      })
    })
  })

  describe('when delete is disabled', () => {
    it('disables delete button', () => {
      arrangeTest(OperationCallableTypes.DISABLED)

      expect(
        screen.getByTestId(
          `DeleteQuestionButton-delete-button-${mockedTalentQuizQuestionId}`
        )
      ).toBeDisabled()
    })
  })

  describe('when delete is hidden', () => {
    it('hides delete button', () => {
      arrangeTest(OperationCallableTypes.HIDDEN)

      expect(
        screen.queryByTestId('DeleteQuestionButton-delete-button')
      ).not.toBeInTheDocument()
    })
  })
})
