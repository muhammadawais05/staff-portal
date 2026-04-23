import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'
import EntOverviewBillingHeaderFilter from '../EntOverviewBillingHeaderFilter'

const displayName = 'EntOverviewBillingHeader'

export const EntOverviewBillingHeader: FC = memo(() => {
  const { t: translate } = useTranslation('entOverview')

  return (
    <Container data-testid={displayName} css={S.headerTitle}>
      <Typography variant='heading' size='large'>
        {translate('billing.title')}
      </Typography>
      <EntOverviewBillingHeaderFilter />
    </Container>
  )
})
EntOverviewBillingHeader.defaultProps = {}

EntOverviewBillingHeader.displayName = displayName

export default EntOverviewBillingHeader
