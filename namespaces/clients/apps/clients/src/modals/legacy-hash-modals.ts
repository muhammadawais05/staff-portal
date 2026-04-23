import { defineLegacyHashModal } from '@staff-portal/modals-service'

export const CLAIM_CLIENT_ENTERPRISE_MODAL = defineLegacyHashModal<{
  clientId: string
}>('claim_client_enterprise_modal')

export const SEND_INITIAL_CLAIM_EMAIL_MODAL = defineLegacyHashModal<{
  nodeId: string
  preselectedEmailTemplateId?: string
}>('send_initial_claim_email_modal')

export const SEND_TO_COMPANY_REPRESENTATIVE = defineLegacyHashModal<{
  nodeId: string
  preselectedEmailTemplateId?: string
}>('send_to_company_representative')
