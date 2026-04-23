import React from 'react'
import { Container, QuestionMark16, Tooltip, Typography } from '@toptal/picasso'
import { formatAsPercentage } from '@staff-portal/utils'

export interface ListItemProps {
  label: string
  value: number | string
}

const ListItem = ({ label, value }: ListItemProps) => {
  return (
    <>
      <Typography as='span' weight='semibold'>
        {label}:{' '}
      </Typography>
      {value}
      <br />
    </>
  )
}

export interface Props {
  lowActivity: boolean
  pending: number
  prediction?: number | null
  recentConfirmed: number
  recentRejected: number
}

const TalentAvailabilityRequests = ({
  lowActivity,
  pending,
  prediction,
  recentConfirmed,
  recentRejected
}: Props) => {
  const predictionRate = prediction ? formatAsPercentage(prediction) : 'N/A'

  return (
    <Container
      as='span'
      flex
      alignItems='center'
      data-testid='talent-availability-requests'
    >
      <Typography
        as='span'
        weight='semibold'
        color={lowActivity ? 'red' : 'inherit'}
      >
        {lowActivity ? 'Low' : 'Normal'}
      </Typography>

      <Tooltip
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
                <Typography as='span'>
                  Availability request statistics
                </Typography>
              )}
            </Container>
            <ListItem
              label='Acceptance prediction rate'
              value={predictionRate}
            />
            <ListItem label='Pending' value={pending} />
            <ListItem label='Recently accepted' value={recentConfirmed} />
            <ListItem label='Recently rejected' value={recentRejected} />
          </Typography>
        }
        interactive
      >
        <Container
          as='span'
          left='xsmall'
          flex
          alignItems='center'
          data-testid='talent-availability-requests-tooltip'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default TalentAvailabilityRequests
