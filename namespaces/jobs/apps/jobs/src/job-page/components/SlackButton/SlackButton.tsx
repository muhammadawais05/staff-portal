import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Menu, Button, Link as PicassoLink } from '@toptal/picasso'
import { MenuLink } from '@staff-portal/ui'

import { SlackContact } from './types'

export type Props = {
  slackContacts: SlackContact[]
  variant: 'menuItem' | 'button'
}

const SlackButton = ({ slackContacts, variant }: Props) => {
  const text = 'Contact via Slack'

  if (variant === 'menuItem') {
    return (
      <Menu.Item
        href={slackContacts[0].webResource.url as string}
        target='_blank'
        rel='noreferrer'
        as={MenuLink}
        data-testid='SlackButton-menu'
      >
        {text}
      </Menu.Item>
    )
  }

  return (
    <Button
      as={PicassoLink}
      variant='secondary'
      size='small'
      data-testid='SlackButton-button'
      href={slackContacts[0].webResource.url as string}
      target='_blank'
      rel='noreferrer'
    >
      {text}
    </Button>
  )
}

export default SlackButton
