import React from 'react'
import { Link } from '@staff-portal/navigation'

export type Props = {
  slackContacts: {
    nodes: {
      id: string
      webResource: { text: string; url?: string | null }
    }[]
  }
}

const SlackField = ({ slackContacts }: Props) => {
  const { text, url } = slackContacts.nodes[0]?.webResource ?? {}

  if (!url) {
    return null
  }

  return (
    <Link href={url} target='_blank'>
      {text ?? url}
    </Link>
  )
}

export default SlackField
