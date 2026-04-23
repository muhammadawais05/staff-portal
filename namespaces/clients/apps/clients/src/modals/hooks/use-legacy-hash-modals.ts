import type { ModalRegistry } from '@staff-portal/modals-service'
import {
  decodeEntityId,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { SendGeneralEmailModal } from '@staff-portal/communication-send-email'

import {
  CLAIM_CLIENT_ENTERPRISE_MODAL,
  SEND_INITIAL_CLAIM_EMAIL_MODAL,
  SEND_TO_COMPANY_REPRESENTATIVE
} from '../'
import ClaimClientEnterpriseModal from '../../profile-page/components/ClaimClientEnterpriseModal'
import {
  CLAIM_CLIENT_ENTERPRISE_MODAL_REGEX,
  SEND_INITIAL_CLAIM_EMAIL_MODAL_REGEX,
  SEND_TO_COMPANY_REPRESENTATIVE_REGEX
} from '../config'
import SendInitialClaimEmailModal from '../components/SendInitialClaimEmailModal/SendInitialClaimEmailModal'

const useLegacyHashModals = (registry: ModalRegistry) => {
  registry.set(CLAIM_CLIENT_ENTERPRISE_MODAL, {
    Component: ClaimClientEnterpriseModal,
    pattern: CLAIM_CLIENT_ENTERPRISE_MODAL_REGEX,
    mapHashToPayload: ({ clientId }, { showWarning }) => {
      if (!clientId) {
        return showWarning()
      }

      return { clientId: encodeEntityId(clientId, 'Client') }
    },
    mapPayloadToHash: ({ clientId }) =>
      `#modal=/platform/staff/applicants/clients/${clientId}/claim_enterprise`
  })

  registry.set(SEND_INITIAL_CLAIM_EMAIL_MODAL, {
    Component: SendInitialClaimEmailModal,
    pattern: SEND_INITIAL_CLAIM_EMAIL_MODAL_REGEX,
    mapHashToPayload: (
      { nodeId, preselectedEmailTemplateId },
      { showWarning }
    ) => {
      if (!nodeId) {
        return showWarning()
      }

      return {
        nodeId: encodeEntityId(nodeId, 'Client'),
        preselectedEmailTemplateId: preselectedEmailTemplateId
          ? encodeEntityId(preselectedEmailTemplateId, 'EmailTemplate')
          : undefined
      }
    },
    mapPayloadToHash: ({ nodeId, preselectedEmailTemplateId }) =>
      `#modal=/platform/staff/clients/${nodeId}/send_claim_email${
        preselectedEmailTemplateId
          ? `?email_template_id=${decodeEntityId(preselectedEmailTemplateId)}`
          : ''
      }`
  })

  registry.set(SEND_TO_COMPANY_REPRESENTATIVE, {
    Component: SendGeneralEmailModal,
    pattern: SEND_TO_COMPANY_REPRESENTATIVE_REGEX,
    mapHashToPayload: (
      { nodeId, preselectedEmailTemplateId },
      { showWarning }
    ) => {
      if (!nodeId) {
        return showWarning()
      }

      return {
        nodeId: encodeEntityId(nodeId, 'CompanyRepresentative'),
        preselectedEmailTemplateId: preselectedEmailTemplateId
          ? encodeEntityId(preselectedEmailTemplateId, 'EmailTemplate')
          : undefined
      }
    },
    mapPayloadToHash: ({ nodeId, preselectedEmailTemplateId }) =>
      `#modal=/platform/roles/${nodeId}/email/send_to_company_representative${
        preselectedEmailTemplateId
          ? `?email_template_id=${decodeEntityId(preselectedEmailTemplateId)}`
          : ''
      }`
  })
}

export default useLegacyHashModals
