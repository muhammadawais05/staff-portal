// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { EngagementOperationsFragment } from '../engagement-operations-fragment'

type Props = {
  id: string
  operations: EngagementOperationsFragment
  setOperationIsLoading: (isLoading: boolean) => void
}

export const useMakeRenderEngagementLazyOperation = ({
  id,
  operations,
  setOperationIsLoading
}: Props) => {
  const MakeRenderEngagementLazyOperation = (
    operationName: keyof EngagementOperationsFragment,
    onSuccess?: Function,
    hidden?: boolean
  ) =>
    useRenderLazyOperation({
      initialOperation: operations[operationName],
      getLazyOperationVariables: {
        nodeId: id,
        nodeType: NodeType.ENGAGEMENT,
        operationName
      },
      onSuccess: () => {
        setOperationIsLoading(false)
        onSuccess?.()
      },
      onSettled: () => {
        setOperationIsLoading(false)
      },
      inline: false,
      hidden
    })

  return MakeRenderEngagementLazyOperation
}
