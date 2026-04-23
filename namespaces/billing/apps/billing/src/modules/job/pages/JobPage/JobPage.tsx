import React, { FC, useState, useEffect, memo } from 'react'
import { Button, Container, SectionProps } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { useTranslation } from 'react-i18next'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { getMemorandumsWithEngagement } from '@staff-portal/billing/src/utils/path'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import BillingCycles from '@staff-portal/billing-widgets/src/modules/billingCycles/components/BillingCycles'
import ExtraExpenses from '@staff-portal/billing-widgets/src/modules/extraExpenses/components/ExtraExpenses'
import PlacementFees from '@staff-portal/billing-widgets/src/modules/placementFees/components/PlacementFees'
import TimesheetListContainer from '@staff-portal/billing-widgets/src/modules/timesheets/components/TimesheetListContainer'

import { isValidEngagement } from '../../utils'

const displayName = 'StaffJobPage'

interface Props {
  engagementId: string
  variant?: SectionProps['variant']
}

const StaffJobPage: FC<Props> = memo(({ engagementId, variant }) => {
  const { t: translate } = useTranslation('common')
  const [eid, setEid] = useState(engagementId)
  const { handleInboundEvent, handleInboundEventUnsubscribe } =
    useExternalIntegratorContext()

  useEffect(() => {
    handleInboundEvent('set_engagementId', {
      setEid: (id: string) => setEid(id)
    })

    return () => handleInboundEventUnsubscribe('set_engagementId')
  }, [handleInboundEvent, handleInboundEventUnsubscribe])

  if (!isValidEngagement(eid)) {
    return null
  }

  const decodedEid = decodeId({ id: eid, type: 'engagement' })

  return (
    <WidgetErrorBoundary>
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
          actions={
            <Button
              as={Link}
              data-testid={`${displayName}-memorandums`}
              href={getMemorandumsWithEngagement(decodedEid)}
              size='small'
              noUnderline
            >
              {translate('memorandums')}
            </Button>
          }
        />
      </Container>
      <Container top='medium'>
        <ExtraExpenses variant={variant} engagementId={eid} />
      </Container>
      <Container top='medium'>
        <PlacementFees variant={variant} engagementId={eid} />
      </Container>
    </WidgetErrorBoundary>
  )
})

StaffJobPage.displayName = displayName

export default StaffJobPage
