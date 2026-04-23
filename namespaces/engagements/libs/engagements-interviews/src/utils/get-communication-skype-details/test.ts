import { InterviewInitiator, InterviewKind } from '@staff-portal/graphql/staff'

import { getCommunicationSkypeDetails } from './get-communication-skype-details'

const CLIENT_FULL_NAME = 'Client Full Name'
const TALENT_FULL_NAME = 'Talent Full Name'
const TALENT_SKYPE = 'skype_id'

const arrangeTest = (initiator: InterviewInitiator, kind: InterviewKind) =>
  getCommunicationSkypeDetails({
    clientFullName: CLIENT_FULL_NAME,
    talentFullName: TALENT_FULL_NAME,
    talentSkype: TALENT_SKYPE,
    initiator,
    kind
  })

describe('getCommunicationSkypeDetails', () => {
  describe('Interviewer', () => {
    it('shows external details', () => {
      expect(
        arrangeTest(InterviewInitiator.INTERVIEWER, InterviewKind.EXTERNAL)
      ).toBe(
        `${CLIENT_FULL_NAME} will Skype ${TALENT_FULL_NAME} at ${TALENT_SKYPE}.`
      )
    })

    it('shows internal details', () => {
      expect(
        arrangeTest(InterviewInitiator.INTERVIEWER, InterviewKind.INTERNAL)
      ).toBe(`Interviewer will Skype ${TALENT_FULL_NAME} at ${TALENT_SKYPE}.`)
    })
  })

  describe('Candidate', () => {
    it('shows external details', () => {
      expect(
        arrangeTest(InterviewInitiator.CANDIDATE, InterviewKind.EXTERNAL)
      ).toBe(
        `${TALENT_FULL_NAME} will Skype ${CLIENT_FULL_NAME} at <<MATCHER_ENTER_CLIENT_CONTACT>>.`
      )
    })

    it('shows internal details', () => {
      expect(
        arrangeTest(InterviewInitiator.CANDIDATE, InterviewKind.INTERNAL)
      ).toBe(
        `${TALENT_FULL_NAME} will Skype Interviewer at <<MATCHER_ENTER_INTERVIEWER_SKYPE>>.`
      )
    })
  })
})
