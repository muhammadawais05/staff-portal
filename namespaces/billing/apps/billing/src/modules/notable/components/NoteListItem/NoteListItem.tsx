import { Button, Container, Tag, Typography } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { CloseMinor16, Pencil16, Trash16 } from '@toptal/picasso/Icon'
import { useTranslation } from 'react-i18next'
import React, { FC, SyntheticEvent, memo } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import {
  formatDateMedWithTime,
  isAfter
} from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'
import MultilineComment from '@staff-portal/billing/src/components/MultilineComment'

import { NoteItemFragment } from '../../../__fragments__/noteItemFragment.graphql.types'
import * as styles from './styles'

const displayName = 'NoteListItem'

interface Props {
  note: NoteItemFragment
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
}

const NoteListItem: FC<Props> = memo<Props>(
  ({
    note: { title, id, updatedAt, creator, createdAt, comment, attachment },
    handleOnClick
  }) => {
    const { t: translate } = useTranslation('notes')
    const creatorName = creator?.fullName
    const decodedNoteId = decodeId({
      id,
      type: 'note'
    })

    return (
      <Container bottom='medium' css={styles.note} data-testid={displayName}>
        <Container flex justifyContent='space-between' padded='large'>
          <Container>
            <Container bottom='xsmall'>
              <Typography
                variant='heading'
                size='small'
                data-testid={`${displayName}-title`}
              >
                {title}
              </Typography>
            </Container>
            <Container flex direction='row' bottom='small'>
              <Typography
                color='dark-grey'
                size='xsmall'
                data-testid={`${displayName}-modified-status`}
              >
                {i18n.t('notes:history.added', {
                  creatorName,
                  date: formatDateMedWithTime(createdAt)
                })}
                {updatedAt &&
                  isAfter({ end: updatedAt, start: createdAt }) &&
                  ` ${i18n.t('notes:history.updated', {
                    date: formatDateMedWithTime(updatedAt)
                  })}`}
              </Typography>
            </Container>
            {comment && (
              <Typography
                as='p'
                size='medium'
                color='black'
                data-testid={`${displayName}-comment`}
              >
                <MultilineComment>{comment}</MultilineComment>
              </Typography>
            )}

            {attachment?.url && (
              <Container top='small' data-testid={`${displayName}-attachment`}>
                <Tag variant='light-grey'>
                  <Link target='_blank' href={attachment.url} noUnderline>
                    {translate('actions.download', {
                      name: attachment.identifier || attachment.url
                    })}
                  </Link>
                  <Button.Circular
                    onClick={handleOnClick}
                    data-testid={`${displayName}-delete-attachment`}
                    data-value='delete-attachment'
                    data-note-id={id}
                    data-note-attachment-id={
                      attachment.identifier || attachment.url
                    }
                    variant='transparent'
                    icon={<CloseMinor16 color='black' />}
                  />
                </Tag>
              </Container>
            )}
          </Container>

          <Container flex justifyContent='space-evenly' alignItems='flex-start'>
            <Button.Circular
              data-note-id={decodedNoteId}
              data-note-title={title}
              data-testid={`${displayName}-edit`}
              data-value={ModalKey.noteEdit}
              icon={<Pencil16 />}
              onClick={handleOnClick}
              variant='flat'
            />
            <Button.Circular
              data-note-id={id}
              data-note-title={title}
              data-testid={`${displayName}-delete`}
              data-value='delete'
              icon={<Trash16 />}
              onClick={handleOnClick}
              variant='flat'
            />
          </Container>
        </Container>
      </Container>
    )
  }
)

NoteListItem.displayName = displayName

export default NoteListItem
