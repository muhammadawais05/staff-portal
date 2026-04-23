import React from 'react'
import { Grid } from '@toptal/picasso'
import {
  WEEK_STARTS_ON,
  DEFAULT_ISO_DATE_FORMAT,
  DEFAULT_ISO_DATE_PLACEHOLDER,
  parseISO
} from '@staff-portal/date-time-utils'
import { DatePickerValue, DatePickerWrapper } from '@staff-portal/ui'
import { Scalars } from '@staff-portal/graphql/staff'

import { useFiltersContext } from '../Filters/FiltersContext'
import FiltersField from '../Filters/FiltersField'
import * as S from './styles'
import { CommonFilterConfig } from '../Filters'

export type Props = Pick<
  CommonFilterConfig,
  'name' | 'label' | 'labelWidth'
> & {
  totalColumns: number
  maxDate?: Date
}

const SINGLE_COLUMN_CONTAINER_SIZE = 6
const DOUBLE_COLUMN_CONTAINER_SIZE = 12

const getDateInstanceFromFilterString = (
  dateString: string | undefined
): Date | undefined => {
  if (dateString === undefined) {
    return undefined
  }

  try {
    return parseISO(dateString)
  } catch (e) {
    return undefined
  }
}

const processDate = (date: DatePickerValue) => {
  return typeof date === 'string' ? date : null
}

const FiltersDateRange = ({
  name,
  label,
  labelWidth,
  totalColumns,
  maxDate
}: Props) => {
  const { getRangeFilterValues, setRangeFilterValues } = useFiltersContext()
  const { from: filterValueFrom, till: filterValueTo } =
    getRangeFilterValues<Scalars['Date']>(name)

  const dateFrom = getDateInstanceFromFilterString(filterValueFrom)
  const dateTo = getDateInstanceFromFilterString(filterValueTo)

  const gridItemSize =
    totalColumns === 1
      ? SINGLE_COLUMN_CONTAINER_SIZE
      : DOUBLE_COLUMN_CONTAINER_SIZE

  return (
    <FiltersField label={label} labelWidth={labelWidth}>
      <Grid spacing={16} css={S.filtersDateRangeGrid}>
        <Grid.Item small={gridItemSize}>
          <DatePickerWrapper
            // Re-render is essential for the default value to take effect, thus the key usage
            placeholder={DEFAULT_ISO_DATE_PLACEHOLDER}
            editDateFormat={DEFAULT_ISO_DATE_FORMAT}
            displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
            key={'initialDateFrom:' + filterValueFrom}
            maxDate={maxDate || dateTo}
            value={filterValueFrom}
            width='full'
            enableReset
            onResetClick={() =>
              setRangeFilterValues(name, undefined, filterValueTo)
            }
            onChange={date =>
              setRangeFilterValues(name, processDate(date), filterValueTo)
            }
            weekStartsOn={WEEK_STARTS_ON}
            testIds={{
              input: 'filters-date-from'
            }}
          />
        </Grid.Item>
        <Grid.Item small={gridItemSize}>
          <DatePickerWrapper
            // Re-render is essential for the default value to take effect, thus the key usage
            placeholder={DEFAULT_ISO_DATE_PLACEHOLDER}
            editDateFormat={DEFAULT_ISO_DATE_FORMAT}
            displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
            key={'initialDateTo:' + filterValueTo}
            minDate={dateFrom}
            maxDate={maxDate}
            width='full'
            enableReset
            onResetClick={() =>
              setRangeFilterValues(name, filterValueFrom, undefined)
            }
            value={filterValueTo}
            onChange={date =>
              setRangeFilterValues(name, filterValueFrom, processDate(date))
            }
            weekStartsOn={WEEK_STARTS_ON}
            testIds={{
              input: 'filters-date-till'
            }}
          />
        </Grid.Item>
      </Grid>
    </FiltersField>
  )
}

export default FiltersDateRange
