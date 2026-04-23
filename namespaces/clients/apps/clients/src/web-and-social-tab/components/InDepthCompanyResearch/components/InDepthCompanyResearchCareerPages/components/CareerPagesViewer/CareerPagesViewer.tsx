import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { EditableFieldArrayView } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'
import { CareerPageFragment } from '../../../../../../data'
import CareerPagesViewerItem from '../CareerPagesViewerItem'

type Props = {
  nodes: CareerPageFragment[]
}

const CareerPagesViewer = ({ nodes }: Props) => {
  if (!nodes?.length) {
    return (
      <Typography data-testid='CareerPagesViewer-text'>{NO_VALUE}</Typography>
    )
  }

  return (
    <Container css={S.containerWidth}>
      <EditableFieldArrayView
        nodes={nodes}
        viewer={CareerPagesViewerItem}
        nodeData={{}}
      />
    </Container>
  )
}

export default CareerPagesViewer
