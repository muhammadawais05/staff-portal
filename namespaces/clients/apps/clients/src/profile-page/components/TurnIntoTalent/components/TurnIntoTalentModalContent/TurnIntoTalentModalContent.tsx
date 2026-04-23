import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useGetUserVerticals } from '@staff-portal/verticals'

import TurnIntoTalentForm from '../TurnIntoTalentForm'

export type Props = {
  hideModal: () => void
  companyId: string
  fullName: string
}

const TurnIntoTalentModalContent = ({
  companyId,
  fullName,
  hideModal
}: Props) => {
  const { data: verticals, loading } = useGetUserVerticals()

  if (!verticals || loading) {
    return <ModalSuspender />
  }

  return (
    <TurnIntoTalentForm
      hideModal={hideModal}
      companyId={companyId}
      fullName={fullName}
      verticals={verticals}
    />
  )
}

export default TurnIntoTalentModalContent
