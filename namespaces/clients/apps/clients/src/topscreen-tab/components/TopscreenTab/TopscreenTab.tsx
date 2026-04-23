import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import TopscreenPositionsSection from '../TopscreenPositionsSection'

type Props = {
  topscreenClientId: string
}

const TopscreenTab = ({ topscreenClientId }: Props) => {
  return (
    <WidgetErrorBoundary emptyOnError>
      <TopscreenPositionsSection topscreenClientId={topscreenClientId} />
    </WidgetErrorBoundary>
  )
}

export default TopscreenTab
