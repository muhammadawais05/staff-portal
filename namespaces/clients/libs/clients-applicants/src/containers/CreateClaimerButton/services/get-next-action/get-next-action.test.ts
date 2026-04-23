import { CreateClaimerPostAction } from '@staff-portal/graphql/staff'
import { getClientProfilePath } from '@staff-portal/routes'

import { CallbackRequestType } from '../../types'
import { getNextAction } from './get-next-action'

jest.mock('@staff-portal/routes', () => ({
  __esModule: true,
  COMPANY_PATH_SECTION: { CALL_REQUESTS: 'test-section' },
  getClientProfilePath: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  __esModule: true,
  decodeEntityId: (id: string) => ({ id })
}))

const COMPANT_MOCK = {
  id: 'abc',
  contact: { id: 'abc' }
}

describe('getNextAction', () => {
  describe('when nextActionName is SUCCESS_CLAIM_ACTION', () => {
    it('returns success message with scheduled call request', () => {
      const result = getNextAction(
        {
          nextActionName: CreateClaimerPostAction.SUCCESS_CLAIM_ACTION,
          pendingCallbackRequest: { type: CallbackRequestType.SCHEDULED }
        },
        COMPANT_MOCK
      )

      expect(result.successMessage).toBe(
        "You have successfully claimed this call, as well as the client's company. Please contact the client at the time they requested."
      )
      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: 'test-section'
      })
    })

    it('returns success message with NO scheduled call request', () => {
      const result = getNextAction(
        {
          nextActionName: CreateClaimerPostAction.SUCCESS_CLAIM_ACTION,
          pendingCallbackRequest: { type: CallbackRequestType.INSTANT }
        },
        COMPANT_MOCK
      )

      expect(result.successMessage).toBe(
        'Congratulations, you have successfully claimed the company and instant call request. Please call the client immediately.'
      )
      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: 'test-section'
      })
    })
  })

  describe('when nextActionName is FAILED_CLAIM_ACTION', () => {
    it('returns success message with scheduled call request', () => {
      const result = getNextAction(
        {
          nextActionName: CreateClaimerPostAction.FAILED_CLAIM_ACTION,
          pendingCallbackRequest: { type: CallbackRequestType.SCHEDULED }
        },
        COMPANT_MOCK
      )

      expect(result.errorMessage).toBe(
        "You have successfully claimed the client's company, but you have not successfully claimed this call."
      )
      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: 'test-section'
      })
    })

    it('returns success message with NO scheduled call request', () => {
      const result = getNextAction(
        {
          nextActionName: CreateClaimerPostAction.FAILED_CLAIM_ACTION,
          pendingCallbackRequest: { type: CallbackRequestType.INSTANT }
        },
        COMPANT_MOCK
      )

      expect(result.errorMessage).toBe(
        'Failed automatically claiming callback request. You are now the priority claimer and have a few seconds to do it.'
      )
      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: 'test-section'
      })
    })
  })

  describe('when nextActionName is ENTERPRISE_CLAIM_ACTION', () => {
    it('returns redirectLink only', () => {
      getNextAction(
        {
          nextActionName: CreateClaimerPostAction.ENTERPRISE_CLAIM_ACTION
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: `modal=/platform/staff/applicants/clients/${COMPANT_MOCK.id}/claim_enterprise`
      })
    })
  })

  describe('when nextActionName is ENTERPRISE_CLAIM_SEND_TO_ROLE_ACTION', () => {
    it('returns redirectLink only with email template', () => {
      const EMAIL_TEMLATE_ID = 'abc'

      getNextAction(
        {
          nextActionName:
            CreateClaimerPostAction.ENTERPRISE_CLAIM_SEND_TO_ROLE_ACTION,
          emailTemplate: {
            id: EMAIL_TEMLATE_ID
          }
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: `modal=/platform/roles/${COMPANT_MOCK.contact.id}/email/send_to_company_representative?email_template_id=${EMAIL_TEMLATE_ID}`
      })
    })

    it('returns redirectLink only without email template', () => {
      getNextAction(
        {
          nextActionName:
            CreateClaimerPostAction.ENTERPRISE_CLAIM_SEND_TO_ROLE_ACTION
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: `modal=/platform/roles/${COMPANT_MOCK.contact.id}/email/send_to_company_representative`
      })
    })
  })

  describe('when nextActionName is CALL_REQUIRED_ACTION', () => {
    it('returns redirectLink only with email template', () => {
      getNextAction(
        {
          nextActionName: CreateClaimerPostAction.CALL_REQUIRED_ACTION
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id)
    })
  })

  describe('when nextActionName is SEND_CLIENT_CLAIM_EMAIL_ACTION', () => {
    it('returns redirectLink only with email template', () => {
      const EMAIL_TEMLATE_ID = 'abc'

      getNextAction(
        {
          nextActionName:
            CreateClaimerPostAction.SEND_CLIENT_CLAIM_EMAIL_ACTION,
          emailTemplate: {
            id: EMAIL_TEMLATE_ID
          }
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: `modal=/platform/staff/applicants/clients/${COMPANT_MOCK.id}/send_claim_email?email_template_id=${EMAIL_TEMLATE_ID}`
      })
    })

    it('returns redirectLink only without email template', () => {
      getNextAction(
        {
          nextActionName: CreateClaimerPostAction.SEND_CLIENT_CLAIM_EMAIL_ACTION
        },
        COMPANT_MOCK
      )

      expect(getClientProfilePath).toHaveBeenCalledWith(COMPANT_MOCK.id, {
        section: `modal=/platform/staff/applicants/clients/${COMPANT_MOCK.id}/send_claim_email`
      })
    })
  })
})
