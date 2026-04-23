import React from 'react'

import { ProfilePublication } from '../../types'
import ApplicationCardListItem from '../ApplicationCardListItem'
import PublicationItemPreview from '../PublicationItemPreview'
import * as S from './styles'

export interface PublicationItemProps {
  highlighted: boolean
  toggle: (id: string) => void
  item: ProfilePublication
}

const PublicationItem = ({
  highlighted,
  toggle,
  item
}: PublicationItemProps) => {
  return (
    <ApplicationCardListItem
      highlighted={highlighted}
      onClick={() => toggle(item.id)}
      cssStyle={S.listItemContentComponent}
    >
      <PublicationItemPreview item={item} />
    </ApplicationCardListItem>
  )
}

export default PublicationItem
