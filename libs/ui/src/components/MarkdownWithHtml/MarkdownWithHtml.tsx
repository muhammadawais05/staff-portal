import React, { ReactNode } from 'react'
import Markdown from 'react-markdown/with-html'
import DOMPurify from 'dompurify'
import { Props as PicassoLinkProps } from '@toptal/picasso/Link/Link'
import { Link } from '@staff-portal/navigation'

import * as S from './styles'

type Props = {
  allowDangerousHtml?: boolean
  linkProps?: PicassoLinkProps
  children?: ReactNode
}

const parseContent = (content?: ReactNode, allowDangerousHtml?: boolean) => {
  if (typeof content === 'string') {
    // a hard break needs two or more spaces as the end of a line, followed by a
    // newline character. https://github.com/remarkjs/react-markdown/issues/105
    const LINE_BREAKER_MATCHER = /(\r\n|\n|\r)/gm
    const JSON_LINK_PROP_MATCHER = /\{target=.*?\}/gm
    const NEW_LINE = '  \n'

    const parsedContent = content
      .replace(LINE_BREAKER_MATCHER, NEW_LINE)
      .replace(JSON_LINK_PROP_MATCHER, '')

    if (allowDangerousHtml) {
      return DOMPurify.sanitize(parsedContent)
    }

    return parsedContent
  }

  return ''
}

const MarkdownWithHtml = ({
  allowDangerousHtml,
  linkProps,
  children
}: Props) => {
  return (
    <Markdown
      allowDangerousHtml={allowDangerousHtml}
      renderers={{
        inlineCode: props => <code css={S.inlineCode}>{props.children}</code>,
        link: props => (
          <Link href={props.href} {...linkProps}>
            {props.children}
          </Link>
        )
      }}
    >
      {parseContent(children, allowDangerousHtml)}
    </Markdown>
  )
}

export default MarkdownWithHtml
