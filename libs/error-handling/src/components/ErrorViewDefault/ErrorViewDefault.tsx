import React from 'react'
import { Container, Button } from '@toptal/picasso'
import { reloadPage } from '@staff-portal/navigation'

import ModuleErrorIcon from '../ModuleErrorIcon'
import ErrorViewLayout from '../ErrorViewLayout'
import * as S from './styles'

const ErrorViewDefault = () => {
  return (
    <Container css={S.container}>
      <ErrorViewLayout
        icon={<ModuleErrorIcon />}
        header={`Page Couldn't Load`}
        subHeader='The Support team is working to fix this issue. Please try again later.'
        button={<Button onClick={reloadPage}>Refresh page</Button>}
      />
    </Container>
  )
}

export default ErrorViewDefault
