import React, { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, EmptyState, Section } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { NoteItemFragment } from '../../../__fragments__/noteItemFragment.graphql.types'
import NoteListItem from '../NoteListItem'
import { CommercialDocumentNotesFragment } from '../../data/getNotes.graphql.types'

const displayName = 'NotesContainer'

interface Props {
  notes?: Maybe<CommercialDocumentNotesFragment>
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
}

const NotesContainer = ({ notes, handleOnClick }: Props) => {
  const { t: translate } = useTranslation('notes')

  return (
    <Section
      title={translate('title')}
      data-testid={`${displayName}-container`}
      actions={
        <OperationWrapper operation={notes?.operations?.createNote}>
          <Button
            data-testid={`${displayName}-addNote-button`}
            variant='secondary'
            size='small'
            onClick={handleOnClick}
            data-value={ModalKey.noteCreate}
          >
            {translate('actions.create')}
          </Button>
        </OperationWrapper>
      }
    >
      {!notes?.nodes?.length ? (
        <EmptyState.Collection data-testid={`${displayName}-empty`}>
          {translate('empty')}
        </EmptyState.Collection>
      ) : (
        notes?.nodes.map((note: NoteItemFragment) => (
          <NoteListItem
            key={note.id}
            note={note}
            handleOnClick={handleOnClick}
          />
        ))
      )}
    </Section>
  )
}

NotesContainer.displayName = displayName

export default NotesContainer
