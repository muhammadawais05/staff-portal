import React, { ComponentProps, HTMLAttributes } from 'react'
import { Link } from '@topkit/react-router'
import { Props as LinkProps } from '@toptal/picasso/Link/Link'
import { Typography, TypographyOverflow } from '@toptal/picasso'

import { WebResourceFragment } from '../../__fragments__/webResourceFragment.graphql.types'

const displayName = 'WebResourceLinkWrapper'

interface Props extends HTMLAttributes<HTMLElement> {
  color?: ComponentProps<typeof TypographyOverflow>['color']
  defaultText?: string
  inline?: boolean
  isTextOverflowEnabled?: boolean
  webResource?: WebResourceFragment
  // TODO: Extend types from TypographyOverflow
  weight?: ComponentProps<typeof TypographyOverflow>['weight']
  size?: ComponentProps<typeof TypographyOverflow>['size']
  target?: LinkProps['target']
}

const WebResourceLinkWrapper = ({
  color = 'inherit',
  defaultText,
  inline = false,
  isTextOverflowEnabled,
  webResource,
  weight,
  target,
  ...rest
}: Props) => {
  const text = defaultText || webResource?.text

  if (!webResource || !text) {
    return null
  }

  const url = webResource?.url
  // eslint-disable-next-line
  const baseProps = { color, weight, inline, ...rest }

  const content = isTextOverflowEnabled ? (
    <TypographyOverflow
      // eslint-disable-next-line
      {...baseProps}
    >
      {text}
    </TypographyOverflow>
  ) : (
    <Typography
      // eslint-disable-next-line
      {...baseProps}
      as={inline ? 'span' : undefined}
    >
      {text}
    </Typography>
  )

  if (url) {
    return (
      <Link href={url} target={target}>
        {content}
      </Link>
    )
  }

  return content
}

WebResourceLinkWrapper.displayName = displayName

export default WebResourceLinkWrapper
