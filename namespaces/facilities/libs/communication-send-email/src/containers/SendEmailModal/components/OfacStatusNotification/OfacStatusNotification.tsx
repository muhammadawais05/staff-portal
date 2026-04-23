import React from 'react'
import { Alert, Container } from '@toptal/picasso'
import { OfacStatus } from '@staff-portal/graphql/staff'

import { useSendEmailContext } from '../../context/send-email-context'

const OfacStatusNotification = () => {
  const {
    emailContext: { fullName, ofacStatus }
  } = useSendEmailContext()

  if (!ofacStatus || ofacStatus === OfacStatus.NORMAL) {
    return null
  }

  return (
    <Container top='small'>
      <Alert variant='red'>
        {fullName} is in the "{ofacStatus.toLowerCase()}" OFAC status -
        communication with them should be avoided except the communication
        required for the OFAC investigation.
      </Alert>
    </Container>
  )
}

export default OfacStatusNotification
