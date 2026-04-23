import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ApproveOnlineTestStepModalForm from './ApproveOnlineTestStepModalForm'
import { GetApproveOnlineTestDataQuery } from '../../data/get-approve-online-test-data/get-approve-online-test-data.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

jest.mock('../../components/CompletedOnlineTest/CompletedOnlineTest', () => ({
  __esModule: true,
  default: () => <>CompletedOnlineTest</>
}))

jest.mock('../../components/PendingOnlineTest/PendingOnlineTest', () => ({
  __esModule: true,
  default: () => <>PendingOnlineTest</>
}))

const useQueryMock = useQuery as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const handleSubmitMock = jest.fn()
const handleHideMock = jest.fn()

const STEP_TITLE = 'Online Test'

type RoleStepType = NonNullable<GetApproveOnlineTestDataQuery['node']>

const renderComponent = (
  onlineTestAttempt?: RoleStepType['onlineTestAttempt']
) => {
  useQueryMock.mockImplementation(() => ({}))
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => {
      onSuccessAction()

      return {
        handleSubmit: handleSubmitMock,
        loading: false
      }
    }
  )

  render(
    <TestWrapper>
      <ApproveOnlineTestStepModalForm
        talentId='talent-id'
        roleStep={{
          id: 'roleStepId',
          claimer: {
            id: 'claimerId',
            fullName: 'Bruce Waine'
          },
          onlineTestAttempt:
            onlineTestAttempt as RoleStepType['onlineTestAttempt'],
          step: { id: 'stepId', title: STEP_TITLE }
        }}
        hideModal={handleHideMock}
      />
    </TestWrapper>
  )
}

describe('ApproveOnlineTestStepModalForm', () => {
  it('renders the modal form without online test attempt', () => {
    renderComponent()

    expect(screen.getByText('Approve Online Test')).toBeInTheDocument()
    expect(screen.getByText('PendingOnlineTest')).toBeInTheDocument()
    expect(screen.getByText('Comment')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Approve Step')).toBeInTheDocument()
  })

  it('renders the modal form with online test attempt', () => {
    renderComponent({
      pureScore: 0,
      finishedAt: '2021-01-15T16:15:07+03:00',
      maxScore: 10
    } as unknown as RoleStepType['onlineTestAttempt'])

    expect(screen.getByText('Approve Online Test')).toBeInTheDocument()
    expect(screen.getByText('CompletedOnlineTest')).toBeInTheDocument()
  })

  it('performs submit handler when a comment exists', async () => {
    renderComponent()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'comment' }
    })

    fireEvent.click(screen.getByTestId('approve-online-test-submit-btn'))

    await act(async () => {
      expect(useModalFormChangeHandlerMock).toHaveBeenCalledTimes(1)
      expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows a validation error when a comment is blank', async () => {
    renderComponent()

    fireEvent.click(screen.getByTestId('approve-online-test-submit-btn'))

    expect(screen.getByText('Please complete this field.')).toBeInTheDocument()

    await act(async () => {
      expect(useModalFormChangeHandlerMock).toHaveBeenCalledTimes(1)
      expect(handleSubmitMock).toHaveBeenCalledTimes(0)
    })
  })
})
