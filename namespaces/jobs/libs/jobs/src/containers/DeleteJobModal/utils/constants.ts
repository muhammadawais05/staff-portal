import {
  JobClientHiredElsewhere,
  JobClientHiredInternallyOrExternally
} from '@staff-portal/graphql/staff'

export const hiredElsewhereOptions = [
  { text: 'Yes', value: JobClientHiredElsewhere.YES },
  { text: 'No', value: JobClientHiredElsewhere.NO },
  { text: 'Unknown', value: JobClientHiredElsewhere.UNKNOWN }
]

export const internallyOrExternallyOptions = [
  {
    text: 'Internal',
    value: JobClientHiredInternallyOrExternally.INTERNAL
  },
  {
    text: 'External',
    value: JobClientHiredInternallyOrExternally.EXTERNAL
  },
  {
    text: 'Unknown',
    value: JobClientHiredInternallyOrExternally.UNKNOWN
  }
]
