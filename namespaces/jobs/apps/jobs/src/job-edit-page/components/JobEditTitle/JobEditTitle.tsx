import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'

export interface Props {
  title: string
  jobUrl?: string | null
}

const JobEditTitle = ({ title, jobUrl }: Props) => (
  <>
    Edit job{' '}
    <LinkWrapper wrapWhen={Boolean(jobUrl)} href={jobUrl as string}>
      {title}
    </LinkWrapper>
  </>
)

export default JobEditTitle
