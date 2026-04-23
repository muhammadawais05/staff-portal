import React from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ModalSuspender } from '@staff-portal/modals-service'

import AddActivityModalContent from '../AddActivityModalContent'
import { GetAddActivityModalJobDataDocument } from './data'
import useGetJobContacts from './services/use-get-job-contacts/use-get-job-contacts'

type Props = {
  subjectId: string
  hideModal: () => void
}

const AddActivityModalJobContent = ({ subjectId, hideModal }: Props) => {
  const { data, loading } = useGetNode(GetAddActivityModalJobDataDocument)({
    jobId: subjectId
  })
  const contacts = useGetJobContacts(data)

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
      type={ActivityType.JOB_RELATED}
      availableContacts={contacts}
    />
  )
}

export default AddActivityModalJobContent
