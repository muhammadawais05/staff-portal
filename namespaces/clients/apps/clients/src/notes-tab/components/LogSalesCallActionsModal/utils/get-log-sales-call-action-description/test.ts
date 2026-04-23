import { getLogSalesCallActionDescription } from './get-log-sales-call-action-description'

const arrangeTest = ({
  clientName = 'Client Name',
  ofacCheckInProgress = false,
  ofacCheckNotStarted = false,
  ofacStatusFailure = false,
  ofacStatusSuccess = false
}: Partial<{
  clientName: string
  ofacCheckNotStarted: boolean
  ofacCheckInProgress: boolean
  ofacStatusSuccess: boolean
  ofacStatusFailure: boolean
}> = {}) =>
  getLogSalesCallActionDescription({
    clientName,
    ofacCheckInProgress,
    ofacCheckNotStarted,
    ofacStatusFailure,
    ofacStatusSuccess
  })

describe('getLogSalesCallActionDescription', () => {
  it('return undefine if all flags are false', () => {
    expect(arrangeTest()).toBeUndefined()
  })

  it('shows the OFAC check not started message', () => {
    expect(arrangeTest({ ofacCheckNotStarted: true })).toBe(
      'Please choose one of the options below. If you want to approve the lead then you have to run the compliance check first.'
    )
  })

  it('shows the OFAC check in progress message', () => {
    expect(arrangeTest({ ofacCheckInProgress: true })).toBe(
      'A compliance check against Client Name is still running. Please select an option for this client if you desire to move forward with their onboarding process regardless of the check result. Otherwise, just close the modal.'
    )
  })

  it('shows the OFAC success status message', () => {
    expect(arrangeTest({ ofacStatusSuccess: true })).toBe(
      'Client Name has passed the compliance check. Please choose one of the options below.'
    )
  })

  it('shows the OFAC failure status message', () => {
    expect(arrangeTest({ ofacStatusFailure: true })).toBe(
      'Client Name has not passed the compliance check. A task was created for the legal team to investigate this client. Please select from below one of the possible options if you desire to change its status. Otherwise, close the modal.'
    )
  })
})
