import { defineDependency } from '@staff-portal/dependency-injector'
import { FC } from 'react'
import { StaffPortalRelatedTasks } from '@staff-portal/billing'

export type RecentActivityButtonProps = {
  feeds: string[][]
  fullHistoryUrl: string
}

export type RecentActivityButtonComponent = FC<RecentActivityButtonProps>

export const RECENT_ACTIVITY_BUTTON =
  defineDependency<RecentActivityButtonComponent>()
export const RELATED_TASKS = defineDependency<StaffPortalRelatedTasks>()
