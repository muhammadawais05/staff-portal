import { Container } from '@toptal/picasso'
import DOMPurify from 'dompurify'
import React from 'react'
import { UnsafeAdvancedHtmlFormatter } from '@staff-portal/string'

import EmailPreviewContentLoader from '../EmailPreviewContentLoader'
import * as S from './styles'

export interface Props {
  loading: boolean
  preview?: string | null
}

const EmailPreviewContent = ({ loading, preview }: Props) => {
  const sanitizedHtml = DOMPurify.sanitize(preview || '')

  if (loading) {
    return (
      <Container css={S.preview}>
        <EmailPreviewContentLoader />
      </Container>
    )
  }

  return <UnsafeAdvancedHtmlFormatter html={sanitizedHtml} css={S.preview} />
}

export default EmailPreviewContent
