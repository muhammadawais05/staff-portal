import React from 'react'

import { Job as JobType } from '../../../../../types'

const MockComponent = ({
  title,
  webResource
}: {
  title: JobType['title']
  webResource: JobType['webResource']
}) => (
  <div data-testid='Job'>
    <div data-testid='Job-title'>{title}</div>
    <div data-testid='Job-webResource'>{JSON.stringify(webResource)}</div>
  </div>
)

export default MockComponent
