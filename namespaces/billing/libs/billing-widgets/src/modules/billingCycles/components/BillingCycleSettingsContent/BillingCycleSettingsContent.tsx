import React, { ReactNode } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

export type BillingCycleSettingsContentProps = {
  engagementId: string
  children: (showModal: () => void) => ReactNode
}

const BillingCycleSettingsContent = ({
  engagementId,
  children
}: BillingCycleSettingsContentProps) => {
  const { handleOnOpenModal } = useModals()

  const handleClick = () => {
    handleOnOpenModal(ModalKey.billingCycleSettings, { engagementId })
  }

  return <>{children(handleClick)}</>
}

export default BillingCycleSettingsContent
