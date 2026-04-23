import { decodeEntityId } from '@staff-portal/data-layer-service'

export const getEmailTemplateId = (template?: string | null) =>
  template ? Number(decodeEntityId(template).id) : null
