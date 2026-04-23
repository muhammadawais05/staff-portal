import { createContext, useContext } from 'react'
import { Engagement } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'

const EngagementContext = createContext<Engagement>(
  fixtures.MockEngagement as any
)

export const useEngagementContext = (): Engagement =>
  useContext(EngagementContext)
