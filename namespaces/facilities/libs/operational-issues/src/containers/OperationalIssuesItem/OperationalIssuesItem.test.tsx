import { screen, render } from '@testing-library/react'
import React from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import OperationalIssuesItem from './OperationalIssuesItem'
import { createOperationalIssueMock } from '../../data/operational-issue-fragment/mocks'
import { OperationalIssueFragment } from '../../data/operational-issue-fragment/operational-issue-fragment.staff.gql.types'
import { createGetEnabledCausesMock } from '../ResolveModal/data/get-enabled-causes/mocks'

const arrangeTest = (
  operationalIssue: OperationalIssueFragment,
  mocks: MockedResponse[] = []
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <OperationalIssuesItem operationalIssue={operationalIssue} />
    </TestWrapperWithMocks>
  )

describe('OperationalIssueItem', () => {
  it('should not display group count if there is only one item', async () => {
    const NUMBER_OF_ISSUES = 1
    const operationalIssueMock = createOperationalIssueMock(0, {
      occurrencesCount: NUMBER_OF_ISSUES
    })

    arrangeTest(operationalIssueMock as OperationalIssueFragment)

    expect(screen.queryByText(String(NUMBER_OF_ISSUES))).not.toBeInTheDocument()
  })

  it('should display group count if there are multiple items', async () => {
    const NUMBER_OF_ISSUES = 2
    const operationalIssueMock = createOperationalIssueMock(0, {
      occurrencesCount: NUMBER_OF_ISSUES
    })

    arrangeTest(operationalIssueMock as OperationalIssueFragment)

    expect(screen.getByText(String(NUMBER_OF_ISSUES))).toBeInTheDocument()
  })

  it('should hide Verify operation button if the Approve operation is visible', async () => {
    const operationalIssueMock = createOperationalIssueMock(0, {
      operations: {
        approveOperationalIssue: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        reopenOperationalIssue: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        resolveOperationalIssue: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        claimOperationalIssue: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        verifyOperationalIssue: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    arrangeTest(operationalIssueMock as OperationalIssueFragment)

    expect(screen.getByText('Claim')).toBeInTheDocument()
    expect(screen.getByText('Approve')).toBeInTheDocument()
    expect(screen.queryByText('Verify')).not.toBeInTheDocument()
  })

  // TODO: this should be tested in cypress or in ResolveButton
  describe.skip('when Resolve button is clicked more than once', () => {
    it('stops loading every time the modal is opened', async () => {
      const OPERATIONAL_ISSUE_ID = encodeEntityId('123', 'Test')
      const TEMPLATE_ID = 'template-ski831'

      const operationalIssuesMock = createOperationalIssueMock(0, {
        id: OPERATIONAL_ISSUE_ID,
        template: {
          id: TEMPLATE_ID,
          name: 'Test Name',
          recommendedSolutions: `Test Text`,
          __typename: 'OperationalIssueTemplate'
        },
        operations: {
          approveOperationalIssue: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          reopenOperationalIssue: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          resolveOperationalIssue: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          claimOperationalIssue: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          verifyOperationalIssue: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      })

      arrangeTest(operationalIssuesMock as OperationalIssueFragment, [
        createGetEnabledCausesMock([], TEMPLATE_ID),
        createGetLazyOperationMock({
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          variables: {
            nodeId: OPERATIONAL_ISSUE_ID,
            nodeType: NodeType.OPERATIONAL_ISSUE,
            operationName: 'resolveOperationalIssue'
          }
        })
      ])

      const resolveButton = screen.getByTestId(
        'resolve-operational-issue-button'
      )

      // First click
      fireEvent.click(resolveButton)
      await screen.findByTestId('cancel-button')

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

      fireEvent.click(screen.getByTestId('cancel-button'))

      // Next clicks
      fireEvent.click(resolveButton)
      await screen.findByTestId('cancel-button')

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
})
