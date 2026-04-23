import { InterviewInitiator, InterviewKind } from '@staff-portal/graphql/staff'

import { getCommunicationPhoneDetails } from './get-communication-phone-details'

const CLIENT_FULL_NAME = 'Client Full Name'
const TALENT_FULL_NAME = 'Talent Full Name'
const CLIENT_PHONE_NUMBER = '123456'
const TALENT_PHONE_NUMBER = '654321'

const arrangeTest = (initiator: InterviewInitiator, kind: InterviewKind) =>
  getCommunicationPhoneDetails({
    clientFullName: CLIENT_FULL_NAME,
    talentFullName: TALENT_FULL_NAME,
    clientPhoneNumber: CLIENT_PHONE_NUMBER,
    talentPhoneNumber: TALENT_PHONE_NUMBER,
    initiator,
    kind
  })

describe('getCommunicationPhoneDetails', () => {
  describe('Interviewer', () => {
    it('shows external details', () => {
      expect(
        arrangeTest(InterviewInitiator.INTERVIEWER, InterviewKind.EXTERNAL)
      ).toBe(
        `${CLIENT_FULL_NAME} will call ${TALENT_FULL_NAME} at ${TALENT_PHONE_NUMBER}.`
      )
    })

    it('shows internal details', () => {
      expect(
        arrangeTest(InterviewInitiator.INTERVIEWER, InterviewKind.INTERNAL)
      ).toBe(
        `Interviewer will call ${TALENT_FULL_NAME} at ${TALENT_PHONE_NUMBER}.`
      )
    })
  })

  describe('Candidate', () => {
    it('shows external details', () => {
      expect(
        arrangeTest(InterviewInitiator.CANDIDATE, InterviewKind.EXTERNAL)
      ).toBe(
        `${TALENT_FULL_NAME} will call <<MATCHER_ENTER_CLIENT_CONTACT>> at ${CLIENT_PHONE_NUMBER}.`
      )
    })

    it('shows internal details', () => {
      expect(
        arrangeTest(InterviewInitiator.CANDIDATE, InterviewKind.INTERNAL)
      ).toBe(
        `${TALENT_FULL_NAME} will call Interviewer at <<MATCHER_ENTER_INTERVIEWER_PHONE>>.`
      )
    })
  })
})
