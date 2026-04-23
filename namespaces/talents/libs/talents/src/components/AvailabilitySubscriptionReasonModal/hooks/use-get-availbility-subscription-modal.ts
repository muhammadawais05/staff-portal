import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { TalentAvailabilitySubscriptionFragment } from '../../../data/talent-availability-subscription-fragment'
import {
  useSubscribeToTalentAvailabilityUpdates,
  useUpdateTalentAvailabilitySubscriptionComment
} from '../../../hooks'

interface Params {
  hideModal: () => void
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  talentId: string
}

export const useGetAvailbilitySubscriptionModal = ({
  talentId,
  hideModal,
  talentAvailabilitySubscription
}: Params) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [subscribe, { loading: loadingSubscribe }] =
    useSubscribeToTalentAvailabilityUpdates({
      onError: () => showError('Unable to subscribe.')
    })
  const [updateComment, { loading: loadingUpdateComment }] =
    useUpdateTalentAvailabilitySubscriptionComment({
      onError: () => showError('Unable to update subscription reason.')
    })

  const handleSubscribe = async (comment: string) => {
    const { data } = await subscribe({
      variables: {
        input: {
          talentId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.subscribeToTalentAvailabilityUpdates,
      successNotificationMessage: 'Subscription successfully created.',
      onSuccessAction: hideModal
    })
  }

  const handleUpdateComment = async (
    talentAvailabilitySubscriptionId: string,
    comment: string
  ) => {
    const { data } = await updateComment({
      variables: {
        input: {
          talentAvailabilitySubscriptionId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult:
        data?.updateCommentOfTalentAvailabilityUpdatesSubscription,
      successNotificationMessage: 'Subscription reason successfully updated.',
      onSuccessAction: hideModal
    })
  }

  const handleSubscriptionCommentModalSubmit = async ({
    comment
  }: {
    comment: string
  }) => {
    if (talentAvailabilitySubscription?.id) {
      return handleUpdateComment(
        talentAvailabilitySubscription.id,
        talentAvailabilitySubscription.comment
      )
    }

    return handleSubscribe(comment)
  }

  return {
    loading: loadingUpdateComment || loadingSubscribe,
    handleSubscriptionCommentModalSubmit
  }
}
