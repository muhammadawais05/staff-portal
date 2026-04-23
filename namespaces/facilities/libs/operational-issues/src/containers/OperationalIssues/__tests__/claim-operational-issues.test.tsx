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
  createClaimOperationalIssueInvalidMock,
  createClaimOperationalIssueMock
} from '../../ClaimButton/data/claim-operational-issue/mocks'

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
            operationName: 'claimOperationalIssue'
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

describe('Claim operational issue', () => {
  it('should be able to successfully claim an operational issue', async () => {
    const {
      renderResult: { findByText, getByText }
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
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            }
          }
        }
      ]),
      createClaimOperationalIssueMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID
        }
      })
    ])

    fireEvent.click(await findByText('Claim'))

    expect(
      await findByText('Operational issue has been claimed.')
    ).toBeInTheDocument()
    expect(await getByText('Resolve')).toBeInTheDocument()
  })

  it('should be able to handle invalid case', async () => {
    const ERROR_MESSAGE =
      "You can't claim operational issue that has already been claimed."

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
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            }
          }
        }
      ]),
      createClaimOperationalIssueMock(
        {
          input: {
            operationalIssueId: OPERATIONAL_ISSUE_ID
          }
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

    const claimButton = await findByText('Claim')

    fireEvent.click(claimButton)

    expect(await findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(claimButton).toBeInTheDocument()
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
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            approveOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            reopenOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            verifyOperationalIssue: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            }
          }
        }
      ]),
      createClaimOperationalIssueInvalidMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID
        }
      })
    ])

    const claimButton = await findByText('Claim')

    fireEvent.click(claimButton)

    expect(
      await findByText(
        'An error occurred, the Operation Issue has not been claimed.'
      )
    ).toBeInTheDocument()
    expect(claimButton).toBeInTheDocument()
  })
})
