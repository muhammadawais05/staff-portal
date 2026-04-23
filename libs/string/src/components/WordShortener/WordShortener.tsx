import React, { ReactNode, isValidElement, cloneElement } from 'react'

import ShortenedWord from './components/ShortenedWord'

const makeChildrenParser = (maxCharsPerWord = 50, shortenedWordLength = 50) => {
  const shortenWords = (children: ReactNode) =>
    `${children}`.split(' ').map((word, index) =>
      word.length > maxCharsPerWord ? (
        // Seems to be to be non unique text rendering
        // eslint-disable-next-line react/no-array-index-key
        <ShortenedWord shortenedWordLength={shortenedWordLength} key={index}>
          {word}
        </ShortenedWord>
      ) : (
        ` ${word} `
      )
    )

  const parseChildren = (children: ReactNode, key = 0): ReactNode => {
    if (typeof children === 'string') {
      return shortenWords(children)
    }

    if (isValidElement(children)) {
      return cloneElement(
        children,
        { key: key },
        parseChildren(children.props.children || children.props.text)
      )
    }

    if (Array.isArray(children)) {
      return children.map(parseChildren)
    }

    return children
  }

  return parseChildren
}

export interface Props {
  children: ReactNode
  maxCharsPerWord?: number
  shortenedWordLength?: number
}

// NOTE: This component does not work with lazy loaded children.
const WordShortener = ({
  children,
  maxCharsPerWord,
  shortenedWordLength
}: Props) => {
  return <>{makeChildrenParser(maxCharsPerWord, shortenedWordLength)(children)}</>
}

export default WordShortener
