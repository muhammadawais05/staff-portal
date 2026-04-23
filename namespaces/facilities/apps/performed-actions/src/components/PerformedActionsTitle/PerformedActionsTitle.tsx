import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'

import { PerformedActionEntityLink } from '../../pages/EntityPerformedActionsListPage/types'

export type Props = {
  title: string
  entityLink?: PerformedActionEntityLink
}

const PerformedActionsTitle = ({ title, entityLink }: Props) => {
  return (
    <>
      {title}
      {entityLink?.text && (
        <>
          {' '}
          <LinkWrapper
            wrapWhen={Boolean(entityLink?.url)}
            href={entityLink?.url as string}
          >
            {entityLink?.text}
          </LinkWrapper>
        </>
      )}
    </>
  )
}

export default PerformedActionsTitle
