import React from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'
import {
  createGetCallRequestMock,
  GetCallRequestMockProps
} from '@staff-portal/clients-call-requests/src/mocks'
import {
  useGetCallRequest,
  GetCallRequestQuery
} from '@staff-portal/clients-call-requests'

import CallRequestItem from './CallRequestItem'
import { CallRequestModalName } from '../../../../enums'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock(
  '@staff-portal/clients-call-requests/src/data/get-call-request/get-call-request.staff.gql.ts',
  () => ({
    useGetCallRequest: jest.fn()
  })
)

const useGetCallRequestMock = useGetCallRequest as jest.Mock
const useModalMock = useModal as jest.Mock

const defaultProps = {
  id: 'VjEtQ2FsbGJhY2tSZXF1ZXN0LTEwMTQ1MQ',
  modal: ''
}

const arrangeTest = ({
  data,
  loading = false,
  ...props
}: {
  id: string
  modal: string
  data: GetCallRequestQuery['node']
  loading?: boolean
}) => {
  const showModal = jest.fn()

  useModalMock.mockReturnValue({ showModal })
  useGetCallRequestMock.mockImplementation(() => {
    return {
      data,
      loading
    }
  })

  render(
    <TestWrapperWithMocks>
      <CallRequestItem {...props} />
    </TestWrapperWithMocks>
  )

  return { showModal }
}

const createMock = (props: GetCallRequestMockProps) =>
  createGetCallRequestMock(props).result.data
    .node as GetCallRequestQuery['node']

describe('CallRequestItem', () => {
  it('shows the call request', async () => {
    const name = 'Test Name'
    const mock = createMock({ id: defaultProps.id, name })

    arrangeTest({ data: mock, ...defaultProps })

    expect(await screen.findByText(name)).toBeInTheDocument()
  })

  it('renders the call request skeleton', () => {
    const name = 'Test Name'
    const mock = createMock({ id: defaultProps.id, name })

    arrangeTest({ data: mock, ...defaultProps, loading: true })
    expect(screen.getByTestId('call-request-item-skeleton')).toBeInTheDocument()
  })

  it('automatically opens the claim call request modal', async () => {
    const mock = createMock({ id: defaultProps.id })

    const { showModal } = arrangeTest({
      data: mock,
      ...defaultProps,
      modal: CallRequestModalName.CLAIM
    })

    expect(showModal).toHaveBeenCalledTimes(1)
  })

  it('shows an error if you try to automatically open the claim call request modal when the operation is hidden', async () => {
    const hiddenOperation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    }

    const mock = createMock({
      id: defaultProps.id,
      claimCallRequestOperation: hiddenOperation,
      claimCallbackRequestWithClientOperation: hiddenOperation
    })

    arrangeTest({
      data: mock,
      ...defaultProps,
      modal: CallRequestModalName.CLAIM
    })

    expect(
      await screen.findByText(
        'This operation cannot be performed at this moment.'
      )
    ).toBeInTheDocument()
  })

  it('shows an error if you try to automatically open the claim call request modal when the operation is disabled', async () => {
    const disabledOperation = {
      callable: OperationCallableTypes.DISABLED,
      messages: [],
      __typename: 'Operation'
    }

    const mock = createMock({
      id: defaultProps.id,
      claimCallRequestOperation: disabledOperation,
      claimCallbackRequestWithClientOperation: disabledOperation
    })

    arrangeTest({
      data: mock,
      ...defaultProps,
      modal: CallRequestModalName.CLAIM
    })

    expect(
      await screen.findByText(
        'This operation cannot be performed at this moment.'
      )
    ).toBeInTheDocument()
  })
})
