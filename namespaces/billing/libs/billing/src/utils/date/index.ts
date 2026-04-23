import { Scalars } from '@staff-portal/graphql/staff'

interface GetISODateFromYearMonth {
  year: number
  month: number
}

export const getISODateFromYearMonth = ({
  year,
  month
}: GetISODateFromYearMonth): Scalars['Date'] =>
  `${year}-${
    month.toString().length < 2 ? `0${month}` : month
  }-01` as Scalars['Date']
