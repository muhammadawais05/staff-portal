import React, { ComponentProps } from 'react'
import { useDependenciesRegistry } from '@staff-portal/dependency-injector'
import { BILLING_MODALS_PATH_MAP } from '@staff-portal/billing/src/dependencies'
import BaseStoryShell from '@staff-portal/billing/src/story-shell'
import { BillingWidgetsModalsPathsMap } from '@staff-portal/billing-widgets/src/modals'

import { BillingAppModalsPathsMap } from './billing-modals'

type Props = Omit<ComponentProps<typeof BaseStoryShell>, 'dependenciesRegistry'>

export const StoryShell = ({
  render: Component,
  params,
  queryParams
}: Props) => {
  const dependenciesRegistry = useDependenciesRegistry()

  dependenciesRegistry.set(BILLING_MODALS_PATH_MAP, {
    ...BillingWidgetsModalsPathsMap,
    ...BillingAppModalsPathsMap
  })

  return (
    <BaseStoryShell
      dependenciesRegistry={dependenciesRegistry}
      params={params}
      queryParams={queryParams}
      render={appProps => <Component {...appProps} />}
    />
  )
}

export const RelatedTasks = () => <>RELATED TASKS MOCK</>

export const TimelineButton = () => <>TIMELINE BUTTON MOCK</>

export const renderRecentActivityButton = () => <>RECENT ACTIVITY BUTTON MOCK</>

export default StoryShell
