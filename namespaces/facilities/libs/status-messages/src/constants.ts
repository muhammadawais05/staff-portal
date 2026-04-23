import { GENERAL_APP_QUERIES_BATCH_KEY } from '@staff-portal/data-layer-service'
import { StatusMessageSeverity } from '@staff-portal/graphql/staff'
import { AlertProps } from '@toptal/picasso'

export const STATUS_MESSAGES_BATCH_KEY = GENERAL_APP_QUERIES_BATCH_KEY

export const SEVERITY_TO_VARIANT_MAP: Record<
  StatusMessageSeverity,
  AlertProps['variant']
> = {
  [StatusMessageSeverity.ALERT]: 'red',
  [StatusMessageSeverity.ERROR]: 'red',
  [StatusMessageSeverity.INFO]: 'blue',
  [StatusMessageSeverity.NOTICE]: 'green',
  [StatusMessageSeverity.WARNING]: 'yellow'
} as const
