import { Scalars } from '@staff-portal/graphql/staff'

const convertDateTimeStringToDateString = (
  dateTimeString: Scalars['Time']
): Scalars['Date'] => {
  return (dateTimeString.split('T')[0] ?? dateTimeString) as Scalars['Date']
}

export default convertDateTimeStringToDateString
