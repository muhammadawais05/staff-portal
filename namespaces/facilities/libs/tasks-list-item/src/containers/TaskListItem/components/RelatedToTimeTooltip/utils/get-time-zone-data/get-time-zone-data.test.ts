import {
  ClientTimeZoneFragment,
  RoleTimeZoneFragment
} from '../../../RelatedToTime/data/task-engaged-subject-fragment'
import { getTimeZoneData } from './get-time-zone-data'

describe('get time zone data', () => {
  it('should handle time zone for Role', () => {
    const NAME = 'Zachary Elfman'
    const TIME_ZONE_NAME = '(UTC+02:00) Europe - Madrid'
    const ROLE_TIME_ZONE: RoleTimeZoneFragment = {
      id: 'VjEtVGFsZW50LTU1NTczOA',
      fullName: NAME,
      type: 'FinanceExpert',
      timeZone: {
        name: TIME_ZONE_NAME
      }
    }

    const result = getTimeZoneData(ROLE_TIME_ZONE)

    expect(result).toEqual({
      name: NAME,
      type: 'Finance Expert',
      timeZoneName: TIME_ZONE_NAME
    })
  })

  it('should handle time zone for Client', () => {
    const NAME = 'Maxie Torp'
    const TIME_ZONE_NAME = '(UTC+07:00) Asia - Jakarta'
    const CLIENT_TIME_ZONE: ClientTimeZoneFragment = {
      id: 'VjEtQ2xpZW50LTQxODAwNw',
      contact: {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE5MDQ5MTk',
        fullName: NAME
      },
      timeZone: {
        name: TIME_ZONE_NAME
      }
    }

    const result = getTimeZoneData(CLIENT_TIME_ZONE)

    expect(result).toEqual({
      name: NAME,
      type: 'Contact',
      timeZoneName: TIME_ZONE_NAME
    })
  })
})
