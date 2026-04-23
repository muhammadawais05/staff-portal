import React from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { getNameInitials } from '@toptal/picasso/utils'
import { LinkWrapper } from '@staff-portal/ui'
import { Talent, Assignee } from '@staff-portal/talents-screening-specialists'

import AssignDropdown from '../AssignDropdown'
import * as S from './styles'

export interface Props {
  assignee: Assignee | undefined
  talent: Talent
}

const AssigneeCellContent = ({ assignee, talent }: Props) => {
  return (
    <>
      {assignee ? (
        <Tooltip interactive placement='top' content={assignee.fullName}>
          <Typography css={S.withFixedWidth} inline>
            <LinkWrapper
              wrapWhen={Boolean(assignee.webResource.url)}
              href={assignee.webResource.url as string}
              target='_blank'
            >
              {getNameInitials(assignee.fullName)}
            </LinkWrapper>
          </Typography>
        </Tooltip>
      ) : (
        <Typography css={S.withFixedWidth} inline>
          -
        </Typography>
      )}

      <AssignDropdown talent={talent} />
    </>
  )
}

export default AssigneeCellContent
