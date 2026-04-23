import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { reloadPage } from '@staff-portal/navigation'

import ApplicationErrorIcon from '../ApplicationErrorIcon'
import ErrorViewLayout from '../ErrorViewLayout'
import * as S from './styles'

const ErrorViewApplication = () => {
  return (
    <Container css={S.container}>
      <ErrorViewLayout
        icon={<ApplicationErrorIcon />}
        header={`Page Couldn't Load`}
        subHeader='The Support team is working to fix this issue. Please try again later.'
        button={<Button onClick={reloadPage}>Refresh page</Button>}
      />
    </Container>
  )
}

export default ErrorViewApplication
