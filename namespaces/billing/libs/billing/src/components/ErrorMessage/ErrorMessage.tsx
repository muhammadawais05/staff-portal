import { Button, Container, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'
import { locationReload } from '../../_lib/helpers/location'
import i18n from '../../utils/i18n'
import ErrorMessageIcon from './ErrorMessageIcon'

const displayName = 'ErrorMessage'

export const ErrorMessage: FC = memo(() => {
  return (
    <Container data-testid={displayName} padded='small'>
      <Container css={S.iconWrapper}>
        <ErrorMessageIcon css={S.icon} />
      </Container>

      <Container
        flex
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography
          css={S.headingTitle}
          data-testid='error-title'
          size='large'
          variant='heading'
        >
          {i18n.t('common:error.renderError.title')}
        </Typography>
        <Typography data-testid='error-description' size='medium'>
          {i18n.t('common:error.renderError.description')}
        </Typography>

        <Container top='large'>
          <Button onClick={locationReload}>
            {i18n.t('common:error.renderError.action.refreshPage')}
          </Button>
        </Container>
      </Container>
    </Container>
  )
})

ErrorMessage.displayName = displayName

export default ErrorMessage
