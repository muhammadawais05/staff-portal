import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import DOMPurify from 'dompurify'
import parseHtml, {
  attributesToProps,
  domToReact,
  HTMLReactParserOptions
} from 'html-react-parser'
import { Link } from '@staff-portal/navigation'
import { StatusMessageNotification } from '@staff-portal/ui'

import { StatusMessageFragment } from '../../data/status-message-fragment'
import * as S from './styles'
import { SEVERITY_TO_VARIANT_MAP } from '../../constants'

interface Props {
  statusMessage: StatusMessageFragment
  onClose: Function
}

const parseHtmlOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (!('attribs' in domNode && domNode.tagName.toLowerCase() === 'a')) {
      return
    }

    const { attribs, children } = domNode
    const props = attributesToProps(attribs)

    return <Link {...props}>{domToReact(children, parseHtmlOptions)}</Link>
  }
}

const GeneralStatusMessageDefault = ({ statusMessage, onClose }: Props) => {
  const { severity, text, sticky } = statusMessage
  const variant = SEVERITY_TO_VARIANT_MAP[severity]
  const parsedHtml = useMemo(
    () =>
      parseHtml(
        DOMPurify.sanitize(text, { ADD_ATTR: ['target'] }),
        parseHtmlOptions
      ),
    [text]
  )

  return (
    <StatusMessageNotification
      variant={variant}
      onClose={sticky ? undefined : () => onClose(statusMessage)}
    >
      <Container css={S.statusMessageContent}>{parsedHtml}</Container>
    </StatusMessageNotification>
  )
}

export default GeneralStatusMessageDefault
