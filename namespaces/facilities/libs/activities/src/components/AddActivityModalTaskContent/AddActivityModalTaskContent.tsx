import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ModalSuspender } from '@staff-portal/modals-service'

import { GetAddActivityModalTaskDataDocument } from './data'
import AddActivityModalContent from '../AddActivityModalContent'

type Props = {
  subjectId: string
  hideModal: () => void
}

const AddActivityModalTaskContent = ({ subjectId, hideModal }: Props) => {
  const { data, loading } = useGetNode(GetAddActivityModalTaskDataDocument)({
    taskId: subjectId
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
      contact={data.client?.contact}
      availableContacts={data.client?.representatives.nodes}
    />
  )
}

export default AddActivityModalTaskContent
