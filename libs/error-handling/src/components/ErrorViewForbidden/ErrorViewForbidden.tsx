import React from 'react'
import { Link } from '@staff-portal/navigation'
// eslint-disable-next-line
import { Button, Container, Link as PicassoLink } from '@toptal/picasso'

import { RoutePath } from '@staff-portal/routes'

import ForbiddenIcon from '../ForbiddenIcon'
import ErrorViewLayout from '../ErrorViewLayout'
import * as S from './styles'

const ErrorViewForbidden = () => {
  return (
    <Container css={S.container}>
      <ErrorViewLayout
        icon={<ForbiddenIcon />}
        header='This Page Requires Additional Permissions'
        subHeader='To request additional abilities, contact the IT team in #-itops-help.'
        button={
          <Button as={Link as typeof PicassoLink} href={RoutePath.Dashboard}>
            Return to Overview
          </Button>
        }
      />
    </Container>
  )
}

export default ErrorViewForbidden
