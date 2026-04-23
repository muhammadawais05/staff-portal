import React, { useState } from 'react'
import { Radio, Button, Typography, Container } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'

interface ContactOption {
  key: string
  label: string
  button: JSX.Element
}

interface Props {
  onClose: () => void
  contactOptions: ContactOption[]
}

const ContactClientModal = ({ onClose, contactOptions }: Props) => {
  const [selectedOptionKey, setSelectedOptionKey] = useState('')

  const selectedOption = contactOptions.find(
    ({ key }) => key === selectedOptionKey
  )

  return (
    <Modal open onClose={onClose}>
      <Modal.Title>Contact</Modal.Title>
      <Modal.Content>
        <Container bottom='small'>
          <Typography as='p' size='medium'>
            Please select the contact method
          </Typography>
        </Container>
        <Radio.Group
          value={selectedOptionKey}
          onChange={event => {
            setSelectedOptionKey(event.target.value)
          }}
        >
          {contactOptions.map(({ key, label }) => (
            <Radio key={key} value={key} label={label} />
          ))}
        </Radio.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        {selectedOption?.button}
      </Modal.Actions>
    </Modal>
  )
}

export default ContactClientModal
