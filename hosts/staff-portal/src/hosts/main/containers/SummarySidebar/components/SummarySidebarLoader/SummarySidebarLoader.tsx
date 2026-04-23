import React from 'react'

import WidgetSectionLoader from '../WidgetSectionLoader'
import * as S from '../../styles'

const SummarySidebarLoader = () => (
  <div css={S.root}>
    <WidgetSectionLoader rows={2} />
    <WidgetSectionLoader rows={1} />
    <WidgetSectionLoader rows={4} hasButton />
    <WidgetSectionLoader rows={4} hasButton />
    <WidgetSectionLoader rows={8} />
  </div>
)

export default SummarySidebarLoader
