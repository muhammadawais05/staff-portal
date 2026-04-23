import { Operation } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

type Props = {
  emailMessagingId?: string | null
  nodeType:
    | NodeType.EMAIL_MESSAGING_ENGAGEMENT_CLIENT
    | NodeType.EMAIL_MESSAGING_ENGAGEMENT_TALENT
  initialOperation?: Operation | null
  setOperationIsLoading: (isLoading: boolean) => void
}

export const useMakeRenderEmailEngagementLazyOperation = ({
  emailMessagingId,
  nodeType,
  initialOperation,
  setOperationIsLoading
}: Props) => {
  const MakeRenderEmailEngagementLazyOperation = (
    onSuccess?: Function,
    hidden?: boolean
  ) => {
    return useRenderLazyOperation({
      initialOperation,
      getLazyOperationVariables: {
        // emailMessagingId shouldn't be null here at runtime. Using `??` only to cast its type to the string
        nodeId: emailMessagingId ?? '',
        nodeType,
        operationName: 'sendEmailTo'
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
  }

  return MakeRenderEmailEngagementLazyOperation
}
