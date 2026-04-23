import React, { useState } from 'react'
import { Container, Typography, Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { useNavigate } from '@staff-portal/navigation'
import { getJobCreatePath } from '@staff-portal/routes'
import { CompanyAutocomplete } from '@staff-portal/clients'

type FormValues = {
  id: string
  companyLegacyId: number
}

const AddJobButton = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showError } = useNotifications()
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (url) {
      navigate(url)
    } else {
      showError('You have to select a company')
    }
  }

  const handleSelect = (client: FormValues) => {
    setUrl(getJobCreatePath(client.companyLegacyId))
  }

  return (
    <>
      {isOpen && (
        <Modal onClose={hideModal} open>
          <Form onSubmit={handleSubmit}>
            <Modal.Title>Choose Company</Modal.Title>
            <Modal.Content>
              <Container bottom='small'>
                <Typography size='medium' weight='semibold'>
                  Enter a company name that you want to add a new job for.
                </Typography>
              </Container>

              <CompanyAutocomplete
                name='clientId'
                width='full'
                onSelect={(client: FormValues) => {
                  handleSelect(client)
                }}
                placeholder=''
                required
              />
            </Modal.Content>
            <Modal.Actions>
              <Button variant='secondary' onClick={hideModal}>
                Cancel
              </Button>
              <Button variant='positive' type='submit'>
                Continue
              </Button>
            </Modal.Actions>
          </Form>
        </Modal>
      )}
      <Button
        data-testid='add-job-button'
        size='small'
        variant='positive'
        onClick={showModal}
      >
        Add New Job
      </Button>
    </>
  )
}

export default AddJobButton
