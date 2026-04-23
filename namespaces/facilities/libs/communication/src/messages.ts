import { defineMessage } from '@toptal/staff-portal-message-bus'

export const EMAIL_ASSOCIATED_WITH_USER = defineMessage<{ email: string }>()
export const ERROR_MESSAGE = 'Unable to call contact.'

export const REFRESH_CALLS_LIST = defineMessage('refresh-calls-list')
