import React from 'react'
import { Typography, TypographyProps } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { toTitleCase } from '@toptal/picasso/utils'

import { parseNodeTypesAsString } from '../../utils'

const getClientStatusText = (nodeTypes: string[], status?: Maybe<string>) =>
  status && nodeTypes.includes('company') ? ` - ${titleize(status)}` : ''

const getTitleText = (nodeTypes: string[], nodeTypeTitles?: string[]) => {
  if (!nodeTypeTitles?.length) {
    return parseNodeTypesAsString(nodeTypes)
  }

  return nodeTypeTitles
    .map(nodeTypeTitle => toTitleCase(nodeTypeTitle))
    .join(', ')
}

export interface Props extends TypographyProps {
  status?: Maybe<string>
  nodeTypes: string[]
  nodeTypeTitles?: string[]
}

const AutocompleteHighlightOptionSubLabel = ({
  nodeTypes,
  nodeTypeTitles,
  status,
  ...restProps
}: Props) => {
  const title = getTitleText(nodeTypes, nodeTypeTitles)
  const clientStatus = getClientStatusText(nodeTypes, status) // if "company" presents in the provided type list

  return (
    <Typography
      size='xsmall'
      color='dark-grey'
      data-testid='go-to-user-sublabel'
      {...restProps}
    >
      {title}
      {clientStatus}
    </Typography>
  )
}

export default AutocompleteHighlightOptionSubLabel
