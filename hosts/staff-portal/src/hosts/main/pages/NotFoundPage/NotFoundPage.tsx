import React from 'react'
import {
  Button,
  Container,
  Typography,
  // eslint-disable-next-line
  Link as PicassoLink
} from '@toptal/picasso'
import { RouterLink } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { usePageTitle } from '@staff-portal/browser'
import { Content } from '@staff-portal/page-wrapper'

import NotFoundIcon from './components/NotFoundIcon'
import * as S from './styles'

const NotFoundPage = () => {
  usePageTitle('Page Not Found')

  return (
    <Content>
      <Container css={S.container} bottom='large' justifyContent='center' flex>
        <NotFoundIcon />
      </Container>
      <Container bottom='small' justifyContent='center' flex>
        <Typography variant='heading' size='xlarge' align='center'>
          Page Doesn't Exist
        </Typography>
      </Container>
      <Container bottom='medium' justifyContent='center' flex>
        <Typography size='medium' align='center' color='dark-grey'>
          Sorry, that page doesn't exist.
        </Typography>
      </Container>
      <Container justifyContent='center' flex>
        <Button
          as={RouterLink as typeof PicassoLink}
          href={RoutePath.Dashboard}
        >
          Return to Overview
        </Button>
      </Container>
    </Content>
  )
}

export default NotFoundPage
