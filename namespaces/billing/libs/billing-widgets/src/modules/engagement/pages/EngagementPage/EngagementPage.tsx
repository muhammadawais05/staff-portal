import React, { FC, memo, useState, useEffect } from 'react'
import { Container, SectionProps } from '@toptal/picasso'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import BillingCycles from '../../../billingCycles/components/BillingCycles'
import TimesheetListContainer from '../../../timesheets/components/TimesheetListContainer'

const displayName = 'EngagementPage'

interface Props {
  engagementId: string
  listenedBillingCycleMessages?: TypedMessage[]
  variant?: SectionProps['variant']
}

const EngagementPage: FC<Props> = memo(
  ({ engagementId, listenedBillingCycleMessages, variant }) => {
    const [eid, setEid] = useState(engagementId)
    const { handleInboundEvent, handleInboundEventUnsubscribe } =
      useExternalIntegratorContext()

    useEffect(() => {
      handleInboundEvent('set_engagementId', {
        setEid: (id: string) => setEid(id)
      })

      return () => handleInboundEventUnsubscribe('set_engagementId')
    }, [handleInboundEvent, handleInboundEventUnsubscribe])

    return (
      <>
        <Container top='medium'>
          <TimesheetListContainer
            variant={variant}
            limitElements={3}
            engagementId={eid}
          />
        </Container>
        <Container top='medium'>
          <BillingCycles
            variant={variant}
            engagementId={eid}
            listenedBillingCycleMessages={listenedBillingCycleMessages}
          />
        </Container>
      </>
    )
  }
)

EngagementPage.displayName = displayName

export default EngagementPage
