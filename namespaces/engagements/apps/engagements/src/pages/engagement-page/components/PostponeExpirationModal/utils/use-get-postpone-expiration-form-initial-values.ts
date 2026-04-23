import {
  addBusinessDays,
  getDateString,
  startOfDay
} from '@staff-portal/date-time-utils'
import { useRef } from 'react'

import { PostponeExpirationFormType } from '../PostponeExpirationModal'

const useGetPostponeExpirationFormInitialValues = () => {
  const initialValues = useRef<Partial<PostponeExpirationFormType>>({
    // The default value for expiration_date in form is after 3 business days
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    expirationDate: getDateString(addBusinessDays(startOfDay(new Date()), 3))
  })

  return initialValues.current
}

export default useGetPostponeExpirationFormInitialValues
