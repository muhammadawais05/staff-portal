import React from 'react'
import { Item } from '@toptal/picasso/TagSelector'
import { Tag, Container, Typography } from '@toptal/picasso'
import { TalentAvailabilityRequestMetadata } from '@staff-portal/graphql/staff'
import { WrapWithTooltip } from '@staff-portal/ui'
import { formatAsPercentage } from '@staff-portal/utils'

import * as S from './styles'
import ListItem from '../ListItem'

export interface TalentItem extends Item {
  node: {
    id: string
    availabilityRequestMetadata: TalentAvailabilityRequestMetadata
  }
}

interface Props {
  item: TalentItem
  displayValue: string
  onDelete: () => void
}

const TalentAutocompleteItem = ({ item, displayValue, onDelete }: Props) => {
  const availabilityRequestMetadata = item?.node?.availabilityRequestMetadata

  const pending = availabilityRequestMetadata?.pending
  const prediction = availabilityRequestMetadata?.prediction
  const recentConfirmed = availabilityRequestMetadata?.recentConfirmed
  const recentRejected = availabilityRequestMetadata?.recentRejected
  const lowActivity = availabilityRequestMetadata?.lowActivity

  return availabilityRequestMetadata ? (
    <WrapWithTooltip
      interactive
      enableTooltip={lowActivity}
      content={
        <Typography>
          <Container as='span' flex bottom='small'>
            {lowActivity ? (
              <Typography as='span'>
                Talent has{' '}
                <Typography inline as='span' color='red' weight='semibold'>
                  low-activity
                </Typography>
                , he is not likely to accept a new AR.
              </Typography>
            ) : (
              <Typography as='span'>Availability request statistics</Typography>
            )}
          </Container>
          <ListItem
            label='Acceptance prediction rate'
            value={prediction ? formatAsPercentage(prediction) : 'N/A'}
          />
          <ListItem label='Pending' value={pending} />
          <ListItem label='Recently accepted' value={recentConfirmed} />
          <ListItem label='Recently rejected' value={recentRejected} />
        </Typography>
      }
      data-testid='talent-autocomplete-item:tooltip'
    >
      <Tag
        variant={lowActivity ? 'red' : 'light-grey'}
        onDelete={onDelete}
        css={S.Item}
        data-testid='talent-autocomplete-item:display-value'
      >
        {displayValue}
      </Tag>
    </WrapWithTooltip>
  ) : (
    <Tag
      variant={lowActivity ? 'red' : 'light-grey'}
      onDelete={onDelete}
      css={S.Item}
      data-testid='talent-autocomplete-item:display-value'
    >
      {displayValue}
    </Tag>
  )
}

export default TalentAutocompleteItem
