import { Maybe } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { EngagementInterviewOperationsFragment } from '../get-engagement'

type Props = {
  interview?: Maybe<EngagementInterviewOperationsFragment>
  setOperationIsLoading: (isLoading: boolean) => void
}

export const useMakeRenderEngagementInterviewLazyOperation = ({
  interview,
  setOperationIsLoading
}: Props) => {
  const MakeRenderEngagementInterviewLazyOperation = (
    operationName: keyof EngagementInterviewOperationsFragment['operations'],
    onSuccess?: Function,
    hidden?: boolean
  ) =>
    useRenderLazyOperation({
      initialOperation: interview?.operations[operationName],
      getLazyOperationVariables: {
        nodeId: interview?.id as string,
        nodeType: NodeType.INTERVIEW,
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

  return MakeRenderEngagementInterviewLazyOperation
}
