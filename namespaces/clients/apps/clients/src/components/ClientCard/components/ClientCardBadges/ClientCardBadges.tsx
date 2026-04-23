import { Tag } from '@toptal/picasso'
import React from 'react'
import { ClientFragment } from '@staff-portal/clients'
import { titleize } from '@staff-portal/string'

import { OfacFlag } from '../OfacFlag'

export interface Props {
  client: ClientFragment
}

export const ClientCardBadges = ({
  client: {
    isNew,
    claimer,
    ofacStatusComment,
    ofacStatus,
    ofacProhibitedCumulative
  }
}: Props) => (
  <Tag.Group>
    {isNew && <Tag.Rectangular indicator='green'>New</Tag.Rectangular>}
    {!claimer && (
      <Tag.Rectangular titleCase={false} indicator='yellow'>
        Not claimed yet
      </Tag.Rectangular>
    )}
    {ofacProhibitedCumulative && ofacStatus && (
      <OfacFlag
        comment={ofacStatusComment}
        title={`OFAC ${titleize(ofacStatus)}`}
      />
    )}
  </Tag.Group>
)
