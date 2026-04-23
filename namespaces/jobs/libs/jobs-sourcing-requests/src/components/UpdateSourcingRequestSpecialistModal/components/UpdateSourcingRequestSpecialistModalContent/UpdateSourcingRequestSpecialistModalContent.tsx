import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { RoleScope } from '@staff-portal/graphql/staff'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetSourcers } from '@staff-portal/talents'

import UpdateSourcingRequestSpecialistForm from '../UpdateSourcingRequestSpecialistForm'

export type Props = {
  jobId: string
  sourcingRequestId?: string | null
  talentSpecialistId?: string | null
  talentSpecialistFullName?: string | null
  hideModal: () => void
}

const UpdateSourcingRequestSpecialistModalContent = ({
  jobId,
  sourcingRequestId,
  talentSpecialistId,
  talentSpecialistFullName,
  hideModal
}: Props) => {
  const { showError } = useNotifications()

  const { sourcers, loading } = useGetSourcers({
    scope: RoleScope.TALENT_SOURCERS,
    onError: () => showError('An error occurred, unable to fetch sourcers.')
  })

  if (!sourcers || loading) {
    return <ModalSuspender />
  }

  return (
    <UpdateSourcingRequestSpecialistForm
      jobId={jobId}
      sourcingRequestId={sourcingRequestId}
      talentSpecialistId={talentSpecialistId}
      talentSpecialistFullName={talentSpecialistFullName}
      sourcers={sourcers}
      hideModal={hideModal}
    />
  )
}

export default UpdateSourcingRequestSpecialistModalContent
