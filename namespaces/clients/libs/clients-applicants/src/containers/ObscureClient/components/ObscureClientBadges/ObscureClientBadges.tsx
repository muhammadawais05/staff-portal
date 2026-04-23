import React from 'react'
import { Tag } from '@toptal/picasso'
import { ClientFragment } from '@staff-portal/clients'

export interface Props {
  company: ClientFragment
}

const ObscureClientBadges = ({ company: { isNew, claimer } }: Props) => (
  <Tag.Group>
    {isNew && <Tag.Rectangular indicator='green'>New</Tag.Rectangular>}
    {!claimer && (
      <Tag.Rectangular titleCase={false} indicator='yellow'>
        Not claimed yet
      </Tag.Rectangular>
    )}
  </Tag.Group>
)

export default ObscureClientBadges
