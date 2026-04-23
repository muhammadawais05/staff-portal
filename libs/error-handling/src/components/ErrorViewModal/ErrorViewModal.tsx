import React from 'react'
import { Container, Button } from '@toptal/picasso'

import ModuleErrorIcon from '../ModuleErrorIcon'
import ErrorViewLayout from '../ErrorViewLayout'

interface Props {
  handleClose?: () => void
}

const ErrorViewModal = ({ handleClose }: Props) => (
  <Container padded='large'>
    <ErrorViewLayout
      icon={<ModuleErrorIcon />}
      header={`Couldn't Load`}
      subHeader='The Support team is working to fix this issue. Please try again later.'
      button={
        handleClose ? <Button onClick={handleClose}>Close</Button> : undefined
      }
    />
  </Container>
)

export default ErrorViewModal
