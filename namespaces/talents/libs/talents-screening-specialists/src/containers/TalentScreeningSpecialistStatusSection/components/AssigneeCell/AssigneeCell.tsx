import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'

import { ScreeningSpecialistFragment } from '../../../../data/screening-specialist-fragment.staff.gql.types'

export interface Props {
  assignee?: ScreeningSpecialistFragment | null
}

const AssigneeCell = ({ assignee }: Props) => {
  const { webResource, fullName } = assignee || {}

  return (
    <>
      {!webResource?.url && (fullName || '-')}
      {webResource?.url && (
        <LinkWrapper
          wrapWhen={Boolean(webResource.url)}
          href={webResource.url as string}
          target='_blank'
        >
          {fullName}
        </LinkWrapper>
      )}
    </>
  )
}

export default AssigneeCell
