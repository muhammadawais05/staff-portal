import { createContext, useContext } from 'react'

import { GetEngagementQuery } from '../data/getEngagement.graphql.types'

export const EngagementContext =
  createContext<GetEngagementQuery['node']>(undefined)

export const useEngagementContext = () => useContext(EngagementContext)
