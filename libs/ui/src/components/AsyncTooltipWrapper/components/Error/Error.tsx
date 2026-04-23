import { Container, Alert, Typography } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

const Error = () => {
  return (
    <Container>
      <Alert.Inline variant='red' css={S.errorAlertContainer}>
        <Typography size='xsmall' data-testid='Error'>
          Something went wrong. Please try again later.
        </Typography>
      </Alert.Inline>
    </Container>
  )
}

export default Error
