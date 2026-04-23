import React from 'react'
import { StaffBillingSettingsWidget } from '@staff-portal/billing-widgets'
import { useBillingBaseProps } from '@staff-portal/billing'

interface Props {
  jobId: string
}

export const JobBillingTab = ({ jobId }: Props) => {
  const baseProps = useBillingBaseProps()

  return <StaffBillingSettingsWidget jobId={jobId} {...baseProps} />
}

export default JobBillingTab
