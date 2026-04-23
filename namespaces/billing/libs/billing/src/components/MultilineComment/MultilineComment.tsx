import React, { FC, memo } from 'react'
import Linkify from 'linkifyjs/react'

import { trimMultipleLineBreaks } from '../../utils'

const displayName = 'MultilineComment'

interface Props {
  children?: string
  trimMultiLines?: boolean
}

const MultilineComment: FC<Props> = memo<Props>(
  ({ children, trimMultiLines }) => {
    if (!children) {
      return null
    }

    return (
      <Linkify
        data-testid={displayName}
        options={{
          defaultProtocol: 'https',
          nl2br: true
        }}
      >
        {trimMultiLines ? trimMultipleLineBreaks(children) : children}
      </Linkify>
    )
  }
)

MultilineComment.displayName = displayName

export default MultilineComment
