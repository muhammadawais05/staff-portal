// eslint-disable-next-line no-restricted-imports
import { Button } from '@toptal/picasso'
import React from 'react'
import { UrlWithMessages } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { LazyLink } from '@staff-portal/facilities'
import { useQuery } from '@staff-portal/data-layer-service'
import { isOperationHidden } from '@staff-portal/operations'

import { GetUserOperationDocument } from './data/get-user-operation.staff.gql.types'

export type Props = {
  engagementId: string
  link?: UrlWithMessages | null
}

const EngagementPitchLink = ({ engagementId, link }: Props) => {
  const { data } = useQuery(GetUserOperationDocument)

  if (isOperationHidden(data?.operations.submitNewEngagementWizard)) {
    return null
  }

  return (
    <LazyLink
      initialLink={link}
      getLazyLinkVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        propertyName: 'viewIntroDraftV2'
      }}
    >
      {({ checkLink, disabled, loading }) => (
        <Button
          disabled={disabled}
          loading={loading}
          size='small'
          variant='secondary'
          data-testid='EngagementPitchLink'
          onClick={checkLink}
        >
          View
        </Button>
      )}
    </LazyLink>
  )
}

export default EngagementPitchLink
