import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import AssignToJobModalForm from '../AssignToJobModalForm/AssignToJobModalForm'
import { useGetAvailableJobs } from '../../data/available-jobs/use-get-available-jobs'

interface Props {
  hideModal: () => void
  companyRepresentativeId: string
}

const AssignToJobModalContent = ({
  hideModal,
  companyRepresentativeId
}: Props) => {
  const { options, loading } = useGetAvailableJobs({
    companyRepresentativeId
  })

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <AssignToJobModalForm
      hideModal={hideModal}
      companyRepresentativeId={companyRepresentativeId}
      availableJobs={options}
    />
  )
}

export default AssignToJobModalContent
