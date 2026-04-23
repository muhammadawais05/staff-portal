import React from 'react'
import { fireEvent, screen, render, waitFor } from '@testing-library/react'
import {
  RoleStepMainActions,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { Props, useRenderLazyMainAction } from './LazyMainAction'
import { createGetLazyMainActionMock } from './data/get-lazy-main-action/mocks'

const LazyMainAction = ({
  roleStepId,
  initialMainAction,
  onSuccess,
  onFail,
  onSettled,
  children
}: Props) => {
  const renderLazyMainAction = useRenderLazyMainAction({
    roleStepId,
    initialMainAction,
    onSuccess,
    onFail,
    onSettled
  })

  return renderLazyMainAction(children)
}

type arrangeTestProps = {
  mock: MockedResponse
  props: Pick<
    Props,
    'roleStepId' | 'initialMainAction' | 'onFail' | 'onSettled' | 'onSuccess'
  >
}

const arrangeTest = ({ props, mock }: arrangeTestProps) => {
  return render(
    <TestWrapperWithMocks mocks={[mock]} addTypename={false}>
      <LazyMainAction {...props}>
        {({ checkOperation, loading, disabled }) => {
          if (loading) {
            return <div>loading</div>
          }

          if (disabled) {
            return <div>disabled</div>
          }

          return <button onClick={checkOperation}>test</button>
        }}
      </LazyMainAction>
    </TestWrapperWithMocks>
  )
}

describe('LazyMainAction', () => {
  // TODO: https://toptal-core.atlassian.net/browse/SPB-2265
  it.skip('fetches mainAction upon click', async () => {
    const ON_SUCCESS = jest.fn()
    const ON_SETTLED = jest.fn()
    const ROLE_STEP_ID = '123'
    const TEST_MAIN_ACTION = {
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      status: OperationCallableTypes.ENABLED,
      tooltip: ''
    }

    arrangeTest({
      props: {
        roleStepId: ROLE_STEP_ID,
        initialMainAction: TEST_MAIN_ACTION,
        onSuccess: ON_SUCCESS,
        onSettled: ON_SETTLED
      },
      mock: createGetLazyMainActionMock({
        roleStepId: ROLE_STEP_ID,
        mainAction: TEST_MAIN_ACTION
      })
    })

    fireEvent.click(screen.getByText('test'))

    await waitFor(() => {
      expect(ON_SUCCESS).toHaveBeenCalledTimes(1)
      expect(ON_SETTLED).toHaveBeenCalledTimes(1)
    })
  })

  it('shows error message', async () => {
    const ROLE_STEP_ID = '123'
    const INITIAL_ACTION = {
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      status: OperationCallableTypes.ENABLED,
      tooltip: ''
    }
    const RESULT_ACTION = {
      actionName: RoleStepMainActions.APPROVE_PAYMENT_ROLE_STEP,
      status: OperationCallableTypes.ENABLED,
      tooltip: ''
    }

    arrangeTest({
      props: {
        roleStepId: ROLE_STEP_ID,
        initialMainAction: INITIAL_ACTION
      },
      mock: createGetLazyMainActionMock({
        roleStepId: ROLE_STEP_ID,
        mainAction: RESULT_ACTION
      })
    })

    fireEvent.click(screen.getByText('test'))

    expect(
      await screen.findByText(
        'This operation cannot be performed at this moment.'
      )
    ).toBeInTheDocument()
  })

  it('calls error handle function', async () => {
    const ON_FAIL = jest.fn()
    const ROLE_STEP_ID = '123'
    const INITIAL_ACTION = {
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      status: OperationCallableTypes.ENABLED,
      tooltip: ''
    }
    const RESULT_ACTION = {
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      status: OperationCallableTypes.HIDDEN,
      tooltip: ''
    }

    arrangeTest({
      props: {
        roleStepId: ROLE_STEP_ID,
        initialMainAction: INITIAL_ACTION,
        onFail: ON_FAIL
      },
      mock: createGetLazyMainActionMock({
        roleStepId: ROLE_STEP_ID,
        mainAction: RESULT_ACTION
      })
    })

    fireEvent.click(screen.getByText('test'))

    await waitFor(() => expect(ON_FAIL).toHaveBeenCalledTimes(1))
  })

  it('shows disabled state', () => {
    const ROLE_STEP_ID = '123'
    const TEST_MAIN_ACTION = {
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      status: OperationCallableTypes.DISABLED,
      tooltip: ''
    }

    arrangeTest({
      props: {
        roleStepId: ROLE_STEP_ID,
        initialMainAction: TEST_MAIN_ACTION
      },
      mock: createGetLazyMainActionMock({
        roleStepId: ROLE_STEP_ID,
        mainAction: TEST_MAIN_ACTION
      })
    })

    expect(screen.getByText('disabled')).toBeInTheDocument()
  })
})
