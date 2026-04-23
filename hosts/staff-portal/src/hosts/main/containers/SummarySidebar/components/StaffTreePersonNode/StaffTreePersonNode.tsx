import React from 'react'
import { Container } from '@toptal/picasso'

import SingleStaffUserBadge from '../SingleStaffUserBadge'
import { TreeNodeWithInfo, isPerson } from '../StaffTreeModal'
import * as S from './styles'
import StaffUserBadgeWrapper from '../StaffUserBadgeWrapper'

export interface Props {
  data: TreeNodeWithInfo
  onClick: () => void
}

const StaffTreePersonNode = ({ data, onClick }: Props) => {
  if (!isPerson(data.info)) {
    throw new Error('Staff tree person node expects person data to be provided')
  }

  const {
    role: { id, fullName, photo },
    positions,
    highlighted,
    selected,
    disabled,
    loading,
    issuesCount
  } = data.info
  const positionSpecificKey = `${data.info.index}-${id}`

  return (
    <Container key={positionSpecificKey} css={S.container}>
      <StaffUserBadgeWrapper
        selected={selected}
        highlighted={highlighted}
        disabled={disabled}
        loading={loading}
        onClick={!disabled ? onClick : undefined}
      >
        <SingleStaffUserBadge
          name={fullName}
          issuesCount={issuesCount}
          positions={positions}
          avatar={photo?.thumb}
        />
      </StaffUserBadgeWrapper>
    </Container>
  )
}

export default StaffTreePersonNode
