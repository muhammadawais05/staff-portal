import { ApolloError, useQuery } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'

import { GetRescheduleInternalInterviewOperationDocument } from './data'
import RescheduleInternalInterviewModal from './RescheduleInternalInterviewModal'

jest.mock(
  './components/RescheduleInternalInterviewModalContent/RescheduleInternalInterviewModalContent',
  () => ({
    __esModule: true,
    default: () => (
      <div data-testid='reschedule-internal-interview-modal-content' />
    )
  })
)

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='modal-suspender' />
}))

const mockUseQuery = useQuery as jest.Mock

const mockGetInterviewOperation = ({
  callable = OperationCallableTypes.ENABLED,
  error,
  loading = false
}: {
  loading?: boolean
  error?: ApolloError
  callable?: OperationCallableTypes
} = {}) => {
  when(mockUseQuery)
    .calledWith(
      GetRescheduleInternalInterviewOperationDocument,
      expect.anything()
    )
    .mockImplementation(() => ({
      loading,
      error,
      data: {
        node: {
          operations: {
            clearAndRescheduleInternalSingleCommitInterview: {
              callable: callable,
              messages: []
            },
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: callable,
              messages: []
            }
          }
        }
      }
    }))
}

const renderComponent = () => {
  render(
    <TestWrapper>
      <RescheduleInternalInterviewModal
        interviewId='123'
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('RescheduleInternalInterviewModal', () => {
  describe('when loading', () => {
    it('shows the modal suspender', () => {
      mockGetInterviewOperation({ loading: true })
      renderComponent()

      expect(screen.getByTestId('modal-suspender')).toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-internal-interview-modal-content')
      ).not.toBeInTheDocument()
    })
  })

  describe('when the operation is now enabled', () => {
    it('shows the error message', () => {
      const ERROR_MESSAGE = 'Some error message'

      mockGetInterviewOperation({
        callable: OperationCallableTypes.DISABLED,
        error: { message: ERROR_MESSAGE } as ApolloError
      })
      renderComponent()

      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
      expect(screen.queryByTestId('modal-suspender')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-internal-interview-modal-content')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('shows modal content', async () => {
      mockGetInterviewOperation()
      renderComponent()

      expect(screen.queryByTestId('modal-suspender')).not.toBeInTheDocument()
      expect(
        await screen.findByTestId('reschedule-internal-interview-modal-content')
      ).toBeInTheDocument()
    })
  })
})
