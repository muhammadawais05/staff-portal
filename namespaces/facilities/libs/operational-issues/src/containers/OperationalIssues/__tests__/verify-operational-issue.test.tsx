import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import { createGetOperationalIssuesMock } from '../../../data/get-operational-issues/mocks'
import OperationalIssues from '../OperationalIssues'
import {
  createVerifyOperationalIssueInvalidMock,
  createVerifyOperationalIssueMock
} from '../../VerifyButton/data/verify-operational-issue/mocks'

const OPERATIONAL_ISSUE_ID = encodeEntityId('0', 'Test')

const arrangeTest = (mocks: MockedResponse[]) => ({
  renderResult: render(
    <TestWrapperWithMocks
      mocks={[
        createGetLazyOperationMock({
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          variables: {
            nodeId: OPERATIONAL_ISSUE_ID,
            nodeType: NodeType.OPERATIONAL_ISSUE,
            operationName: 'verifyOperationalIssue'
          }
        }),
        ...mocks
      ]}
      addTypename={false}
      useCache={false}
    >
      <OperationalIssues />
    </TestWrapperWithMocks>
  )
})

describe('Verify operational issue', () => {
  it('should be able to successfully verify an operational issue', async () => {
    const {
      renderResult: { findByText }
    } = arrangeTest([
      createGetOperationalIssuesMock([
        {
          id: OPERATIONAL_ISSUE_ID,
          operations: {
            resolveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            claimOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }
      ]),
      createVerifyOperationalIssueMock({
        operationalIssueId: OPERATIONAL_ISSUE_ID
      })
    ])

    fireEvent.click(await findByText('Verify'))

    expect(
      await findByText('Operational issue has been verified.')
    ).toBeInTheDocument()
  })

  it('should be able to handle invalid case', async () => {
    const ERROR_MESSAGE =
      "You can't verify operational issue that has already been verified."

    const {
      renderResult: { findByText }
    } = arrangeTest([
      createGetOperationalIssuesMock([
        {
          id: OPERATIONAL_ISSUE_ID,
          operations: {
            resolveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            claimOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          },
          __typename: 'OperationalIssue'
        }
      ]),
      createVerifyOperationalIssueMock(
        {
          operationalIssueId: OPERATIONAL_ISSUE_ID
        },
        {
          success: false,
          errors: [
            {
              code: '',
              key: '',
              message: ERROR_MESSAGE
            }
          ],
          operationalIssue: null
        }
      )
    ])

    const verifyButton = await findByText('Verify')

    fireEvent.click(verifyButton)

    expect(await findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(verifyButton).toBeInTheDocument()
  })

  it('should be able to handle generic error case', async () => {
    const {
      renderResult: { findByText }
    } = arrangeTest([
      createGetOperationalIssuesMock([
        {
          id: OPERATIONAL_ISSUE_ID,
          operations: {
            resolveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            claimOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          },
          __typename: 'OperationalIssue'
        }
      ]),
      createVerifyOperationalIssueInvalidMock({
        operationalIssueId: OPERATIONAL_ISSUE_ID
      })
    ])

    const verifyButton = await findByText('Verify')

    fireEvent.click(verifyButton)

    expect(
      await findByText(
        'An error occurred, the Operation Issue has not been verified.'
      )
    ).toBeInTheDocument()
    expect(verifyButton).toBeInTheDocument()
  })
})
