import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { assertIsNotNullish } from '@staff-portal/utils'

import { useGetCreateClaimerDetails } from '../../data'
import { useClaimCompany } from '../../services'
import CreateClaimerModalContent from '../CreateClaimerModalContent/CreateClaimerModalContent'

interface Props {
  clientId: string
  hideModal: () => void
}

const CreateClaimerModalContainer = ({ clientId, hideModal }: Props) => {
  const { company, loading } = useGetCreateClaimerDetails(clientId)
  const user = useGetCurrentUser()
  const { handleSubmit, loading: getDetailsLoading } =
    useClaimCompany(hideModal)

  if (loading) {
    return <ModalSuspender />
  }

  assertIsNotNullish(company)

  const timeZoneName = user?.timeZone?.name

  return (
    <>
      <Modal.Title>Claim Applicant</Modal.Title>

      <Modal.Content>
        <CreateClaimerModalContent
          company={company}
          timeZoneName={timeZoneName}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          disabled={getDetailsLoading}
          onClick={hideModal}
        >
          Cancel
        </Button>
        <Button
          variant='positive'
          onClick={() => handleSubmit(company)}
          loading={getDetailsLoading}
          data-testid='submit-claim-company'
        >
          Claim Company{company?.pendingCallbackRequest && ' and Call'}
        </Button>
      </Modal.Actions>
    </>
  )
}

export default CreateClaimerModalContainer
