import React, { useMemo, useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { ArrowDownMinor16, ArrowUpMinor16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'

import * as S from './styles'

const DEFAULT_LIMIT = 3

interface Props {
  text: string
  limit?: number
}

const TextWithExcerpt = ({ text, limit = DEFAULT_LIMIT }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const toggleContent = () => setExpanded(!expanded)

  const { shouldTruncate, excerpt, content } = useMemo(() => {
    const trimmed = text.trim()
    const lines = trimmed.split('\n')

    return {
      shouldTruncate: lines.length > limit,
      excerpt: lines.slice(0, limit).join('\n').trim(),
      content: trimmed
    }
  }, [text, limit])

  return (
    <Container>
      <Typography css={S.textWithExcerpt}>
        {shouldTruncate && !expanded ? excerpt : content}
      </Typography>

      {shouldTruncate && (
        <Link onClick={toggleContent} css={S.toggleLink}>
          <Container flex inline alignItems='center' top='xsmall'>
            {expanded ? 'Show less' : 'Show more'}

            <Container flex inline alignItems='center' left='xsmall'>
              {expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
            </Container>
          </Container>
        </Link>
      )}
    </Container>
  )
}

export default TextWithExcerpt
