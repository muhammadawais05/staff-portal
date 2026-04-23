import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes, UserError } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, mapToTypename } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import { createGetOperationalIssuesMock } from '../../../data/get-operational-issues/mocks'
import OperationalIssues from '../OperationalIssues'
import {
  ReOpenOperationalIssueDocument,
  ReOpenOperationalIssueMutationVariables
} from '../../ReOpenModal/data/re-open-operational-issue/re-open-operational-issue.staff.gql.types'

const OPERATIONAL_ISSUE_ID = encodeEntityId('0', 'OperationalIssue')

const reOpenIssueMock = ({
  input,
  errors = []
}: {
  input: ReOpenOperationalIssueMutationVariables['input']
  errors?: UserError[]
}) => ({
  request: {
    query: ReOpenOperationalIssueDocument,
    variables: { input }
  },
  result: {
    data: {
      reopenOperationalIssue: {
        success: errors.length === 0,
        errors: mapToTypename(errors, 'UserError'),
        __typename: 'MutationResult'
      }
    }
  }
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
      operationName: 'reopenOperationalIssue'
    }
  })
}

const arrangeTest = (mocks: MockedResponse[]) => ({
  renderResult: render(
    <TestWrapperWithMocks mocks={mocks} addTypename={false} useCache={false}>
      <OperationalIssues />
    </TestWrapperWithMocks>
  )
})

const operations = {
  resolveOperationalIssue: {
    callable: OperationCallableTypes.HIDDEN,
    messages: [],
    __typename: 'Operation'
  },
  claimOperationalIssue: {
    callable: OperationCallableTypes.HIDDEN,
    messages: [],
    __typename: 'Operation'
  },
  approveOperationalIssue: {
    callable: OperationCallableTypes.HIDDEN,
    messages: [],
    __typename: 'Operation'
  },
  verifyOperationalIssue: {
    callable: OperationCallableTypes.HIDDEN,
    messages: [],
    __typename: 'Operation'
  },
  reopenOperationalIssue: {
    callable: OperationCallableTypes.ENABLED,
    messages: [],
    __typename: 'Operation'
  },
  __typename: 'OperationalIssueOperations'
}

describe('Re-open operation issues', () => {
  it('should re-open operational issue', async () => {
    const COMMENT = 'test (acu7as)'

    const {
      renderResult: { findByText, findAllByText, getByPlaceholderText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{ operations }]),
      reOpenIssueMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: COMMENT
        }
      })
    ])

    fireEvent.click(await findByText('Re-Open'))

    expect(await findByText('Re-Open Operational issue')).toBeInTheDocument()

    const reOpenButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element.innerHTML.match('Re-Open')
    )

    fireEvent.change(getByPlaceholderText('Please specify a reason'), {
      target: { value: COMMENT }
    })

    fireEvent.click(reOpenButtons[1])

    expect(
      await findByText('Operational issue has been re-opened.')
    ).toBeInTheDocument()
  })

  it('should be able to handle validation backend error case', async () => {
    const VALIDATION_ERROR_MESSAGE = 'Invalid field value was provided.'
    const COMMENT = 'test (acjd42)'

    const {
      renderResult: { findByText, findAllByText, getByPlaceholderText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{ operations }]),
      reOpenIssueMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: COMMENT
        },
        errors: [
          {
            key: 'comment',
            message: VALIDATION_ERROR_MESSAGE,
            code: 'some-code'
          }
        ]
      })
    ])

    fireEvent.click(await findByText('Re-Open'))

    expect(await findByText('Re-Open Operational issue')).toBeInTheDocument()

    const reOpenButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element.innerHTML.match('Re-Open')
    )

    fireEvent.change(getByPlaceholderText('Please specify a reason'), {
      target: { value: COMMENT }
    })

    fireEvent.click(reOpenButtons[1])

    expect(await findByText(VALIDATION_ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('should be able to handle form-wide backend error case', async () => {
    const ERROR_MESSAGE = "You can't re-open operational issue"
    const COMMENT = 'test (pbo9sn)'

    const {
      renderResult: { findByText, findAllByText, getByPlaceholderText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{ operations }]),
      reOpenIssueMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          comment: COMMENT
        },
        errors: [
          {
            key: 'base',
            message: ERROR_MESSAGE,
            code: 'some-code'
          }
        ]
      })
    ])

    fireEvent.click(await findByText('Re-Open'))

    expect(await findByText('Re-Open Operational issue')).toBeInTheDocument()

    const reOpenButtons = await findAllByText(
      (text, element) =>
        element?.nodeName === 'BUTTON' && !!element.innerHTML.match('Re-Open')
    )

    fireEvent.change(getByPlaceholderText('Please specify a reason'), {
      target: { value: COMMENT }
    })

    fireEvent.click(reOpenButtons[1])

    expect(await findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
