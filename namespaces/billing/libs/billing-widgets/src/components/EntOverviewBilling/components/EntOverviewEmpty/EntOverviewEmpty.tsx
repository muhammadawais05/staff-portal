import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'EntOverviewEmpty'

interface Props {}

export const EntOverviewEmpty: FC<Props> = memo(() => {
  const { t: translate } = useTranslation('entOverview')

  return (
    <Container css={S.emptyMessage}>
      <Container left={1}>
        <Container bottom={0.5}>
          <Typography color='grey' size='xsmall'>
            {translate('emptyTable')}
          </Typography>
        </Container>
      </Container>
    </Container>
  )
})

EntOverviewEmpty.displayName = displayName

export default EntOverviewEmpty
