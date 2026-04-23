import { InterviewInitiator, InterviewKind } from '@staff-portal/graphql/staff'

export const getCommunicationPhoneDetails = ({
  clientFullName,
  talentFullName,
  clientPhoneNumber,
  talentPhoneNumber,
  initiator,
  kind
}: {
  clientFullName: string
  talentFullName: string
  clientPhoneNumber: string
  talentPhoneNumber: string
  initiator: InterviewInitiator
  kind: InterviewKind
}) => {
  switch (initiator) {
    case InterviewInitiator.INTERVIEWER:
      return kind === InterviewKind.EXTERNAL
        ? `${clientFullName} will call ${talentFullName} at ${talentPhoneNumber}.`
        : `Interviewer will call ${talentFullName} at ${talentPhoneNumber}.`
    case InterviewInitiator.CANDIDATE:
      return kind === InterviewKind.EXTERNAL
        ? `${talentFullName} will call <<MATCHER_ENTER_CLIENT_CONTACT>> at ${clientPhoneNumber}.`
        : `${talentFullName} will call Interviewer at <<MATCHER_ENTER_INTERVIEWER_PHONE>>.`
  }
}
