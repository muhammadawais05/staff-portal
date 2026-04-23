import React from 'react'

type Props = {
  requestId: string
}

const CandidatesList = ({ requestId }: Props) => {
  return (
    <div data-testid='p2p-request-candidates-list'>
      Candidates for request {requestId}
    </div>
  )
}

export default CandidatesList
