import React, { useState, ReactText } from 'react'
// eslint-disable-next-line no-restricted-imports
import { Link as PicassoLink } from '@toptal/picasso'

const isWordBetweenBrackets = (word = '') => {
  return word.charAt(0) === '(' && word.charAt(word.length - 1) === ')'
}

const shortenWord = (word = '', shortenedWordLength: number) => {
  if (isWordBetweenBrackets(word)) {
    const wordWithoutBracket = word.substring(1, word.length - 1)

    return `(${wordWithoutBracket.substring(0, shortenedWordLength)}…)`
  }

  return `${word.substring(0, shortenedWordLength)}…`
}

interface Props {
  children: ReactText
  shortenedWordLength: number
}

const ShortenedWord = ({ children, shortenedWordLength }: Props) => {
  const [open, setOpen] = useState(false)

  return open ? (
    <> {children} </>
  ) : (
    <PicassoLink onClick={() => setOpen(true)}>
      {` ${shortenWord(`${children}`, shortenedWordLength)} `}
    </PicassoLink>
  )
}

export default ShortenedWord
