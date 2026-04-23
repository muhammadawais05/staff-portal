import { Scalars } from '@staff-portal/graphql/staff'

const getStartOfDayDateTimeString = (
  dateTimeString: Scalars['Time']
): Scalars['Time'] =>
  dateTimeString.replace(/T(\d{2}:\d{2}:\d{2})/, 'T00:00:00') as Scalars['Time']

export default getStartOfDayDateTimeString
