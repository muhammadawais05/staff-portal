import React, { ComponentProps } from 'react'
import { Button, Container, Tooltip } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Bell16 } from '@toptal/picasso/Icon'
import { Operation } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUnsubscribeFromTalentAvailabilityUpdates } from '../../hooks'
import AvailabilitySubscriptionTooltipContent from '../AvailabilitySubscriptionTooltipContent'
import AvailabilitySubscriptionReasonModal from '../AvailabilitySubscriptionReasonModal'
import * as S from './styles'
import AvailabilityStatus from '../AvailabilityStatus'
import { TalentAvailabilitySubscriptionFragment } from '../../data'

export interface Props extends ComponentProps<typeof AvailabilityStatus> {
  talentId: string
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  operation: Operation
}

const AvailabilityStatusWithSubscription = ({
  talentId,
  talentAvailabilitySubscription,
  operation,
  ...rest
}: Props) => {
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

  const isSubscribeActionHidden =
    isOperationHidden(operation) && !talentAvailabilitySubscription?.active

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

  return (
    <>
      <Container flex justifyContent='space-between'>
        <AvailabilityStatus {...rest} />
        {!isSubscribeActionHidden && (
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
            <Button.Circular
              variant='flat'
              onClick={handleSubscribeClick}
              disabled={isOperationDisabled(operation)}
              icon={
                <Bell16
                  css={S.subscribeButton(
                    talentAvailabilitySubscription?.active
                  )}
                  data-testid={`bell-icon:${
                    talentAvailabilitySubscription?.active
                      ? 'active'
                      : 'inactive'
                  }`}
                />
              }
            />
          </Tooltip>
        )}
      </Container>
    </>
  )
}

export default AvailabilityStatusWithSubscription
