import React from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ModalSuspender } from '@staff-portal/modals-service'

import AddActivityModalContent from '../AddActivityModalContent'
import { GetAddActivityModalClientDataDocument } from './data'

type Props = {
  subjectId: string
  hideModal: () => void
}

const AddActivityModalClientContent = ({ subjectId, hideModal }: Props) => {
  const { data, loading } = useGetNode(GetAddActivityModalClientDataDocument)({
    clientId: subjectId
  })

  if (loading) {
    return <ModalSuspender />
  }
  if (!data) {
    return null
  }

  return (
    <AddActivityModalContent
      subjectId={subjectId}
      hideModal={hideModal}
      type={ActivityType.CLIENT_RELATED}
      contact={data.contact}
      availableContacts={data.representatives.nodes}
    />
  )
}

export default AddActivityModalClientContent
