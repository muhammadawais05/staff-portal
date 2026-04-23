import React from 'react'

const JobStatus = props => (
  <div data-testid={props['data-testid'] || 'JobStatus'}>{props.job.id}</div>
)

export default JobStatus
