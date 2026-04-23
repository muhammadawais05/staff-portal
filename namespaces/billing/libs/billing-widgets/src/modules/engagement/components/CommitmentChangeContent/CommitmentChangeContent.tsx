import React, { ReactNode } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

export type CommitmentChangeContentProps = {
  engagementId: string
  children: (showModal: () => void) => ReactNode
}

const CommitmentChangeContent = ({
  engagementId,
  children
}: CommitmentChangeContentProps) => {
  const { handleOnOpenModalWithUrlSearch } = useModals()

  const handleClick = () => {
    handleOnOpenModalWithUrlSearch(ModalKey.commitmentChange, { engagementId })
  }

  return <>{children(handleClick)}</>
}

export default CommitmentChangeContent
