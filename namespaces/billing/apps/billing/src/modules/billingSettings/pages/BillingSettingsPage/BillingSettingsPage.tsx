import { Content } from '@staff-portal/page-wrapper'
import { Tabs } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { noop } from '@toptal/picasso/utils'
import InvoiceSettings from '@staff-portal/billing-widgets/src/modules/billingSettings/components/InvoiceSettings'
import BillingEngagementDetails from '@staff-portal/billing-widgets/src/modules/billingSettings/components/BillingEngagementDetails'
import { useGetJobHeader } from '@staff-portal/billing-widgets/src/modules/billingSettings/data'
import { navigateExternallyTo } from '@staff-portal/navigation'

interface Props {
  jobId: string
}

const BillingSettingsPage: FC<Props> = memo(({ jobId }) => {
  const { t: translate } = useTranslation('billingSettings')
  const { data: { title = '', webResource } = {} } = useGetJobHeader(jobId)

  const onNavigateToJobPage = webResource?.url
    ? () => {
      navigateExternallyTo(webResource.url as string)
      }
    : noop

  return (
    <Content title={title}>
      <Tabs value={1}>
        <Tabs.Tab
          onClick={onNavigateToJobPage}
          label={translate('job.title')}
        />
        <Tabs.Tab label={translate('billing.title')} />
      </Tabs>
      <InvoiceSettings jobId={jobId} />
      <BillingEngagementDetails jobId={jobId} />
    </Content>
  )
})

export default BillingSettingsPage
