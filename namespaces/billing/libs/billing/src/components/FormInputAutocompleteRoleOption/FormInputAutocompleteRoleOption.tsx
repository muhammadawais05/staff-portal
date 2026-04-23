import React from 'react'
import { Container, Typography, Company16 } from '@toptal/picasso'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import * as S from './styles'
import { QueryAutocompleteEdgeFragment } from '../../data'
import { useRoleTitle } from '../../utils/role'

const displayName = 'FormInputAutocompleteRoleOption'

interface Props {
  autocompleteItem: QueryAutocompleteEdgeFragment
}

const FormInputAutocompleteRoleOption = ({
  autocompleteItem: { label = '', labelHighlight, node, nodeTypes }
}: Props) => {
  /**
   * TODO : https://toptal-core.atlassian.net/browse/SP-1218
   *    remove useRoleTitle and use `AutocompleteHighlightOptionWithPhoto` with `node` and `nodeTypes` props.
   *   `AutocompleteHighlightOptionWithPhoto`, `AutocompleteHighlightOption`, `AutocompleteHighlightOptionSubLabel`
   *    does not support `node` prop at the moment,
   *    but it's required to properly display sub-row like `Top level company #{{node.id}}`,
   *    so instead of passing `nodeTypes` to AutocompleteHighlightOption, we just displaying our own role info for now
   * @deprecated
   */
  const roleInfo = useRoleTitle(node, nodeTypes)

  // TODO: just use `AutocompleteHighlightOptionWithPhoto` when it will support `node`
  return (
    <Container css={S.optionWrapper} data-testid={displayName}>
      <Container flex>
        <Container flex alignItems='center' justifyContent='center'>
          <Typography color='grey'>
            <Company16 />
          </Typography>
        </Container>
        <Container left='small'>
          <AutocompleteHighlightOption
            labelHighlight={labelHighlight}
            label={label}
            // TODO (see comment above) https://toptal-core.atlassian.net/browse/SP-1218
            // node={node}
            // nodeTypes={nodeTypes}
          />
          {roleInfo && (
            <Typography
              as='span'
              size='xsmall'
              color='dark-grey'
              data-testid='FormInputAutocompleteRoleOption-role-info'
            >
              {roleInfo}
            </Typography>
          )}
        </Container>
      </Container>
    </Container>
  )
}

FormInputAutocompleteRoleOption.displayName = displayName

export default FormInputAutocompleteRoleOption
