export const getLogSalesCallActionDescription = ({
  clientName,
  ofacCheckInProgress,
  ofacCheckNotStarted,
  ofacStatusFailure,
  ofacStatusSuccess
}: {
  clientName: string
  ofacCheckNotStarted: boolean
  ofacCheckInProgress: boolean
  ofacStatusSuccess: boolean
  ofacStatusFailure: boolean
}) => {
  if (ofacCheckNotStarted) {
    return 'Please choose one of the options below. If you want to approve the lead then you have to run the compliance check first.'
  }

  if (ofacCheckInProgress) {
    return `A compliance check against ${clientName} is still running. Please select an option for this client if you desire to move forward with their onboarding process regardless of the check result. Otherwise, just close the modal.`
  }

  if (ofacStatusSuccess) {
    return `${clientName} has passed the compliance check. Please choose one of the options below.`
  }

  if (ofacStatusFailure) {
    return `${clientName} has not passed the compliance check. A task was created for the legal team to investigate this client. Please select from below one of the possible options if you desire to change its status. Otherwise, close the modal.`
  }
}
