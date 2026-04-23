import { RoleStepNextActions } from '@staff-portal/graphql/staff'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import useSendTalentToPortfolioReviewModal from '../../../../../talent-page/components/SendTalentToPortfolioReviewModal/hooks'
import { useSendIntroduceBookingEmailModal } from '../../../../modals/SendIntroduceScreeningEmailModal/services/use-send-introduce-booking-email-modal/use-send-introduce-booking-email-modal'
import useNextAction from './use-next-action'

jest.mock(
  '../../../../modals/SendIntroduceScreeningEmailModal/services/use-send-introduce-booking-email-modal/use-send-introduce-booking-email-modal'
)
jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  useSendEmailModal: jest.fn()
}))
jest.mock(
  '../../../../../talent-page/components/SendTalentToPortfolioReviewModal/hooks'
)
jest.mock('@toptal/staff-portal-message-bus', () => ({
  __esModule: true,
  defineMessage: () => null,
  useMessageEmitter: () => () => {}
}))
jest.mock('@staff-portal/talents/src/messages', () => ({
  ROLE_STEP_UPDATED: 'ROLE_STEP_UPDATED'
}))

describe('useNextAction', () => {
  it('returns correct handler and render function', () => {
    const showSendTalentToPortfolioReviewModal = jest.fn()
    const mockedUseSendTalentToPortfolioReviewModal =
      useSendTalentToPortfolioReviewModal as jest.Mock

    mockedUseSendTalentToPortfolioReviewModal.mockReturnValue({
      showModal: showSendTalentToPortfolioReviewModal
    })

    const showSendEmailModal = jest.fn()
    const mockedUseSendEmailModal = useSendEmailModal as jest.Mock

    mockedUseSendEmailModal.mockReturnValue({
      showModal: showSendEmailModal
    })

    const sendIntroduceBookingEmailModal = jest.fn()
    const mockedUseSendIntroduceBookingEmailModal =
      useSendIntroduceBookingEmailModal as jest.Mock

    mockedUseSendIntroduceBookingEmailModal.mockReturnValue({
      showModal: sendIntroduceBookingEmailModal
    })

    const TALENT_ID = 'abcd'
    const EMAIL_TEMPLATE_ID = '1234'
    const ROLE_STEP_ID = 'qwerty'
    const ROLE_STEP_EMAIL_MESSAGING_ID = '123'

    const { triggerNextAction } = useNextAction({
      talentId: TALENT_ID
    })

    triggerNextAction({
      roleStep: {
        id: ROLE_STEP_ID,
        emailMessaging: { id: ROLE_STEP_EMAIL_MESSAGING_ID }
      },
      nextAction: RoleStepNextActions.SEND_EMAIL,
      emailTemplate: { id: EMAIL_TEMPLATE_ID }
    })

    expect(showSendEmailModal).toHaveBeenCalledWith({
      nodeId: ROLE_STEP_EMAIL_MESSAGING_ID,
      preselectedEmailTemplateId: EMAIL_TEMPLATE_ID
    })

    triggerNextAction({
      roleStep: {
        id: ROLE_STEP_ID
      },
      nextAction: RoleStepNextActions.SEND_TO_PORTFOLIO_REVIEW,
      emailTemplate: { id: EMAIL_TEMPLATE_ID }
    })

    expect(showSendTalentToPortfolioReviewModal).toHaveBeenCalledWith(
      EMAIL_TEMPLATE_ID
    )

    triggerNextAction({
      roleStep: {
        id: ROLE_STEP_ID
      },
      nextAction: RoleStepNextActions.INTRODUCE_BOOKING
    })

    expect(sendIntroduceBookingEmailModal).toHaveBeenCalledTimes(1)
  })
})
