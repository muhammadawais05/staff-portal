import React from 'react'

import StoryShell from '../../story-shell'
import Component from './PlatformOverviewPage'

export default {
  title: 'Billing/Legacy Widgets/Platform Overview Page',
  component: Component
}

export const PlatformOverviewPage = () => {
  return <StoryShell render={appProps => <Component {...appProps} />} />
}
