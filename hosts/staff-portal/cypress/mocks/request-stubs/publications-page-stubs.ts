import {
  getGigListResponse,
  getGigResponse,
  claimGigRequestResponse,
  closeGigRequestResponse,
  getMatchedGigResponse,
  completeGigRequestResponse
} from '../responses'

export const publicationsPageStubs = ({
  claimerName,
  claimerId,
  candidateId,
  requestId,
  requestTitle,
  description,
  isClaimed,
  isMatched
}: {
  claimerName: string
  claimerId: string
  candidateId: string
  requestId: string
  requestTitle: string
  description: string
  isClaimed: boolean
  isMatched: boolean
}) => ({
  GetGigsList: getGigListResponse(
    claimerName,
    claimerId,
    requestId,
    description,
    requestTitle
  ),
  GetGig: isMatched
    ? getMatchedGigResponse(
        claimerName,
        claimerId,
        requestId,
        description,
        requestTitle
      )
    : getGigResponse(
        claimerName,
        claimerId,
        requestId,
        description,
        requestTitle,
        isClaimed
      ),
  ClaimGig: claimGigRequestResponse(
    claimerName,
    claimerId,
    requestId,
    description,
    requestTitle
  ),
  CloseGig: closeGigRequestResponse(
    claimerName,
    claimerId,
    requestId,
    description,
    requestTitle
  ),
  CompleteGig: completeGigRequestResponse(
    claimerName,
    claimerId,
    requestId,
    description,
    requestTitle,
    candidateId
  )
})
