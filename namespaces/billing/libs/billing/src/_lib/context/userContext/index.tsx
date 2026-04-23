import { createContext, useContext } from 'react'
import { CurrentUser } from '@staff-portal/current-user'

import { WeekStartsOn } from '../../../@types/types'

interface UserContextProps {
  currentUser?: CurrentUser
  datepickerDisplayDateFormat?: string
  datepickerEditDateFormat?: string
  locale: string
  role: string
  // Index of the first day of the week (0 - Sunday)
  weekStartsOn: WeekStartsOn
}

export const UserContext = createContext<UserContextProps>({
  datepickerDisplayDateFormat: '',
  datepickerEditDateFormat: '',
  locale: '',
  role: '',
  weekStartsOn: 0
})

/* istanbul ignore next */
export const useUserContext = () => useContext(UserContext)
