import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { Operation } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { useVerifyOperationalIssue } from './data/verify-operational-issue/verify-operational-issue.staff.gql'

export interface Props {
  operationalIssueId: string
  operation: Operation
  hidden?: boolean
}

const VerifyButton = ({ operationalIssueId, operation, hidden }: Props) => {
  const { showError, showSuccess } = useNotifications()
  const [verifyOperationalIssue, { loading: mutationLoading }] =
    useVerifyOperationalIssue({
      onCompleted: ({ verifyOperationalIssue: result }) => {
        if (result?.success) {
          showSuccess('Operational issue has been verified.')

          return
        }

        if (result?.errors.length) {
          showError(concatMutationErrors(result.errors))

          return
        }

        showError(
          'An error occurred, the Operation Issue has not been verified.'
        )
      },
      onError: () =>
        showError(
          'An error occurred, the Operation Issue has not been verified.'
        )
    })

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    hidden,
    getLazyOperationVariables: {
      nodeId: operationalIssueId,
      nodeType: NodeType.OPERATIONAL_ISSUE,
      operationName: 'verifyOperationalIssue'
    },
    onSuccess: () => {
      verifyOperationalIssue({
        variables: {
          operationalIssueId
        }
      })
    }
  })

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <Button
          variant='secondary'
          size='small'
          onClick={checkOperation}
          loading={loading || mutationLoading}
          disabled={disabled}
        >
          Verify
        </Button>
      ))}
    </>
  )
}

export default VerifyButton
