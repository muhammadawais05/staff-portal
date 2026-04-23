import { useMemo } from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'
import { RoleOrClientFragment } from '@staff-portal/facilities'
import { getStartOfCurrentDayDateTimeString } from '@staff-portal/date-time-utils'
import { useUserTimeZone } from '@staff-portal/current-user'

import { convertContactToItem } from '../../../ActivityForm/utils'
import { CreateActivityFormValues } from '../../AddActivityModalContent'

type Props = {
  contact?: RoleOrClientFragment | null
  subjectId: string
  type?: ActivityType
}

const useGetFormInitialValues = ({ contact, subjectId, type }: Props) => {
  const userTimeZone = useUserTimeZone()

  return useMemo<CreateActivityFormValues>(
    () => ({
      type: type || ActivityType.CLIENT_RELATED,
      subjectId,
      contacts: contact ? [convertContactToItem(contact)] : [],
      occurredAt: userTimeZone
        ? getStartOfCurrentDayDateTimeString({
            timeZone: userTimeZone
          })
        : null,
      subtype: '',
      outcome: '',
      duration: '0'
    }),
    [subjectId, contact, type, userTimeZone]
  )
}

export default useGetFormInitialValues
