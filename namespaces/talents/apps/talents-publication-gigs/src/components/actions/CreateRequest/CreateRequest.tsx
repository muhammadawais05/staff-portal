import React, { useState } from 'react'
import { Button } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import { useGetPublicationOperations } from '@staff-portal/talents-gigs'

import RequestModal from '../RequestModal'

const CreateRequest = () => {
  const [createRequestOpen, setCreateRequestOpen] = useState(false)

  const { operations, loading } = useGetPublicationOperations()
  const disabled = !isOperationEnabled(operations?.createPublicationGig)

  const handleCreateRequest = () => {
    setCreateRequestOpen(true)
  }

  const handleCloseModal = () => {
    setCreateRequestOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleCreateRequest}
        variant='primary'
        size='small'
        data-testid='create-request-button'
        disabled={disabled}
        loading={loading}
      >
        Create Request
      </Button>
      <RequestModal open={createRequestOpen} hideModal={handleCloseModal} />
    </>
  )
}

export default CreateRequest
