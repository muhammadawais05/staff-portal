import { InterviewInitiator, InterviewKind } from '@staff-portal/graphql/staff'

export const getCommunicationSkypeDetails = ({
  clientFullName,
  talentFullName,
  talentSkype,
  initiator,
  kind
}: {
  clientFullName: string
  talentFullName: string
  talentSkype?: string
  initiator: InterviewInitiator
  kind: InterviewKind
}) => {
  switch (initiator) {
    case InterviewInitiator.INTERVIEWER:
      return kind === InterviewKind.EXTERNAL
        ? `${clientFullName} will Skype ${talentFullName} at ${talentSkype}.`
        : `Interviewer will Skype ${talentFullName} at ${talentSkype}.`

    case InterviewInitiator.CANDIDATE:
      return kind === InterviewKind.EXTERNAL
        ? `${talentFullName} will Skype ${clientFullName} at <<MATCHER_ENTER_CLIENT_CONTACT>>.`
        : `${talentFullName} will Skype Interviewer at <<MATCHER_ENTER_INTERVIEWER_SKYPE>>.`
  }
}
