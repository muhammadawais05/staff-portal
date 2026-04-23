import React from 'react'
import {
  Button,
  Container,
  Unavailable24,
  // eslint-disable-next-line
  Link as PicassoLink
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'

import ErrorViewLayout from '../ErrorViewLayout'
import * as S from './styles'

const ErrorViewNotFound = () => {
  return (
    <Container css={S.container}>
      <ErrorViewLayout
        icon={<Unavailable24 />}
        header={`This Page Doesn't Exist`}
        subHeader={`Unfortunately, the page you're looking for doesn't exist`}
        button={
          <Button as={Link as typeof PicassoLink} href={RoutePath.Dashboard}>
            Return to Overview
          </Button>
        }
      />
    </Container>
  )
}

export default ErrorViewNotFound
