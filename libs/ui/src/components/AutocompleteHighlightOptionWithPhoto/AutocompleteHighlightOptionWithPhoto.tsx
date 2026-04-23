import React from 'react'
import { UserBadge } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

import AutocompleteHighlightOptionLabel from '../AutocompleteHighlightOptionLabel'
import AutocompleteHighlightOptionSubLabel from '../AutocompleteHighlightOptionSubLabel'
import * as S from './styles'

export interface Props {
  label?: Maybe<string>
  labelHighlight?: Maybe<string>
  nodeTypes?: string[]
  nodeTypeTitles?: string[]
  photo?: Maybe<string>
  status?: Maybe<string>
}

const AutocompleteHighlightOptionWithPhoto = ({
  labelHighlight,
  label,
  nodeTypes,
  nodeTypeTitles,
  photo,
  status
}: Props) => {
  return (
    <UserBadge
      size='xsmall'
      name={label as string}
      css={S.userBadge}
      renderName={() => (
        <AutocompleteHighlightOptionLabel
          size='medium'
          label={label}
          labelHighlight={labelHighlight}
        />
      )}
      avatar={photo}
    >
      {nodeTypes && (
        <AutocompleteHighlightOptionSubLabel
          status={status}
          nodeTypes={nodeTypes}
          nodeTypeTitles={nodeTypeTitles}
        />
      )}
    </UserBadge>
  )
}

export default AutocompleteHighlightOptionWithPhoto
