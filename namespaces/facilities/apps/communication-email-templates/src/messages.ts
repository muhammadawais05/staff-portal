import { defineMessage } from '@toptal/staff-portal-message-bus'

export const EMAIL_TEMPLATE_UPDATED =
  defineMessage<{ emailTemplateId: string }>()
