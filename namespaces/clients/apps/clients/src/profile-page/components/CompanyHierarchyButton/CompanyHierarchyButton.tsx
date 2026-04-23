import React from 'react'
import {
  Button,
  Container,
  Subfunction16,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { getClientProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import {
  ClientHierarchyFragment,
  ClientMetadataFragment
} from '../../data/get-client'
import { hierarchyButtonIcon } from './styles'

interface Props {
  client?: Maybe<ClientMetadataFragment & ClientHierarchyFragment>
}

const CompanyHierarchyButton = ({ client }: Props) => {
  if (!client) {
    return null
  }

  const { parent, children, id } = client

  const hasHierarchy = !!parent || !!children?.totalCount
  const hierarchyPath =
    getClientProfilePath(decodeEntityId(id).id) + '/hierarchy'

  if (!hasHierarchy) {
    return null
  }

  return (
    <Container flex>
      <Button.Circular
        as={Link as typeof PicassoLink}
        href={hierarchyPath}
        icon={<Subfunction16 css={hierarchyButtonIcon} />}
        variant='flat'
        size='medium'
        data-testid='company-hierarchy-button'
      />
    </Container>
  )
}

export default CompanyHierarchyButton
