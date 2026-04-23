import React from 'react'
import { Link } from '@staff-portal/navigation'

import { Job as JobType } from '../../../../types'

interface Props {
  title: JobType['title']
  webResource: JobType['webResource']
}

const Job = ({ title, webResource }: Props) => {
  return (
    <Link href={webResource.url || ''} data-testid='Job-link'>
      {title}
    </Link>
  )
}

export default Job
