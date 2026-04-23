import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'

import {
  displayDate,
  getDateWithoutTimezone,
  DEFAULT_FULL_DATE_FORMAT
} from '../../../core'
import { Entry } from '../../types'
import { resolveToJSX } from '../../../template-compiler'
import * as S from './styles'

export interface Props {
  entry: Entry
  fullHistoryUrl: string
  showLinkToCommentDetails?: boolean
  contentFontSize?: 'inherit' | 'medium'
}

const RecentActivityListItem = ({
  fullHistoryUrl,
  showLinkToCommentDetails = true,
  entry: {
    performedAction: { occurredAt, comment },
    literals
  },
  contentFontSize = 'medium'
}: Props) => {
  const content = resolveToJSX(literals)

  return (
    <>
      <Typography css={S.contentContainer} size={contentFontSize}>
        {content}
      </Typography>

      <Container css={S.smallTextContainer} alignItems='center'>
        {showLinkToCommentDetails && comment && (
          <Container inline right='xsmall'>
            <Typography size='xsmall'>
              <Link href={fullHistoryUrl}>View Comment</Link>
            </Typography>
          </Container>
        )}
        <Typography inline size='xsmall'>
          {displayDate(
            getDateWithoutTimezone(occurredAt),
            DEFAULT_FULL_DATE_FORMAT
          )}
        </Typography>
      </Container>
    </>
  )
}

export default RecentActivityListItem
