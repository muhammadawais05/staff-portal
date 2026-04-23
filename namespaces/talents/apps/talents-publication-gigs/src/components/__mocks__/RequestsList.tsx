import React from 'react'

interface Props {
  showAllRequests: boolean
}

const Request = ({ showAllRequests }: Props) => {
  return (
    <div data-testid='requests-list'>
      {showAllRequests ? (
        <div data-testid='all-requests-list' />
      ) : (
        <div data-testid='my-requests-list' />
      )}
    </div>
  )
}

export default Request
