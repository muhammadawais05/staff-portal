import { CreateClaimerPostAction } from '@staff-portal/graphql/staff'
import {
  getClientProfilePath,
  COMPANY_PATH_SECTION
} from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { CreateClaimerResult, Company, CallbackRequestType } from '../../types'

const getSuccessClaimMessage = (
  pendingCallbackRequest: { type?: string | null } | null | undefined
) =>
  pendingCallbackRequest?.type?.toUpperCase() === CallbackRequestType.SCHEDULED
    ? "You have successfully claimed this call, as well as the client's company. Please contact the client at the time they requested."
    : 'Congratulations, you have successfully claimed the company and instant call request. Please call the client immediately.'

const getErrorClaimMessage = (
  pendingCallbackRequest: { type?: string | null } | null | undefined
) =>
  pendingCallbackRequest?.type?.toUpperCase() === CallbackRequestType.SCHEDULED
    ? "You have successfully claimed the client's company, but you have not successfully claimed this call."
    : 'Failed automatically claiming callback request. You are now the priority claimer and have a few seconds to do it.'

export const getNextAction = (
  {
    nextActionName,
    pendingCallbackRequest,
    emailTemplate
  }: CreateClaimerResult,
  { id, contact }: Company
): {
  redirectLink: string
  successMessage?: string
  errorMessage?: string
} => {
  const { id: clientId } = decodeEntityId(id)

  let emailTemplateQuery = ''

  if (emailTemplate) {
    const { id: emailTemplateId } = decodeEntityId(emailTemplate.id)

    emailTemplateQuery = `?email_template_id=${emailTemplateId}`
  }

  switch (nextActionName) {
    case CreateClaimerPostAction.SUCCESS_CLAIM_ACTION:
      return {
        successMessage: getSuccessClaimMessage(pendingCallbackRequest),
        redirectLink: getClientProfilePath(clientId, {
          section: COMPANY_PATH_SECTION.CALL_REQUESTS
        })
      }

    case CreateClaimerPostAction.FAILED_CLAIM_ACTION:
      return {
        errorMessage: getErrorClaimMessage(pendingCallbackRequest),
        redirectLink: getClientProfilePath(clientId, {
          section: COMPANY_PATH_SECTION.CALL_REQUESTS
        })
      }

    case CreateClaimerPostAction.ENTERPRISE_CLAIM_ACTION:
      return {
        redirectLink: getClientProfilePath(clientId, {
          // todo: change to Staff portal's modal, create a follow-up
          // todo: verify the URL, then remove the comment
          section: `modal=/platform/staff/applicants/clients/${clientId}/claim_enterprise`
        })
      }

    case CreateClaimerPostAction.ENTERPRISE_CLAIM_SEND_TO_ROLE_ACTION: {
      if (contact) {
        const { id: decodedContactId } = decodeEntityId(contact.id)

        return {
          redirectLink: getClientProfilePath(clientId, {
            // todo: change to Staff portal's modal, create a follow-up
            section: `modal=/platform/roles/${decodedContactId}/email/send_to_company_representative${emailTemplateQuery}`
          })
        }
      }

      return {
        errorMessage: 'No contact specified, returning to company profile',
        redirectLink: getClientProfilePath(clientId)
      }
    }

    case CreateClaimerPostAction.CALL_REQUIRED_ACTION: {
      return {
        redirectLink: getClientProfilePath(clientId)
      }
    }

    case CreateClaimerPostAction.SEND_CLIENT_CLAIM_EMAIL_ACTION: {
      return {
        redirectLink: getClientProfilePath(clientId, {
          // todo: change to Staff portal's modal, create a follow-up
          // todo: verify the URL, then remove the comment
          section: `modal=/platform/staff/applicants/clients/${clientId}/send_claim_email${emailTemplateQuery}`
        })
      }
    }

    default:
      return {
        redirectLink: getClientProfilePath(clientId)
      }
  }
}
