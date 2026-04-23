import { getClaimRoleStepMessage } from './utils'

const PARTNER_NAME = 'Dima Bilan'
const TALENT_NAME = 'Inna Andreeva'
const STEP_TITLE = 'Technical one'

describe('getClaimRoleStepMessage', () => {
  it('returns proper message with talent partner', () => {
    expect(
      getClaimRoleStepMessage({
        stepTitle: STEP_TITLE,
        talentFullName: TALENT_NAME,
        talentPartnerFullName: PARTNER_NAME
      })
    ).toBe(
      `Are you sure you want to claim the ${STEP_TITLE} step for ${TALENT_NAME} (the candidate from the talent partner ${PARTNER_NAME})?`
    )
  })

  it('returns proper message without talent partner', () => {
    expect(
      getClaimRoleStepMessage({
        stepTitle: STEP_TITLE,
        talentFullName: TALENT_NAME
      })
    ).toBe(
      `Are you sure you want to claim the ${STEP_TITLE} step for ${TALENT_NAME}?`
    )
  })
})
