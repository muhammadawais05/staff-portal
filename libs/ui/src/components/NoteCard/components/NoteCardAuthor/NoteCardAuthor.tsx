import React from 'react'

import LinkWrapper from '../../../LinkWrapper'

export type NoteCreator = {
  webResource?: {
    url?: string | null
    text: string
  }
}

export interface NoteCardAuthorProps {
  author: NoteCreator
}

const NoteCardAuthor = ({ author }: NoteCardAuthorProps) => {
  return (
    <LinkWrapper
      wrapWhen={Boolean(author.webResource?.url)}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      href={author.webResource?.url!}
      target='_blank'
    >
      {author.webResource?.text}
    </LinkWrapper>
  )
}

export default NoteCardAuthor
