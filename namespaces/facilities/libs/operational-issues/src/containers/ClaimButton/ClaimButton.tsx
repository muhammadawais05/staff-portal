import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { Operation } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { useClaimOperationalIssue } from './data/claim-operational-issue/claim-operational-issue.staff.gql'

interface Props {
  operationalIssueId: string
  operation: Operation
}

const ClaimButton = ({ operationalIssueId, operation }: Props) => {
  const { showError, showSuccess } = useNotifications()
  const [claimOperationalIssue, { loading: mutationLoading }] =
    useClaimOperationalIssue({
      onCompleted: ({ claimOperationalIssue: result }) => {
        if (result?.success) {
          showSuccess('Operational issue has been claimed.')

          return
        }

        if (result?.errors.length) {
          showError(concatMutationErrors(result.errors))

          return
        }

        showError(
          'An error occurred, the Operation Issue has not been claimed.'
        )
      },
      onError: () =>
        showError(
          'An error occurred, the Operation Issue has not been claimed.'
        )
    })

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: operationalIssueId,
      nodeType: NodeType.OPERATIONAL_ISSUE,
      operationName: 'claimOperationalIssue'
    },
    onSuccess: () => {
      claimOperationalIssue({
        variables: {
          input: {
            operationalIssueId
          }
        }
      })
    }
  })

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <Button
          size='small'
          onClick={checkOperation}
          loading={loading || mutationLoading}
          disabled={disabled}
          data-pendoid='claim-operation-issue-button'
        >
          Claim
        </Button>
      ))}
    </>
  )
}

export default ClaimButton
