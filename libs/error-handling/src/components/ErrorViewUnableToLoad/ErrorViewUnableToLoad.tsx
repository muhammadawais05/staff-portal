import React from 'react'
import { Container, Button } from '@toptal/picasso'
import { reloadPage } from '@staff-portal/navigation'

import UnableToLoadIcon from '../UnableToLoadIcon'
import ErrorViewLayout from '../ErrorViewLayout'
import * as S from './styles'

const ErrorViewUnableToLoad = () => {
  return (
    <Container css={S.container}>
      <ErrorViewLayout
        icon={<UnableToLoadIcon />}
        header={`Page Couldn't Load`}
        subHeader='Sorry, something went wrong. Please try again later.'
        button={<Button onClick={reloadPage}>Reload page</Button>}
      />
    </Container>
  )
}

export default ErrorViewUnableToLoad
