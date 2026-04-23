import React, { FC, memo, useState } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { Button, Container } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { useTranslation } from 'react-i18next'

import * as S from './styles'

const displayName = 'NoteEditModalFormAttachment'

const NoteEditModalFormAttachment: FC = memo(() => {
  const { getState } = useForm()
  const {
    values: { attachment: attachments }
  } = getState()
  const { t: translate } = useTranslation('notes')

  const existingAttachment = attachments?.[0] ?? null
  const hadExistingAttachment = !!existingAttachment?.url

  const [downloadVisible, setDownloadVisibility] = useState(
    hadExistingAttachment
  )
  const showDownload = () => setDownloadVisibility(true)
  const hideDownload = () => setDownloadVisibility(false)

  return (
    <Container flex direction='column' alignItems='flex-start' top='small'>
      {downloadVisible ? (
        <>
          <Button
            variant='secondary'
            target='_blank'
            href={existingAttachment?.url}
            data-testid={`${displayName}-download-attachment`}
          >
            {translate('actions.download', {
              name: existingAttachment?.identifier
            })}
          </Button>
          <Link
            css={S.actionLink}
            data-testid={`${displayName}-upload-attachment`}
            variant='action'
            onClick={hideDownload}
          >
            {translate('actions.upload')}
          </Link>
        </>
      ) : (
        <>
          <Form.FileInput
            name='attachment'
            data-testid='NoteEditModalFormAttachment-attachment-input'
            label={translate('form.attachment')}
          />
          {hadExistingAttachment && (
            <Link
              css={S.actionLink}
              data-test={`${displayName}-cancel-attachment-upload`}
              variant='action'
              onClick={showDownload}
            >
              {translate('actions.cancel')}
            </Link>
          )}
        </>
      )}
    </Container>
  )
})

NoteEditModalFormAttachment.displayName = displayName

export default NoteEditModalFormAttachment
