import React from 'react'
import { Button, Container, List, Typography } from '@toptal/picasso'
import { Bell16, Minus16, Pencil16 } from '@toptal/picasso/Icon'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'

import * as S from './styles'
import { TalentAvailabilitySubscriptionFragment } from '../../data/talent-availability-subscription-fragment'

export interface Props {
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  loadingUnsubscribe?: boolean
  onEditCommentClick: () => void
  onUnsubscribeClick: () => void
}

const AvailabilitySubscriptionTooltipContent = ({
  talentAvailabilitySubscription,
  loadingUnsubscribe,
  onEditCommentClick,
  onUnsubscribeClick
}: Props) => (
  <Container css={S.tooltipContentWrapper}>
    {talentAvailabilitySubscription?.comment ? (
      <Typography color='inherit' weight='semibold'>
        You subscribed to talent availability to be notified via Slack in the
        following scenarios:
      </Typography>
    ) : (
      <Typography color='inherit' weight='semibold'>
        Subscribe to talent availability to be notified via Slack in the
        following scenarios:
      </Typography>
    )}
    <Container top='xsmall'>
      <List variant='unordered'>
        <List.Item icon={<Minus16 />} css={S.listItem}>
          Talent increases their availability
        </List.Item>
        <List.Item icon={<Minus16 />} css={S.listItem}>
          Lock is removed from talent profile and there are more than zero
          available hours
        </List.Item>
        <List.Item icon={<Minus16 />} css={S.listItem}>
          Talent is about to finish his engagement
        </List.Item>
        <List.Item icon={<Minus16 />} css={S.listItem}>
          Talent has finished his engagement
        </List.Item>
      </List>
    </Container>
    {talentAvailabilitySubscription?.comment && (
      <>
        <Container top='small'>
          <Typography color='inherit' weight='semibold'>
            Subscription Comment:
          </Typography>
          <Typography color='inherit' css={S.subscriptionComment}>
            {talentAvailabilitySubscription.comment}
          </Typography>
        </Container>
        <Container flex top='xsmall' justifyContent='flex-end'>
          {!isOperationHidden(
            talentAvailabilitySubscription.operations.updateComment
          ) && (
            <Button.Action
              icon={<Pencil16 />}
              iconPosition='right'
              onClick={onEditCommentClick}
              css={S.tooltipActionButton}
              disabled={isOperationDisabled(
                talentAvailabilitySubscription.operations.updateComment
              )}
              data-testid='availability-subscription-tooltip-edit-button'
            >
              Edit Comment
            </Button.Action>
          )}

          {!isOperationHidden(
            talentAvailabilitySubscription.operations.unsubscribe
          ) && (
            <Button.Action
              // TODO: [TEA-3180] Replace by crossed bell icon
              icon={<Bell16 css={S.unsubscribeButton} />}
              iconPosition='right'
              onClick={onUnsubscribeClick}
              loading={loadingUnsubscribe}
              css={S.tooltipActionButton}
              disabled={isOperationDisabled(
                talentAvailabilitySubscription.operations.unsubscribe
              )}
              data-testid='availability-subscription-tooltip-unsubscribe-button'
            >
              Unsubscribe
            </Button.Action>
          )}
        </Container>
      </>
    )}
  </Container>
)

export default AvailabilitySubscriptionTooltipContent
