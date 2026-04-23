import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import { Literal } from './types'

const resolveToJSX = (literals: Literal[]) =>
  literals.map((literal, index) => {
    if (typeof literal === 'string') {
      return literal
    }

    switch (literal.kind) {
      case 'link':
        return (
          // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
          <Link key={index} href={literal.href} {...literal.options}>
            {literal.text}
          </Link>
        )
      case 'typography':
      default:
        return (
          <Typography
            as='span'
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            color={literal.color}
            weight={literal.weight}
          >
            {literal.text}
          </Typography>
        )
    }
  })

export default resolveToJSX
