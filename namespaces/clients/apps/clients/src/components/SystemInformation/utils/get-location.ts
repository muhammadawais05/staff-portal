import { NO_VALUE } from '@staff-portal/config'

import { SystemInformationFragment } from '../data'

export const getLocation = (
  location: SystemInformationFragment['representatives']['nodes'][0]['ipLocationV2']
) =>
  [location?.cityName, location?.countryName].filter(Boolean).join(', ') ||
  NO_VALUE
