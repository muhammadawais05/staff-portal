import React, { FC, memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Button, Container } from '@toptal/picasso'
import Divider from '@staff-portal/billing/src/components/Divider'
import ActionLink from '@staff-portal/billing/src/components/ActionLink'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { getMemorandumsWithEngagement } from '@staff-portal/billing/src/utils/path'

import BillingCycles from '../../../billingCycles/components/BillingCycles'
import EngagementSelector from '../EngagementSelector'
import Skeleton from './Skeleton'
import ExtraExpensesList from '../ExtraExpensesList'
import PlacementFeesList from '../PlacementFeesList'
import TimesheetListContainer from '../../../timesheets/components/TimesheetListContainer'
import { useGetEngagementDetails } from '../../data'
import BillingCyclesSettings from '../BillingCyclesSettings'

interface Props {
  jobId: string
}
type OnChangeEvent = React.ChangeEvent<{ value: string }>

const BillingEngagementDetails: FC<Props> = memo(({ jobId }) => {
  const {
    data: { engagements } = {},
    loading,
    initialLoading
  } = useGetEngagementDetails(jobId)
  const defaultEngagementId = engagements?.nodes[0]?.id

  const [engagementId, setEngagementId] = useState('')

  useEffect(() => {
    if (!initialLoading && defaultEngagementId) {
      setEngagementId(defaultEngagementId)
    }
  }, [initialLoading])

  const { t: translate } = useTranslation('billingSettings')
  const decodedEngagementId = decodeId({
    id: engagementId,
    type: 'engagement'
  })
  const handleOnChange = (event: OnChangeEvent) =>
    setEngagementId(event.target.value)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton />}
    >
      {engagementId !== '' && (
        <>
          <Container top='medium'>
            <Section
              title={translate('information.title')}
              variant='withHeaderBar'
            >
              <EngagementSelector
                engagement={engagementId}
                engagements={engagements}
                handleOnChange={handleOnChange}
              />
              <Divider top='medium' />
              <BillingCyclesSettings
                engagementId={decodedEngagementId.toString()}
              />
            </Section>
          </Container>
          <Container top='medium'>
            <TimesheetListContainer
              variant='withHeaderBar'
              engagementId={engagementId}
              limitElements={3}
            />
          </Container>
          <Container top='medium'>
            <BillingCycles
              variant='withHeaderBar'
              engagementId={engagementId}
              actions={
                <Button
                  as={ActionLink}
                  variant='secondary'
                  data-testid='memorandums'
                  href={getMemorandumsWithEngagement(decodedEngagementId)}
                  size='small'
                >
                  {translate('billingSettingsEdit.memorandums')}
                </Button>
              }
            />
          </Container>
          <Container top='medium'>
            <ExtraExpensesList engagementId={engagementId} />
          </Container>
          <Container top='medium'>
            <PlacementFeesList engagementId={engagementId} />
          </Container>
        </>
      )}
    </ContentLoader>
  )
})

export default BillingEngagementDetails
