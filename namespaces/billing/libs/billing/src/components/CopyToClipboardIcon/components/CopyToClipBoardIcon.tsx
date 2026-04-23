import React, { useCallback, useState } from 'react'
import { Container, Copy16, Tooltip } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

import * as styles from './styles'
import { copyToClipboard } from '../utils'

interface Props {
  content: string
}

export const useClipboardEvents = (content: string) => {
  const { t: translate } = useTranslation('common')
  const [message, setMessage] = useState('')

  const defaultMessage = translate('actions.copy.copyToClipboard')
  const resultMessage = message || defaultMessage

  const resetMessage = useCallback(
    () => setMessage(defaultMessage),
    [defaultMessage]
  )
  const copy = useCallback(
    () => copyToClipboard(translate, content, setMessage),
    [translate, content]
  )
  const reset = useCallback(() => {
    setTimeout(resetMessage, 350)
  }, [resetMessage])

  return { message: resultMessage, copy, reset, setMessage, resetMessage }
}

const CopyToClipBoardIcon = ({ content }: Props) => {
  const { message, copy, reset } = useClipboardEvents(content)

  return (
    <Tooltip
      placement='bottom'
      content={message}
      onMouseOut={reset}
      interactive
    >
      <Container inline css={styles.clickable} onClick={copy}>
        <Copy16 />
      </Container>
    </Tooltip>
  )
}

CopyToClipBoardIcon.displayName = 'CopyToClipBoardIcon'

export default CopyToClipBoardIcon
