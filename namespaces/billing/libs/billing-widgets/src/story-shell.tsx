import React, { FC } from 'react'
import { useDependenciesRegistry } from '@staff-portal/dependency-injector'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { BILLING_MODALS_PATH_MAP } from '@staff-portal/billing/src/dependencies'
import BaseStoryShell from '@staff-portal/billing/src/story-shell'

import { BillingWidgetsModalsPathsMap } from './modals'

interface Props {
  render: FC<BaseAppProps>
}

export const StoryShell = ({ render: Component }: Props) => {
  const dependenciesRegistry = useDependenciesRegistry()

  dependenciesRegistry.set(
    BILLING_MODALS_PATH_MAP,
    BillingWidgetsModalsPathsMap
  )

  return (
    <BaseStoryShell
      dependenciesRegistry={dependenciesRegistry}
      render={appProps => <Component {...appProps} />}
    />
  )
}

export default StoryShell
