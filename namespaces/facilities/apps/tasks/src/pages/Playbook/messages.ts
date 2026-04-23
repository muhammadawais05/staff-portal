import { defineMessage } from '@toptal/staff-portal-message-bus'

export const PLAYBOOK_TEMPLATE_UPDATED = defineMessage<{
  playbookTemplateId: string
}>()
