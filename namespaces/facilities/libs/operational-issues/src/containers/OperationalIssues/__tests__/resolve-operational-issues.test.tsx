import React from 'react'
import {
  fireEvent,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react'
import {
  UserError,
  ResolveOperationalIssueInput,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, mapToTypename } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import { createGetOperationalIssuesMock } from '../../../data/get-operational-issues/mocks'
import OperationalIssues from '../OperationalIssues'
import { ResolveOperationalIssueDocument } from '../../ResolveModal/data/resolve-operational-issue/resolve-operational-issue.staff.gql.types'
import { createGetEnabledCausesMock } from '../../ResolveModal/data/get-enabled-causes/mocks'
import { OperationalIssueFragment } from '../../../data/operational-issue-fragment/operational-issue-fragment.staff.gql.types'

const resolveIssueMock = ({
  input,
  errors = []
}: {
  input: ResolveOperationalIssueInput
  errors?: Omit<UserError, 'code'>[]
}) => ({
  request: {
    query: ResolveOperationalIssueDocument,
    variables: { input }
  },
  result: {
    data: {
      resolveOperationalIssue: {
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
      operationName: 'resolveOperationalIssue'
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

const OPERATIONAL_ISSUE_ID = encodeEntityId('0', 'Test')

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('operation issues', () => {
  it('resolve operational issue', async () => {
    const RESOLUTION = 'Resolution (acki3s)'
    const OBSERVATION = 'Observation (apv83s)'
    const OPERATIONAL_ISSUE_NAME =
      'Resolve Send first candidate time Operational Issue'
    const ENABLED_CAUSE_ID = encodeEntityId('1000', 'Test')
    const ENABLED_CAUSE_NAME = 'Test Enabled Cause'

    const {
      renderResult: { findByText, getByText, getByLabelText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{}]),
      createGetEnabledCausesMock([
        { id: encodeEntityId('1000', 'Test'), name: ENABLED_CAUSE_NAME }
      ]),
      resolveIssueMock({
        input: {
          operationalIssueId: OPERATIONAL_ISSUE_ID,
          observation: OBSERVATION,
          resolution: RESOLUTION,
          causeIds: [ENABLED_CAUSE_ID],
          otherCauseReason: null
        }
      })
    ])

    fireEvent.click(await findByText('Resolve'))

    // *ByRole() is not locating the progressbar
    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(getByText(OPERATIONAL_ISSUE_NAME)).toBeInTheDocument()
    expect(getByText(ENABLED_CAUSE_NAME)).toBeInTheDocument()

    fireEvent.click(getByLabelText(ENABLED_CAUSE_NAME))
    fireEvent.change(getByLabelText('*Resolution'), {
      target: { value: RESOLUTION }
    })
    fireEvent.change(getByLabelText('*Observation'), {
      target: { value: OBSERVATION }
    })

    fireEvent.click(getByText('Resolve Issue').parentElement as HTMLElement)

    expect(
      await findByText('Operational issue has been resolved.')
    ).toBeInTheDocument()
  })

  it('should reload properly the action items after resolve an operational issue', async () => {
    const RESOLUTION = 'Resolution (acki3s)'
    const OBSERVATION = 'Observation (apv83s)'
    const OPERATIONAL_ISSUE_DESCRIPTION =
      'Rodney deJong has at least one task that is overdue more than 48 hours.'

    const ENABLED_CAUSE_NAME = 'On Vacation'
    const ENABLED_CAUSE_ID = 'VjEtT3BlcmF0aW9uYWxJc3N1ZUNhdXNlVGVtcGxhdGUtMjEx'

    const RESOLVE_OPERATIONAL_ISSUE_ID = 'VjEtT3BlcmF0aW9uYWxJc3N1ZS0xNDQ4MzA'
    const TEMPLATE_ID = 'VjEtT3BlcmF0aW9uYWxJc3N1ZVRlbXBsYXRlLTEwMjc'
    const TEMPLATE_NAME = 'Task overdue more than 48 hours'
    const MODAL_TITLE = `Resolve ${TEMPLATE_NAME} Operational Issue`

    const previousOperations = {
      approveOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      claimOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      reopenOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      resolveOperationalIssue: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      verifyOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'OperationalIssueOperations'
    }

    const reloadedOperations = {
      approveOperationalIssue: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      claimOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      reopenOperationalIssue: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      resolveOperationalIssue: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      verifyOperationalIssue: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'OperationalIssueOperations'
    }

    const template = {
      id: TEMPLATE_ID,
      name: TEMPLATE_NAME,
      recommendedSolutions: 'Some recommended solution',
      __typename: 'OperationalIssueTemplate'
    }

    const previousOperationalIssue: Partial<OperationalIssueFragment> = {
      id: RESOLVE_OPERATIONAL_ISSUE_ID,
      description: OPERATIONAL_ISSUE_DESCRIPTION,
      occurrencesCount: 1,
      operations: previousOperations,
      template
    }

    const reloadedOperationalIssue: Partial<OperationalIssueFragment> = {
      ...previousOperationalIssue,
      operations: reloadedOperations
    }

    const enabledCause = {
      id: ENABLED_CAUSE_ID,
      name: ENABLED_CAUSE_NAME
    }

    const {
      renderResult: { findByText, getByText, getByLabelText, queryByText }
    } = arrangeTest([
      createOperationMock(RESOLVE_OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([previousOperationalIssue]),
      createGetEnabledCausesMock([enabledCause], TEMPLATE_ID),
      resolveIssueMock({
        input: {
          operationalIssueId: RESOLVE_OPERATIONAL_ISSUE_ID,
          observation: OBSERVATION,
          resolution: RESOLUTION,
          causeIds: [ENABLED_CAUSE_ID],
          otherCauseReason: null
        }
      }),
      createGetOperationalIssuesMock([reloadedOperationalIssue])
    ])

    // Finds the operational issue
    expect(await findByText(OPERATIONAL_ISSUE_DESCRIPTION)).toBeInTheDocument()

    let resolveButton = queryByText('Resolve')
    let approveButton = queryByText('Approve')
    let reopenButton = queryByText('Re-Open')

    expect(resolveButton).toBeInTheDocument()
    expect(approveButton).not.toBeInTheDocument()
    expect(reopenButton).not.toBeInTheDocument()

    fireEvent.click(resolveButton as HTMLElement)

    // *ByRole() is not locating the progressbar
    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(getByText(OPERATIONAL_ISSUE_DESCRIPTION)).toBeInTheDocument()
    expect(getByText(MODAL_TITLE)).toBeInTheDocument()

    fireEvent.click(getByLabelText(ENABLED_CAUSE_NAME))
    fireEvent.change(getByLabelText('*Resolution'), {
      target: { value: RESOLUTION }
    })
    fireEvent.change(getByLabelText('*Observation'), {
      target: { value: OBSERVATION }
    })

    fireEvent.click(getByText('Resolve Issue').parentElement as HTMLElement)

    expect(
      await findByText('Operational issue has been resolved.')
    ).toBeInTheDocument()

    expect(queryByText(MODAL_TITLE)).not.toBeInTheDocument()

    resolveButton = await findByText('Resolve')
    approveButton = queryByText('Approve')
    reopenButton = queryByText('Re-Open')

    expect(resolveButton).not.toBeInTheDocument()
    expect(approveButton).toBeInTheDocument()
    expect(reopenButton).toBeInTheDocument()
  })

  it('should be able to handle validation backend error case', async () => {
    const CAUSES_VALIDATION_ERROR_MESSAGE = 'Field is empty (amcjf6)'
    const RESOLUTION_VALIDATION_ERROR_MESSAGE = 'Field is empty (pfk2sd)'
    const OBSERVATION_VALIDATION_ERROR_MESSAGE = 'Field is empty (pd82sd)'
    const OPERATIONAL_ISSUE_NAME =
      'Resolve Send first candidate time Operational Issue'
    const ENABLED_CAUSE_NAME = 'Test Enabled Cause'
    const OBSERVATION = 'Test observation (bhc73s)'
    const RESOLUTION = 'Test resolution (pvov9a)'

    const {
      renderResult: { findByText, getByText, getByLabelText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{}]),
      createGetEnabledCausesMock([
        { id: encodeEntityId('1000', 'Test'), name: ENABLED_CAUSE_NAME }
      ]),
      resolveIssueMock({
        input: {
          operationalIssueId: encodeEntityId('0', 'Test'),
          observation: OBSERVATION,
          resolution: RESOLUTION,
          otherCauseReason: null
        },
        errors: [
          {
            key: 'causeIds',
            message: CAUSES_VALIDATION_ERROR_MESSAGE
          },
          {
            key: 'resolution',
            message: RESOLUTION_VALIDATION_ERROR_MESSAGE
          },
          {
            key: 'observation',
            message: OBSERVATION_VALIDATION_ERROR_MESSAGE
          }
        ]
      })
    ])

    fireEvent.click(await findByText('Resolve'))

    // *ByRole() is not locating the progressbar
    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(getByText(OPERATIONAL_ISSUE_NAME)).toBeInTheDocument()
    expect(getByText(ENABLED_CAUSE_NAME)).toBeInTheDocument()

    fireEvent.change(getByLabelText('*Resolution'), {
      target: { value: RESOLUTION }
    })
    fireEvent.change(getByLabelText('*Observation'), {
      target: { value: OBSERVATION }
    })

    fireEvent.click(getByText('Resolve Issue').parentElement as HTMLElement)

    expect(
      await findByText(CAUSES_VALIDATION_ERROR_MESSAGE)
    ).toBeInTheDocument()
    expect(getByText(RESOLUTION_VALIDATION_ERROR_MESSAGE)).toBeInTheDocument()
    expect(getByText(OBSERVATION_VALIDATION_ERROR_MESSAGE)).toBeInTheDocument()
  })

  it('should be able to handle form-wide backend error case', async () => {
    const FORM_WIDE_ERROR_MESSAGE = 'Form-wide error occurred'
    const OPERATIONAL_ISSUE_NAME =
      'Resolve Send first candidate time Operational Issue'
    const ENABLED_CAUSE_NAME = 'Test Enabled Cause'
    const OBSERVATION = 'Test observation (bhc73s)'
    const RESOLUTION = 'Test resolution (pvov9a)'

    const {
      renderResult: { findByText, getByText, getByLabelText }
    } = arrangeTest([
      createOperationMock(OPERATIONAL_ISSUE_ID),
      createGetOperationalIssuesMock([{}]),
      createGetEnabledCausesMock([
        { id: encodeEntityId('1000', 'Test'), name: ENABLED_CAUSE_NAME }
      ]),
      resolveIssueMock({
        input: {
          operationalIssueId: encodeEntityId('0', 'Test'),
          observation: OBSERVATION,
          resolution: RESOLUTION,
          otherCauseReason: null
        },
        errors: [
          {
            key: 'base',
            message: FORM_WIDE_ERROR_MESSAGE
          }
        ]
      })
    ])

    fireEvent.click(await findByText('Resolve'))

    // *ByRole() is not locating the progressbar
    await waitForElementToBeRemoved(() =>
      document.querySelector('[role="progressbar"]')
    )

    expect(getByText(OPERATIONAL_ISSUE_NAME)).toBeInTheDocument()
    expect(getByText(ENABLED_CAUSE_NAME)).toBeInTheDocument()

    fireEvent.change(getByLabelText('*Resolution'), {
      target: { value: RESOLUTION }
    })
    fireEvent.change(getByLabelText('*Observation'), {
      target: { value: OBSERVATION }
    })

    fireEvent.click(getByText('Resolve Issue').parentElement as HTMLElement)

    expect(await findByText(FORM_WIDE_ERROR_MESSAGE)).toBeInTheDocument()
  })
})
