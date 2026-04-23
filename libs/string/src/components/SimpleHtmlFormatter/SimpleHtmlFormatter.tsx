import React, { ReactNode } from 'react'
import replyParser from 'node-email-reply-parser'
import { Container } from '@toptal/picasso'

import * as S from './styles'
import WordShortener, { WordShortenerProps } from '../WordShortener'

export type Props = {
  text: string
  removeReplies?: boolean
  shortenLongWords?: boolean
} & Partial<WordShortenerProps>

const stripHtml = (text: string) => {
  const parser = new DOMParser()
  // parse text as html
  const doc = parser.parseFromString(text, 'text/html')

  const notRelatedToMarkupNodes = doc.querySelectorAll(
    'head, link, style, script, meta'
  )

  // remove not related nodes from the document
  Array.from(notRelatedToMarkupNodes).forEach(node => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  })

  Array.from(doc.querySelectorAll('p')).forEach(node => {
    // insert `\n` inside the paragraph
    node.innerHTML = `\n\n${node.innerHTML}\n\n`
  })

  Array.from(doc.querySelectorAll('br')).forEach(node => {
    // replace <br /> with `\n <br />`
    node.outerHTML = '\n<br />'
  })

  return doc.body.textContent || ''
}

const splitParagraphs = (text: string) =>
  text.replace(/\r\n?/g, '\n').split(/\n\n+/)

const splitNewLines = (text: string) => text.split(/\n/)

const insertBreaks = (
  result: ReactNode[] | null,
  item: string,
  index: number
) => (result ? [...result, <br key={index} />, item] : [item])

const SimpleHtmlFormatter = ({
  text,
  removeReplies,
  maxCharsPerWord,
  shortenedWordLength,
  shortenLongWords = true
}: Props) => {
  const strippedText = stripHtml(text).trim()
  const parsedText = removeReplies
    ? replyParser(strippedText).getVisibleText()
    : strippedText
  const paragraphs = splitParagraphs(parsedText)

  const content = (
    <Container css={S.container}>
      {paragraphs.map((paragraph, index) => (
        // Seems to be to be non unique text rendering
        // eslint-disable-next-line react/no-array-index-key
        <p key={index} css={S.paragraph}>
          {splitNewLines(paragraph).reduce(insertBreaks, null)}
        </p>
      ))}
    </Container>
  )

  return shortenLongWords ? (
    <WordShortener
      maxCharsPerWord={maxCharsPerWord}
      shortenedWordLength={shortenedWordLength}
    >
      {content}
    </WordShortener>
  ) : (
    content
  )
}

export default SimpleHtmlFormatter
