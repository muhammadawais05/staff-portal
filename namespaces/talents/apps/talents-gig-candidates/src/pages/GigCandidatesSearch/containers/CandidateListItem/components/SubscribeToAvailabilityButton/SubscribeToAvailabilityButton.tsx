import React, { useState } from 'react'
import { Operation } from '@staff-portal/graphql/staff'
import { Button, Container, Tooltip } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Bell16 } from '@toptal/picasso/Icon'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  TalentAvailabilitySubscriptionFragment,
  useUnsubscribeFromTalentAvailabilityUpdates,
  AvailabilitySubscriptionReasonModal,
  AvailabilitySubscriptionTooltipContent
} from '@staff-portal/talents'

export interface Props {
  talentId: string
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  operation: Operation
}

export const SubscribeToAvailabilityButton = ({
  talentId,
  talentAvailabilitySubscription,
  operation
}: Props) => {
  const isSubscribed = talentAvailabilitySubscription?.active
  const [isHovered, setIsHovered] = useState(false)
  const label =
    isHovered && isSubscribed
      ? 'Unsubscribe from Availability'
      : `${isSubscribed ? 'Subscribed' : 'Subscribe'} to Availability`
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { showModal } = useModal(AvailabilitySubscriptionReasonModal, {
    talentId,
    talentAvailabilitySubscription
  })

  const [unsubscribe, { loading: loadingUnsubscribe }] =
    useUnsubscribeFromTalentAvailabilityUpdates({
      onError: () => showError('Unable to unsubscribe.')
    })

  const handleSubscribeClick = () => {
    if (!talentAvailabilitySubscription) {
      showModal()
    }
  }

  const handleEditCommentClick = () => showModal()

  const handleUnsubscribe = async () => {
    if (talentAvailabilitySubscription) {
      const { data } = await unsubscribe({
        variables: {
          input: {
            talentAvailabilitySubscriptionId: talentAvailabilitySubscription.id
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.unsubscribeFromTalentAvailabilityUpdates,
        successNotificationMessage: 'Subscription successfully canceled.'
      })
    }
  }

  const handleOver = (e: React.MouseEvent) => {
    setIsHovered(e.type === 'mouseover')
  }

  if (!isSubscribed && isOperationHidden(operation)) {
    return null
  }

  return (
    <Container left='small'>
      <Tooltip
        interactive
        maxWidth='none'
        content={
          <AvailabilitySubscriptionTooltipContent
            talentAvailabilitySubscription={talentAvailabilitySubscription}
            loadingUnsubscribe={loadingUnsubscribe}
            onEditCommentClick={handleEditCommentClick}
            onUnsubscribeClick={handleUnsubscribe}
          />
        }
      >
        <Button
          variant='secondary'
          loading={loadingUnsubscribe}
          icon={
            <Bell16
              color={isSubscribed ? 'green' : 'black'}
              data-testid={`bell-icon:${isSubscribed ? 'active' : 'inactive'}`}
            />
          }
          size='small'
          data-testid='subscribe-to-availability-button'
          onClick={handleSubscribeClick}
          onMouseOver={handleOver}
          onMouseOut={handleOver}
          disabled={isOperationDisabled(operation)}
        >
          {label}
        </Button>
      </Tooltip>
    </Container>
  )
}

export default SubscribeToAvailabilityButton
