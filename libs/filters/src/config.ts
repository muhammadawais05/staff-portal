import { generateTimezoneOffset } from '@staff-portal/date-time-utils'
import {
  TIMEZONE_FILTER_MAX,
  TIMEZONE_FILTER_MIN,
  TIMEZONE_FILTER_STEP
} from '@staff-portal/config'

import { SliderRangeFilterConfig } from './components'

export const TIMEZONE_FILTER_OPTIONS: SliderRangeFilterConfig['options'] = {
  min: TIMEZONE_FILTER_MIN,
  max: TIMEZONE_FILTER_MAX,
  step: TIMEZONE_FILTER_STEP,
  minLabel: generateTimezoneOffset(TIMEZONE_FILTER_MIN),
  maxLabel: generateTimezoneOffset(TIMEZONE_FILTER_MAX),
  tooltipFormat: (value: number) => generateTimezoneOffset(value),
  displayRender: (value: number) => generateTimezoneOffset(value),
  tillPropertyName: 'to'
}
