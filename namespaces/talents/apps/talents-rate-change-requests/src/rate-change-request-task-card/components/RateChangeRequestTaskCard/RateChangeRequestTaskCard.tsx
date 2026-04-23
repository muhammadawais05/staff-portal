import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { TaskCardProps } from '@staff-portal/tasks-cards'
import { TaskCardLayout } from '@staff-portal/tasks'

import { RateChangeRequestItemActions } from '../../../components'
import { getRateChangeRequestContentItems } from '../../utils'
import { useGetRateChangeRequest } from './data'

const RateChangeRequestTaskCard = ({
  taskCardConfig: { entityId }
}: TaskCardProps) => {
  const { data: rateChangeRequest, loading } = useGetRateChangeRequest(entityId)

  return (
    <TaskCardLayout loading={!rateChangeRequest && loading}>
      {rateChangeRequest && (
        <>
          <TaskCardLayout.Header>
            <TypographyOverflow
              size='medium'
              weight='semibold'
              color='inherit'
              as='span'
              data-testid='rateChangeRequestTaskCardTitle'
            >
              Rate Change Request
            </TypographyOverflow>
            <TaskCardLayout.Actions>
              <RateChangeRequestItemActions
                talentSlackContacts={rateChangeRequest.talent?.slackContacts}
                completeRateChangeRequestOperation={
                  rateChangeRequest.operations.completeRateChangeRequest
                }
                {...rateChangeRequest}
              />
            </TaskCardLayout.Actions>
          </TaskCardLayout.Header>

          <TaskCardLayout.Content
            items={getRateChangeRequestContentItems(rateChangeRequest)}
            labelColumnWidth={8}
            oneColumn
          />
        </>
      )}
    </TaskCardLayout>
  )
}

export default RateChangeRequestTaskCard
