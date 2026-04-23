import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { Maybe } from '@staff-portal/graphql/staff'

import { ClientCardMatcher } from '../ClientCardMatcher/ClientCardMatcher'
import { InternalTeamMatcherFragment } from '../../data'
import { mapMatchersToVerticals } from '../../services'

type MatcherValue = {
  fullName?: string
  url?: Maybe<string>
  verticalName?: string
  key?: string
}

interface Props {
  matchers?: InternalTeamMatcherFragment[]
  prependValues?: MatcherValue[]
}

export const ClientCardMatchers = ({ matchers, prependValues = [] }: Props) => {
  const { data: verticals, loading } = useGetUserVerticals()

  if (loading) {
    return <SkeletonLoader.Typography />
  }

  if (!verticals) {
    return null
  }

  const matcherValues = mapMatchersToVerticals(verticals, matchers)

  return (
    <>
      {prependValues
        .concat(matcherValues)
        .map<React.ReactNode>(({ verticalName, fullName, url, key }) => (
          <ClientCardMatcher
            key={key || verticalName || fullName}
            fullName={fullName}
            url={url}
            verticalName={verticalName}
          />
        ))
        .reduce((acc, curr) => [acc, ' / ', curr])}
    </>
  )
}
