import React from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import CallRequestListItem from '../CallRequestListItem'
import { createCallRequestMock } from '../../../data/call-request-fragment/mocks'
import { CallRequestFragment } from '../../../data/call-request-fragment'

const CLAIM_BUTTON_TEXT = /^Claim$/i
const REMOVE_BUTTON_TEXT = /^Remove$/i

const arrangeTest = (data: CallRequestFragment) => {
  render(
    <TestWrapperWithMocks>
      <CallRequestListItem data={data} />
    </TestWrapperWithMocks>
  )
}

describe('Call Request List Item', () => {
  it('"Claim" and "Remove" buttons should be shown when operations are enabled', async () => {
    arrangeTest(
      createCallRequestMock({
        operations: {
          claimCallbackRequest: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          claimCallbackRequestWithClient: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          removeCallbackRequest: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'CallbackRequestOperations'
        }
      })
    )

    expect(screen.getByText(CLAIM_BUTTON_TEXT)).toBeInTheDocument()
    expect(screen.getByText(REMOVE_BUTTON_TEXT)).toBeInTheDocument()
  })

  it('"Claim" and "Remove" buttons should be hidden when operations are hidden', async () => {
    arrangeTest(
      createCallRequestMock({
        operations: {
          claimCallbackRequest: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          claimCallbackRequestWithClient: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          removeCallbackRequest: {
            callable: OperationCallableTypes.HIDDEN,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'CallbackRequestOperations'
        }
      })
    )

    expect(screen.queryByText(CLAIM_BUTTON_TEXT)).not.toBeInTheDocument()
    expect(screen.queryByText(REMOVE_BUTTON_TEXT)).not.toBeInTheDocument()
  })

  it('"Remove" button should be hidden when remove operation is allowed but Call Request is obscure', async () => {
    const callRequest = createCallRequestMock({
      obscureLead: true,
      client: null,
      operations: {
        claimCallbackRequest: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        claimCallbackRequestWithClient: {
          callable: OperationCallableTypes.HIDDEN,
          messages: [],
          __typename: 'Operation'
        },
        removeCallbackRequest: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'CallbackRequestOperations'
      }
    })

    arrangeTest(callRequest)

    expect(screen.queryByText(REMOVE_BUTTON_TEXT)).not.toBeInTheDocument()
  })
})
