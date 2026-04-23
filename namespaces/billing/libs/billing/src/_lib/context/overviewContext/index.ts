import { createContext, useContext } from 'react'
import { noop } from '@toptal/picasso/utils'

import { OverviewAccessLevel } from '../../../@types/types'
import { TimePeriod } from '../../dateTime/helper'

interface OverviewContextProps {
  accessLevel: OverviewAccessLevel
  sinceDate: TimePeriod
  setAccessLevel: (accessLevel: OverviewAccessLevel) => void
  setSinceDate: (sinceDate: TimePeriod) => void
  isTeamLead: boolean
}

const initialData = {
  accessLevel: OverviewAccessLevel.MyBilling,
  isTeamLead: false,
  setAccessLevel: noop,
  setSinceDate: noop,
  sinceDate: TimePeriod.Quarter
}

export const OverviewContext = createContext<OverviewContextProps>(initialData)

export const useOverviewContext = (): OverviewContextProps =>
  useContext(OverviewContext)
