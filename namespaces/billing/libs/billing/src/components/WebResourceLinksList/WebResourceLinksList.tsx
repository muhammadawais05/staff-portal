import { Link } from '@topkit/react-router'
import { Typography } from '@toptal/picasso'
import React, { HTMLAttributes, Fragment } from 'react'

import { WebResourceFragment } from '../../__fragments__/webResourceFragment.graphql.types'

const displayName = 'WebResourceLinksList'

interface Props extends HTMLAttributes<HTMLElement> {
  webResources:
    | {
        id?: string
        webResource: WebResourceFragment
      }[]
    | undefined
  'data-testid'?: string
}

const WebResourceLinksList = (props: Props) => {
  const { webResources = [], 'data-testid': componentTestId } = props
  const checkLength = webResources.length - 1

  return (
    <>
      {webResources.map(({ id, webResource: { url, text } }, index) => {
        const key = id || text
        const testid = `${componentTestId || displayName}-${index}`
        const isLast = index === checkLength

        return (
          <Fragment key={key}>
            {url ? (
              <Link data-testid={testid} href={url}>
                {text}
              </Link>
            ) : (
              <Typography
                as='span'
                color='inherit'
                data-testid={testid}
                inline
                weight='inherit'
              >
                {text}
              </Typography>
            )}
            {!isLast && ', '}
          </Fragment>
        )
      })}
    </>
  )
}

WebResourceLinksList.displayName = displayName

export default WebResourceLinksList
