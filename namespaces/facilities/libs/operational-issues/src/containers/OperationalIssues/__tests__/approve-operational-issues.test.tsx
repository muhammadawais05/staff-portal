import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { UserError, OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, mapToTypename } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import { createGetOperationalIssuesMock } from '../../../data/get-operational-issues/mocks'
import OperationalIssues from '../OperationalIssues'
import { ApproveOperationalIssueDocument } from '../../ApproveModal/data/approve-operational-issue/approve-operational-issue.staff.gql.types'

const OPERATIONAL_ISSUE_ID = encodeEntityId('0', 'OperationalIssue')

const createApproveIssueMock = ({
  variables: { operationalIssueId, comment },
  errors = [],
  success = true
}: {
  variables: { [key: string]: string | string[] }
  errors?: UserError[]
  success?: boolean
}) => ({
  request: {
    query: ApproveOperationalIssueDocument,
    variables: {
      operationalIssueId,
      comment
    }
  },
  newData: () => ({
    data: {
      approveOperationalIssue: {
        success,
        errors: mapToTypename(errors, 'UserError'),
        __typename: 'MutationResult'
      }
    }
  })
})

const createOperationMock = (id: string) => {
  return createGetLazyOperationMock({
    operation: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    variables: {
      nodeId: id,
      nodeType: NodeType.OPERATIONAL_ISSUE,
      operationName: 'approveOperationalIssue'
    }
  })
}

const arrangeTest = (mocks: MockedResponse[]) => ({
  renderResult: render(
    <TestWrapperWithMocks mocks={mocks}>
      <OperationalIssues />
    </TestWrapperWithMocks>
  )
})

describe('operation issues', () => {
  it('should approve operational issue without comment', async () => {
    const {
      renderResult: { findByText, findAllByText }
    } = arrangeTest([
      createGetOperationalIssuesMock([{}]),
      createApproveIssueMock({
        variables: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: ''
        }
      }),
      createOperationMock(OPERATIONAL_ISSUE_ID)
    ])

    fireEvent.click(await findByText('Approve'))

    expect(await findByText('Approve Operational issue')).toBeInTheDocument()

    const approveButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element.innerHTML.match('Approve')
    )

    fireEvent.click(approveButtons[1])

    expect(
      await findByText('Operational issue has been approved.')
    ).toBeInTheDocument()
  })

  it('should approve operational issue with comment', async () => {
    const COMMENT = 'test'

    const {
      renderResult: { findByText, findAllByText, getByPlaceholderText }
    } = arrangeTest([
      createGetOperationalIssuesMock([{}]),
      createApproveIssueMock({
        variables: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: COMMENT
        }
      }),
      createOperationMock(OPERATIONAL_ISSUE_ID)
    ])

    fireEvent.click(await findByText('Approve'))

    expect(await findByText('Approve Operational issue')).toBeInTheDocument()

    fireEvent.change(getByPlaceholderText('Please specify a reason'), {
      target: { value: COMMENT }
    })

    const approveButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element?.innerHTML.match('Approve')
    )

    fireEvent.click(approveButtons[1])

    expect(
      await findByText('Operational issue has been approved.')
    ).toBeInTheDocument()
  })

  it('should be able to handle generic error case', async () => {
    const COMMENT = 'test'
    const ERROR_MESSAGE = "You can't approve operational issue"

    const {
      renderResult: { findByText, findAllByText, getByPlaceholderText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{}]),
      createApproveIssueMock({
        variables: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: COMMENT
        },
        errors: [
          {
            code: 'approved',
            key: 'base',
            message: ERROR_MESSAGE
          }
        ],
        success: false
      })
    ])

    fireEvent.click(await findByText('Approve'))

    expect(await findByText('Approve Operational issue')).toBeInTheDocument()

    const approveButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element.innerHTML.match('Approve')
    )

    fireEvent.change(getByPlaceholderText('Please specify a reason'), {
      target: { value: COMMENT }
    })

    fireEvent.click(approveButtons[1])

    expect(await findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
