import { Container, Loader } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'
import i18n from '../../utils/i18n'

interface Props {
  text?: string
}

const displayName = 'PageLoader'

export const PageLoader: FC<Props> = memo(({ text }) => (
  <Container css={S.container} bottom={5} data-testid={displayName} top={5}>
    <Loader>{text}</Loader>
  </Container>
))

PageLoader.defaultProps = {
  text: i18n.t('common:loader')
}

PageLoader.displayName = displayName

export default PageLoader
