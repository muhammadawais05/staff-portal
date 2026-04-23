import React, { FunctionComponent } from 'react'
import { ContainerProps, Note as PicassoNote } from '@toptal/picasso'

import {
  NoteCardActions,
  NoteCardAuthor,
  NoteCardBody,
  NoteCardHeader,
  NoteCardInfo,
  NoteCardTitle
} from './components'
import * as S from './styles'

export interface NoteCardStructure {
  Actions: typeof NoteCardActions
  Author: typeof NoteCardAuthor
  Body: typeof NoteCardBody
  Header: typeof NoteCardHeader
  Info: typeof NoteCardInfo
  Title: typeof NoteCardTitle
}

export interface NoteCardProps extends ContainerProps {
  editMode?: boolean
  loading?: boolean
}

/**
 * Base Note card
 */
const NoteCard: FunctionComponent<NoteCardProps> & NoteCardStructure = ({
  editMode = false,
  loading = false,
  ...props
}) => (
  <PicassoNote
    css={[S.noLeftBorder, !editMode && !loading && S.yellowNote]}
    {...props}
  />
)

NoteCard.Actions = NoteCardActions
NoteCard.Author = NoteCardAuthor
NoteCard.Body = NoteCardBody
NoteCard.Header = NoteCardHeader
NoteCard.Info = NoteCardInfo
NoteCard.Title = NoteCardTitle

export default NoteCard
